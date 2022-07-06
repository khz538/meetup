// backend/routes/api/groups.js
const express = require("express");
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

router.get(
    '/:groupId',
    async (req, res) => {
        const { groupId } = req.params;
        const group = await Group.findByPk(groupId, {
            include: [{ model: User }],
        });
        const organizer = group.User
        return res.json(group);
    }
)
router.get(
    '/',
    async (req, res) => {
        const groups = await Group.findAll();
        return res.json(groups);
    }
);


module.exports = router;