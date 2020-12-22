const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')
const { expect } = require('chai')
const supertest = require('supertest')

describe('Activity Endpoints', function () {
    let db;

    const { testUsers, testFollowers, testComments, testPosts } = helpers.makeInitFixtures()
    const testUser = testUsers[0];

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup', () => helpers.cleanTables(db))

    afterEach('cleanup', () => helpers.cleanTables(db))

    describe(`GET /api/activity`, () => {

        beforeEach('insert users', () =>
            helpers.seedUsers(
                db,
                testUsers,
            )
        )

        beforeEach('insert posts', () => {
            helpers.seedPosts(
                db,
                testPosts
            )
        })

        beforeEach('Seed followers', () => {
            helpers.seedFollowers(
                db, 
                testFollowers
            )
        })

        beforeEach('insert comments', () => {
            helpers.seedComments(
                db,
                testComments
            )
        })

        describe('Given that a user has no activity, no followers and no comments on their posts', function () {
            it(`Responds with 200 and an object with three keys, followedByUser, unreadFollowingUser, and unreadCommentsForUser with empty arrays for values`, async () => {
                let res = await supertest(app)
                    .get(`/api/activity`)
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object')
                expect(res.body).to.include.all.keys('followedByUser', 'unreadFollingUser', 'unreadCommentsForUser')
                expect(res.body.followedByUser).to.be.an('array')
                expect(res.body.unreadFollingUser).to.be.an('array')
                expect(res.body.unreadCommentsForUser).to.be.an('array')
            })
        })

        describe('Given that a user has activity, new followers or new comments on their posts', function () {
            it(`responds with 200 and an object with three keys, followedByUser, unreadFollowingUser, and unreadCommentsForUser with arrays for values`, async () => {
                let res = await supertest(app)
                    .get(`/api/activity`)
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object')
                expect(res.body).to.include.all.keys('followedByUser', 'unreadFollingUser', 'unreadCommentsForUser')
                expect(res.body.followedByUser).to.be.an('array')
                expect(res.body.unreadFollingUser).to.be.an('array')
                expect(res.body.unreadCommentsForUser).to.be.an('array')
                expect(res.body.followedByUser[0]).to.be.an('object')
                expect(res.body.followedByUser[0]).to.include.all.keys('id', 'username', 'fullname')
            })
        })

    })
})