const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

function makeUsersArray() {
    return [
        {
            id: 1,
            fullname: 'tester1',
            username: 'test-user-1',
            user_password: 'password',
            email: 'email@email.com',
            about_user: 'test the things',
            user_stack: 'Backend',
            date_created: new Date().toISOString(),
        },
        {
            id: 2,
            fullname: 'tester2',
            username: 'test-user-2',
            user_password: 'password',
            email: 'email2@email.com',
            about_user: 'test the things',
            user_stack: 'Frontend',
            date_created: new Date().toISOString(),
        },
        {
            id: 3,
            fullname: 'tester3',
            username: 'test-user-3',
            user_password: 'password',
            email: 'email3@email.com',
            about_user: 'test the things',
            user_stack: 'Full Stack',
            date_created: new Date().toISOString(),
        }
    ]
}

function makeInitFixtures() {
    const testUsers = makeUsersArray()
    const testFollowers = makeFollowersArray()
    const testPosts = makePostsArray()
    const testComments = makeCommentsArray()
    return { testUsers, testFollowers, testPosts, testComments }
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
    const token = jwt.sign({ user_id: user.id }, secret, {
        subject: user.username,
        algorithm: 'HS256',
    })
    return `Bearer ${token}`
}

function seedUsers(db, users) {
    const preppedUsers = users.map(user => ({
        ...user,
        user_password: bcrypt.hashSync(user.user_password, 1)
    }))
    return db.into('user_information').insert(preppedUsers)
        .then(() =>
            db.raw(
                `SELECT setval('user_information_id_seq', ?)`,
                [users[users.length - 1].id],
            )
        )
}

function makeFollowersArray() {
    return [
        {
            id: 1,
            following_id: 3,
            users_id: 1
        },
        {
            id: 2,
            following_id: 2,
            users_id: 1
        },
        {
            id: 3,
            following_id: 1,
            users_id: 3
        },
        {
            id: 4,
            following_id: 1,
            users_id: 2
        }
    ]
}

function makePostsArray() {
    return [
        {
            id: 1,
            username: 'test-user-1',
            post_title: 'post 1',
            post_description: 'post description 1',
            post_live_link: null,
            post_repository: null,
            post_image_file: '/hexadeci',
            post_image_type: '/hexadeci',
            tech_stack: 'Tech stack',
            user_id: 1
        },
        {
            id: 2,
            username: 'test-user-1',
            post_title: 'post 2',
            post_description: 'post description 2',
            post_live_link: null,
            post_repository: null,
            post_image_file: '/hexadeci',
            post_image_type: '/hexadeci',
            tech_stack: 'Tech stack',
            user_id: 1
        },
        {
            id: 3,
            username: 'test-user-2',
            post_title: 'post 3',
            post_description: 'post description 3',
            post_live_link: null,
            post_repository: null,
            post_image_file: '/hexadeci',
            post_image_type: '/hexadeci',
            tech_stack: 'Tech stack',
            user_id: 2
        }

    ]
}

function makeCommentsArray() {
    return [
        {
            id: 1,
            post_id: 1,
            user_id: 1,
            text: 'First comment'
        },
        {
            id: 2,
            post_id: 1,
            user_id: 2,
            text: 'Second comment'
        },
        {
            id: 3,
            post_id: 1,
            user_id: 3,
            text: 'Third comment'
        }
    ]
}


function seedFollowers(db, arr) {

    return db
        .insert(arr)
        .into('init_following')

}

function seedPosts(db, arr) {
    return db
        .insert(arr)
        .into('init_posts')
}

function seedComments(db, arr) {
    return db
        .into('init_comments')
        .insert(arr)
        
}

function cleanTables(db) {
    return db.transaction(trx =>
        trx.raw(
            `TRUNCATE
                "init_comments",
                "init_following",
                "init_posts",
                "user_avatar",
                "user_information"
                `
        )
            .then(() =>
                Promise.all([
                    trx.raw(`ALTER SEQUENCE user_information_id_seq minvalue 0 START WITH 1`),
                    trx.raw(`ALTER SEQUENCE user_avatar_id_seq minvalue 0 START WITH 1`),
                    trx.raw(`ALTER SEQUENCE init_posts_id_seq minvalue 0 START WITH 1`),
                    trx.raw(`ALTER SEQUENCE init_following_id_seq minvalue 0 START WITH 1`),
                    trx.raw(`ALTER SEQUENCE init_comments_id_seq minvalue 0 START WITH 1`),
                    trx.raw(`SELECT setval('user_information_id_seq', 0)`),
                    trx.raw(`SELECT setval('user_avatar_id_seq', 0)`),
                    trx.raw(`SELECT setval('init_posts_id_seq', 0)`),
                    trx.raw(`SELECT setval('init_following_id_seq', 0)`),
                    trx.raw(`SELECT setval('init_comments_id_seq', 0)`),
                ])
            )
    )
}

module.exports = {
    makeUsersArray,
    makeInitFixtures,
    makeAuthHeader,
    makeFollowersArray,
    seedFollowers,
    seedUsers,
    seedPosts,
    seedComments,
    cleanTables,
}