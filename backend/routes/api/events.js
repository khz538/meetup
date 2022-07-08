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
                    'firstName',
                    'lastName',
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
                    'firstName',
                    'lastName',
                ],
                include: [{
                    model: EventAttendee,
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
});

// Request to Attend an Event based on Event's id
router.post('/:eventId/join', checkAuth, async (req, res, next) => {
    let {eventId} = req.params; eventId = parseInt(eventId);
    const event = await Event.findByPk(eventId);
    const userId = req.user.id;
    if (!event) {
        res.status(404).json({
            message: "Event couldn't be found",
            statusCode: 404,
        });
    }
    // Return error if attendance has already been request
    // or user is already attending

    const userIds = await EventAttendee.findAll({
        attributes: ['userId', 'attendingStatus'],
        where: {eventId},
    });
    let arr = [];
    userIds.forEach(user => {
        arr.push([user.dataValues.userId, user.dataValues.attendingStatus]);
    });
    for (let el of arr) {
        console.log(el[0], el[1]);
        if (el[0] === req.user.id) {
            if (el[1] === 'pending') {
                return res.status(400).json({
                    message: "Attendance has already been requested",
                    statusCode: 400
                });
            } else if (el[1] === 'member') {
                return res.status(400).json({
                    message: "User is already an attendee of the event",
                    statusCode: 400
                });
            }
        }
    }
    const newAttendee = await EventAttendee.create({
        eventId,
        userId,
        attendingStatus: "pending"
    });
    return res.json({
        eventId: eventId,
        memberId: userId,
        status: "pending"
    });
});

// Add an Image to an Event based on the Event's id
router.post('/:eventId/images', checkAuth, async (req, res, next) => {
    let { eventId } = req.params; eventId = parseInt(eventId);
    const currentUser = req.user; const userId = req.user.id;
    const { url } = req.body;
    const imageableType = "Event"
    const event = await Event.findByPk(eventId);
    if (!event) {
        return res.status(404).json({
            message: "Event couldn't be found",
            statusCode: 404
        });
    }
    const attendee = await EventAttendee.findOne({
        where: { eventId, userId },
    });
    if (!attendee) {
        throw new Error('Current User must be an attendee of the event');
    } else if (attendee.attendingStatus === "member") {
        const newImage = await Image.create({
            eventId,
            imageableType,
            url,
            userId
        });
        const newImageJSON = newImage.toJSON();
        delete newImageJSON.groupId;
        delete newImageJSON.createdAt;
        delete newImageJSON.updatedAt;
        delete newImageJSON.userId;
        return res.json(newImageJSON);
    }
});

// Change the status of an attendance for an event specified by id
router.put('/:eventId/attendees', checkAuth, async (req, res, next) => {
    let { eventId } = req.params; eventId = parseInt(eventId);
    let { userId, status } = req.body; userId = parseInt(userId);
    const event = await Event.findByPk(eventId);
    if (!event) {
        res.status(404).json({
            message: "Event couldn't be found",
            statusCode: 404
        });
    }
    const currentUser = req.user;
    const currentUserId = req.user.id;
    if (!currentUser) {
        return res.status(400).json({
            message: "Current User must be the organizer or a co-host to change attendance status",
            statusCode: 400
        })
    }
    let eventAttendee = await EventAttendee.findOne({
        where: {
            userId,
            eventId,
        }
    });
    if (!eventAttendee) {
        return res.status(404).json({
            message: "Attendance between the user and the event does not exist",
            statusCode: 404
        });
    }
    if (status == "pending") {
        return res.status(400).json({
            message: "Cannot change an attendance status to pending",
            statusCode: 400,
        });
    }

    eventAttendee.attendingStatus = status;
    await eventAttendee.save();
    eventAttendeeJSON = eventAttendee.toJSON();
    delete eventAttendeeJSON.createdAt;
    delete eventAttendeeJSON.updatedAt;
    return res.json(eventAttendeeJSON);
});

// Delete attendance to an event specified by id
router.delete('/:eventId/attendees/:attendeeId', checkAuth, async (req, res, next) => {
    let { eventId } = req.params; eventId = parseInt(eventId);
    let { attendeeId } = req.params; attendeeId = parseInt(attendeeId);
    const event = await Event.findByPk(eventId);
    if (!event) {
        res.status(404).json({
            message: "Event couldn't be found",
            statusCode: 404
        });
    }
    const groupId = event.groupId;
    const group = await Group.findByPk(groupId);
    const currentUser = req.user;
    const targetAttendee = await EventAttendee.findOne({
        where: { eventId, userId: attendeeId },
    });

    if (!targetAttendee) {
        throw new Error('No relationship between this user and this event');
    }
    const currentUserStatus = await GroupMember.findOne({
        where: {groupId, userId: req.user.id},
    });
    // } else if (currentUser.id === groupId || currentUser.id === targetAttendee.userId) {
    //     await targetAttendee.destroy();
    //     return res.json({
    //         message: "Successfully deleted attendance from event"
    //     });
    if (group.organizerId == currentUser.id ||
        currentUser.id == targetAttendee.userId
        || currentUserStatus.membershipStatus == "co-host"
    ) {
            await event.destroy();
            return res.json({
                message: "Successfully deleted",
            });
        } else {
            throw new Error(
                "Current user must be the host of the group or the user whose attendance is being deleted"
            );
        }
});

// Get details of an Event specified by its id
router.get('/:eventId', async (req, res, next) => {
    let { eventId } = req.params; eventId = parseInt(eventId);
    const eventPayload = [
        "id",
        'groupId',
        'venueId',
        'name',
        'description',
        'type',
        'capacity',
        'price',
        'startDate',
        'endDate',
        'numAttending',
    ]
    const groupPayload = [
        'id',
        'name',
        'private',
        'city',
        'state',
    ]
    const venuePayload = [
        'id',
        'address',
        'city',
        'state',
        'lat',
        'lng'
    ]
    const event = await Event.findByPk(eventId, {
        attributes: {
            include: eventPayload
        },
        include: [
            {
                model: Group,
                // attributes: {
                //     include: groupPayload
                // }
            },
            {
                model: Venue,
                // attributes: {
                //     include: venuePayload
                // }
            },
            // {
            //     model: Image,
            //     // as: "images"
            // }
        ],
    });
    const images = await Image.findAll({
        attributes: ['url'],
        where: {
            eventId
        }
    });
    const imageArr = [];
    images.forEach(image => {
        imageArr.push(image.dataValues.url);
    });
    if (!event) {
        return res.status(404).json({
            message: "Event couldn't be found",
            statusCode: 404,
        });
    }
    const eventJSON = event.toJSON();
    eventJSON.images = imageArr;
    delete eventJSON.Images;
    delete eventJSON.Group.organizerId;
    delete eventJSON.Group.about;
    delete eventJSON.Group.type;
    delete eventJSON.Group.numMembers;
    delete eventJSON.Group.previewImage;
    delete eventJSON.Group.createdAt;
    delete eventJSON.Group.updatedAt;
    delete eventJSON.Venue.groupId;
    delete eventJSON.previewImage;

    return res.json(eventJSON);
});

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
