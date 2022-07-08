// backend/routes/api/images.js
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

// Delete an image
router.delete('/:imageId', checkAuth, async (req, res, next) => {
    let imageId = parseInt(req.params.imageId);
    const image = await Image.findByPk(imageId);
    if (!image) {
        return res.status(404).json({
            message: "Image couldn't be found",
            statusCode: 404
        })
    } else if (req.user.id === image.userId) {
        await image.destroy();
        return res.json({
            message: "Successfully deleted",
            statusCode: 200
        });
    } else {
        throw new Error('Image must belong to current user');
    }
});

module.exports = router;