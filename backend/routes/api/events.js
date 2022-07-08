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

// Edit an Event specified by its id
router.put('/:eventId', checkAuth, async(req, res, next) => {
    let {eventId} = req.params; eventId = parseInt(eventId);
    const event = await Event.findByPk(eventId);
    const groupId = event.groupId;
    const group = await Group.findByPk(groupId);
    const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body;
    const venue = await Venue.findByPk(venueId);
    const userId = req.user.id;

    // Error handlers for can't find event, group, or venue
    if (!event) {
        res.status(404).json({
            message: "Event couldn't be found",
            statusCode: 404
        });
    }
    if (!venue) {
        res.status(404).json({
            message: "Venue couldn't be found",
            statusCode: 404
        });
    }

    if (!group) {
        res.status(404).json({
            message: "Group couldn't be found",
            statusCode: 404
        });
    }
    const currentUserStatus = await GroupMember.findOne({
        where: {groupId, userId}
    });

    if (!currentUserStatus) {
        throw new Error ('You are not a member of this group');
    }
    if (group.organizerId == userId ||
        currentUserStatus.membershipStatus == "co-host") {
            try {
                if (venueId) event.venueId = venueId;
                if (name) event.name = name;
                if (type) event.type = type;
                if (capacity) event.capacity = capacity;
                if (price) event.price = price;
                if (description) event.description = description;
                if (startDate) event.startDate = startDate;
                if (endDate) event.endDate = endDate;
                await event.save();
                const eventJSON = event.toJSON();
                delete eventJSON.updatedAt;
                delete eventJSON.previewImage;
                delete eventJSON.numAttending;
                console.log('------', event.price);
                return res.json(eventJSON);
            } catch (e) {
                return res.send({
                    "message": "Validation error",
                    "statusCode": 400,
                    "errors": {
                      "venueId": "Venue does not exist",
                      "name": "Name must be at least 5 characters",
                      "type": "Type must be Online or In person",
                      "capacity": "Capacity must be an integer",
                      "price": "Price is invalid",
                      "description": "Description is required",
                      "startDate": "Start date must be in the future",
                      "endDate": "End date is less than start date",
                    }
                  });
            }
        }
});

// Delete an Event specified by its id
router.delete('/:eventId', checkAuth, async (req, res, next) => {
    let { eventId } = req.params; eventId = parseInt(eventId);
    const event = await Event.findByPk(eventId);
    const groupId = event.groupId;
    const group = await Group.findByPk(groupId);
    const userId = req.user.id;
    if (!event) {
        res.status(404).json({
            message: "Event couldn't be found",
            statusCode: 404,
        });
    }
    if (!group) {
        res.status(404).json({
            message: "Group couldn't be found",
            statusCode: 404
        });
    }
    const currentUserStatus = await GroupMember.findOne({
        where: {groupId, userId},
    });

    if (!currentUserStatus) {
        throw new Error ('You are not a member of this group');
    }
    if (group.organizerId == userId ||
        currentUserStatus.membershipStatus == "co-host") {
            await event.destroy();
            return res.json({
                message: "Successfully deleted",
            });
        }
});

// Get all Attendees of an Event specified by its id
router.get('/:eventId/attendees', async (req, res, next) => {
    let { eventId } = req.params; eventId = parseInt(eventId);
    const event = await Event.findByPk(eventId);
    console.log(event);
    const groupId = event.groupId;
    const group = await Group.findByPk(groupId);
    const userId = req.user.id;
    if (!event) {
        res.status(404).json({
            message: "Event couldn't be found",
            statusCode: 404,
        });
    }
    if (userId) {
        if (group.organizerId == userId) {
            const eventAttendees = await User.findAll({
                attributes: [
                    'id',
                    'firstname',
                    'lastname',
                ],
                include: [{
                    model: EventAttendee,
                    where: {
                        eventId,
                    },
                    attributes: ["attendingStatus"],
                }],
            });
            console.log(eventAttendees);
            return res.json({Attendees: eventAttendees});
        } else {
            const eventAttendees = await User.findAll({
                attributes: [
                    'id',
                    'firstname',
                    'lastname',
                ],
                include: [{
                    model: EventAttendee, as: "Attendance",
                    where: {
                        eventId,
                        attendingStatus: {
                            [Op.notIn]: ["pending"],
                        }
                    },
                    attributes: ["attendingStatus"],
                }],
            });
            return res.json({Attendees: eventAttendees});
        }
    }
})

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