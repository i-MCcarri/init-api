const express = require('express')
const unreadActivitiesService = require('./unread-activities-service')
const { requireAuth } = require('../middleware/jwt-auth')
const FollowService = require('../follow/follow-service')

const unreadActivitiesRouter = express.Router()
const jsonParser = express.json()

// post_id only exists in the comment details.

unreadActivitiesRouter
    .route('/')
    .get(requireAuth, async (req, res, next) => {

        try {
            const followedByUser = await FollowService.getAllFollows(
                req.app.get('db'), req.user.id)

            const unreadFollowingUser = await unreadActivitiesService.getAllUnreadFollowingUser(
                req.app.get('db'), req.user.id)

            const unreadCommentsForUser = await unreadActivitiesService.getAllUnreadCommentsForUser(
                req.app.get('db'), req.user.id)
            console.log(followedByUser, 'New Follower Notification: ', unreadFollowingUser, 'New Comment Notification: ', unreadCommentsForUser)
            return await res
                .status(200)
                .json({ 
                    followedByUser: followedByUser,
                    unreadFollowingUser: unreadFollowingUser,
                    unreadCommentsForUser: unreadCommentsForUser
                })    
        }
        catch (error) {
            next(error)
        }
    })

module.exports = unreadActivitiesRouter;