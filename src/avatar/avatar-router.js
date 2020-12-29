const express = require('express');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const AvatarService = require('./avatar-service');
const { requireAuth } = require('../middleware/jwt-auth');

const avatarRouter = express.Router();

/*Converts images to disk with multer*/
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${__dirname}/uploads`);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + new Date().toISOString());
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 1
    }
});

avatarRouter
    .route('/upload')
    .post(requireAuth, [upload.single('imageRequest')], uploadAvatar);

avatarRouter
    .route('/upload/:avatar_id')
    .patch(requireAuth, verifyAvatarExists, [upload.single('imageRequest')], updateAvatar);

avatarRouter
    .route('/download')
    .get(requireAuth, downloadAvatar);

async function uploadAvatar(req, res, next) {
    if(!req.file) {
        return res
            .status(400)
            .send('Missing request file.')
    }

    if(!req.body) {
        return res
            .status(400)
            .send('Missing request body.')
    }

    try {
        const imgData = fs.readFileSync(req.file.path);

        const uploadData = {
            name: req.body.someText,
            img_type: req.file.mimetype,
            img_file: imgData
        };

        uploadData.user_id = req.user.id;

        const rows = await AvatarService.insertAvatar(
            req.app.get('db'),
            uploadData
        );

        fs.unlink(req.file.path, function (err) {
            if (err) {
                next(err)
                return
            };

            res.sendStatus(201);
        })
    } catch (error) {
        next(error);
    }
}

async function updateAvatar(req, res, next) {
    try {
        const imgData = fs.readFileSync(req.file.path);

        const updateData = {
            name: req.body.someText,
            img_type: req.file.mimetype,
            img_file: imgData,
            date_created: new Date(),
        };

        const numberOfValues = Object.values(updateData).filter(Boolean).length;

        if (numberOfValues === 0)
            return await res.status(400).json({
                error: { message: `Invalid request` }
            });


        const rows = await AvatarService.updateAvatar(
            req.app.get('db'),
            req.params.avatar_id,
            updateData
        );

        fs.unlink(req.file.path, function (err) {
            if (err) {
                next(err)
                return
            };

            res
                .status(204)
                .end()
        })
    } catch (error) {
        next(error);
    }
}

async function downloadAvatar(req, res, next) {
    try {
        const rows = await AvatarService.getAvatar(
            req.app.get('db'),
            req.user.id
        )
        res.json(rows)
    } catch (error) {
        next(error)
    };
}

async function verifyAvatarExists(req, res, next) {
    try {
        const currentAvatar = await AvatarService.getById(
            req.app.get('db'),
            req.params.avatar_id
        );

        if (!currentAvatar)
            return await res.status(404).json({
                error: { message: `Avatar not found` }
            })

        res.avatar = currentAvatar;

        next();

    } catch (error) {
        next(error);
    }
}

module.exports = avatarRouter;