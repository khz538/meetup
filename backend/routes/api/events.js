// backend/routes/api/events.js
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

// Get all events
router.get('/', async (req, res, next) => {
    const events = await Event.findAll({
        include: [
            { model: Group },
            { model: Venue }
        ]
    });
    return res.json({Events: events});
});

module.exports = router;