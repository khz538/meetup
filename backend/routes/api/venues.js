// backend/routes/api/venues.js
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
const venue = require("../../db/models/venue");
const router = express.Router();

const checkAuth = (req, res, next) => {
    if (!req.user) {
        const err = new Error('You must be logged in to access this information');
        next(err);
    } else {
        next();
    }
}

// Create a new Venue for a Group specified by its id
router.post('/new/groups/:groupId', checkAuth, async (req, res, next) => {
    let { groupId } = req.params;
    groupId = parseInt(groupId);
    const userId = req.user.id;
    const { address, city, state, lat, lng } = req.body;
    // Find group
    const group = await Group.findByPk(groupId);
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
                let newVenue = await Venue.create({
                    address,
                    city,
                    state,
                    lat,
                    lng,
                });
                const newVenueJSON = newVenue.toJSON();
                delete newVenueJSON.updatedAt;
                delete newVenueJSON.createdAt;
                return res.json(newVenueJSON);
            } catch (err) {
                return res.status(400).json({
                    message: "Validation error",
                    statusCode: 400,
                    errors: {
                        address: "Street address is required",
                        city: "City is required",
                        state: "State is required",
                        lat: "Latitude is not valid",
                        lng: "Longitude is not valid",
                    }
                });
            }
    } else {
        throw new Error('Unauthorized');
    }
});

// Edit a venue specified by its id
router.put('/:venueId', checkAuth, async (req, res) => {
    const userId = req.user.id
    const { address, city, state, lat, lng } = req.body;
    let venueId = req.params.venueId; venueId = parseInt(venueId);
    const venue = await Venue.findByPk(venueId);
    if (!venue) {
        res.status(404).json({
            message: "Venue couldn't be found",
            statusCode: 404
        });
    }
    const group = await Group.findByPk(venue.groupId);
    const currentUserStatus = await GroupMember.findOne({
        where: {
            groupId: venue.groupId,
            userId: req.user.id
        }
    });
    if (!currentUserStatus) {
        throw new Error ('You are not a member of this group');
    }
    if (group.organizerId == userId ||
        currentUserStatus.membershipStatus == "co-host") {
            try {
                if (address) venue.address = address;
                if (city) venue.city = city;
                if (state) venue.state = state;
                if (lat) venue.lat = lat;
                if (lng) venue.lng = lng;
                venueJSON = venue.toJSON();
                delete venueJSON.updatedAt;
                return res.json(venueJSON);
            } catch(err) {
                return res.status(400).json({
                    message: "Validation error",
                    statusCode: 400,
                    errors: {
                        address: "Street address is required",
                        city: "City is required",
                        state: "State is required",
                        lat: "Latitude is not valid",
                        lng: "Longitude is not valid"
                    }
                });
            }
    }
});

module.exports = router;