// backend/routes/api/groups.js
const express = require("express");
const { Op } = require("sequelize");
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
    const group = await Group.findByPk(groupId);
    if (!group) res.status(404).json({message: 'Group couldn\'t be found', statusCode: 404});
    if (group.organizerId === req.user.id) {
        const groupMembers = await User.findAll({
            attributes: ["id", "firstName", "lastName"],
            include: [{
                model: GroupMember,
                // model: Group,
                where: {
                    groupId
                },
                attributes: ["membershipStatus"],
                },
                // {
                //     model: GroupMember, as: 'Membership'}
            ],
        });
        console.log(groupMembers);
        return res.json({Members: groupMembers});
    } else {
        const groupMembers = await User.findAll({
            attributes: ["id", "firstName", "lastName"],
            include: [{
                model: GroupMember, as: "Membership",
                where: {
                    groupId,
                    membershipStatus: {
                        [Op.notIn]: ["pending"],
                    }
                },
                attributes: ["membershipStatus"],
            }]
        });
        return res.json({Members: groupMembers})
    }
});

// Get all Groups joined or organized by the Current User
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

// Change the status of the membership for a group specified by id
router.put('/:groupId/members/change', checkAuth, async (req, res) => {
    const { groupId } = req.params;
    const { memberId, status } = req.body;
    const group = await Group.findAll({
        where: {
            id: groupId
        },
    });
    if (!group) {
        res.status(404).json({
            message: "Group couldn't be found",
            statusCode: 404
        });
    }
    let targetMember = await GroupMember.findOne({
        where: { userId: memberId, groupId },
        attributes: [
            'id',
            'userId',
            'groupId',
            'membershipStatus'
        ]
    });
    console.log(targetMember)
    targetMember.userId = memberId;
    targetMember.membershipStatus = status;
    console.log(targetMember.id);
    await targetMember.save();
    return res.json(targetMember);
});

// Request a Membership for a Group based on the Group's id
router.post('/:groupId/join', checkAuth, async (req, res) => {
    let { groupId } = req.params;
    groupId = parseInt(groupId);
    const group = await Group.findByPk(groupId);
    // error if group doesn't exist
    if (!group) {
        res.status(404).json({
            message: "Group couldn't be found",
            statusCode: 404
        });
    }

    // error if user is already accepted
    const userIds = await GroupMember.findAll({
        attributes: ['userId', 'membershipStatus'],
        where: { groupId },
    });
    let arr = [];
    userIds.forEach(user => {
        arr.push([user.dataValues.userId, user.dataValues.membershipStatus]);
    });
    for (let el of arr) {
        console.log(el[0], el[1]);
        if (el[0] === req.user.id) {
            if (el[1] === 'pending') {
                return res.status(400).json({
                    message: "Membership has already been requested",
                    statusCode: 400
                });
            } else if (el[1] === 'member') {
                return res.status(400).json({
                    message: "User is already a member of the group",
                    statusCode: 400
                });
            }
        }
    }
    
    const userId = req.user.id;
    const newMember = await GroupMember.create({
        groupId,
        userId,
        membershipStatus: "pending"
    });
    return res.json({
        groupId: groupId,
        memberId: userId,
        status: "pending"
    });
})

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