// backend/routes/api/groups.js
const express = require("express");
const { Group, GroupMember } = require('../../db/models');
const router = express.Router();

router.get(
    '/users/current',
    async (req, res) => {
        if (!req.user) {
            throw new Error ('must be logged in');
        }
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

// router.get('/users/current', async (req, res, next) => {
//     if (!req.user) {
//         const err = new Error('No log In')
//         next(err)
//     }

//     const userId = req.user.id;
//     const groups = await GroupMember.findAll({
//         include: [{model: Group}],
//         where: {
//             userId
//         }
//     })

//     const result = {Groups:[]}
//     groups.forEach(element => {
//         result.Groups.push(element.Group)
        
//     });
//     res.json(result)
// })

router.get(
    '/',
    async (req, res) => {
        const groups = await Group.findAll();
        return res.json(groups);
    }
);


module.exports = router;