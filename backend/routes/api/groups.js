// backend/routes/api/groups.js
const express = require("express");
const { check } = require("express-validator");
const { Group,
        GroupMember,
        User,
        Event,
        EventAttendee,
        Image,
        Venue } = require('../../db/models');
const router = express.Router();

const checkAuth = (req, res, next) => {
    if (!req.user) {
        const err = new Error('You must be logged in to access this information');
        next(err);
    } else {
        next();
    }
}
// Get all Members of a Group specified by its id
router.get('/:groupId/members', async (req, res) => {
    const { groupId } = req.params;
    const groupMember = await User.findAll({
        include: [{
            model: Group,
            where: {
                id: groupId
            },
            attributes: [],
            },
            // {
            //     model: GroupMember, as: 'Membership'}
        ],
    });
    console.log(groupMember);
    return res.json(groupMember);
});

router.get(
    '/users/current',
    checkAuth,
    async (req, res) => {
        // if (!req.user) {
        //     throw new Error ('must be logged in');
        // }
        const userId = req.user.id;
        const groups = await GroupMember.findAll({
            include: [{ model: Group }],
            where: { userId },
        });

        const result = [];
        groups.forEach(group => {
            result.push(group.Group);
        });
        return res.json({ Group: result });
    }    
)

// Get details of a Group from an id
router.get(
    '/:groupId',
    async (req, res) => {
        const { groupId } = req.params;
        const group = await Group.findByPk(groupId, {
            // include: [{model: Image, as: "Images"}],
        });
        if (!group) {
            res.status(404).json({message: "Group couldn't be found", statusCode: 404});
        }
        const organizer = await User.findByPk(group.organizerId);
        const images = await Image.findAll({
            attributes: ['url'],
            where: {
                groupId
            }
        });
        const imageArr = [];
        images.forEach(image => {
            imageArr.push(image.dataValues.url);
        });
        let groupJson = group.toJSON();
        groupJson.Images = imageArr;
        groupJson.Organizer = organizer.toJSON();
        delete groupJson.Organizer.username;
        delete groupJson.previewImage;
        return res.json(groupJson);
    }
);

// Edit a group
router.put('/:groupId', checkAuth, async (req, res) => {
    const { groupId } = req.params;
    let { name, about, type, private, city, state } = req.body;
    if (private === 'true') private = true;
    if (private === 'false') private = false;
    const group = await Group.findByPk(groupId);
    if (!group) {
        return res.status(404).json({
            message: "Group couldn't be found",
            statusCode: 404
        });
    }
    const user = await User.findByPk(req.user.id);
    if (group.organizerId !== user.id) {
        console.log(req.user.id);
        throw new Error('Not authorized');
    }
    try {
        if (name) group.name = name;
        if (about) group.about = about;
        if (type) group.type = type;
        if (private) group.private = private;
        if (city) group.city = city;
        if (state) group.state = state;
        await group.save();
        return res.json(group);
    } catch (err) {
        return res.status(400).json({
            message: 'Validation Error',
            statusCode: 400,
            errors: {
                name: 'Name must be 60 characters or less',
                about: 'About must be 50 characters or more',
                type: 'Type must be Online or In person',
                private: 'Private must be a boolean',
                city: 'City is required',
                state: 'State is required',
            }
        });
    }
});

// Create a group
router.post('/', checkAuth, async (req, res) => {
    let { name, about, type, private, city, state } = req.body;
    if (private === 'true') private = true;
    if (private === 'false') private = false;
    const numMembers = 1;
    const organizerId = req.user.id;
    try {
        let newGroup = await Group.create({
            organizerId,
            name,
            about,
            type,
            private,
            city,
            state,
            numMembers,
        });
        console.log(newGroup)
        return res.json(newGroup);
    } catch (e) {
        return res.status(400).json({
            message: 'Validation Error',
            statusCode: 400,
            errors: {
                name: 'Name must be 60 characters or less',
                about: 'About must be 50 characters or more',
                type: 'Type must be Online or In person',
                private: 'Private must be a boolean',
                city: 'City is required',
                state: 'State is required',
            }
        });
    }
});

// Delete a group
router.delete('/:groupId', checkAuth, async (req, res) => {
    const { groupId } = req.params;
    const group = await Group.findByPk(groupId);
    if (!group) {
        return res.status(404).json({
            message: 'Group couldn\'t be found',
            statusCode: 404
        });
    }
    const user = await User.findByPk(req.user.id);
    if (group.organizerId !== user.id) {
        console.log(req.user.id);
        throw new Error('Not authorized');
    }
    await group.destroy();
    return res.json({
        message: 'Successfully deleted',
        statusCode: 200
    });
});

// Get all groups
router.get(
    '/',
    async (req, res) => {
        const groups = await Group.findAll();
        return res.json(groups);
    }
);


module.exports = router;