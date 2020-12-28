const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')
const { expect } = require('chai')
const supertest = require('supertest')

describe('Comment endpoints', function () {
    let db;

    const { testUsers, testComments, testPosts } = helpers.makeInitFixtures()
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

    describe('GET /api/comment/:post_id', function () {

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

        beforeEach('insert comments', () => {
            helpers.seedComments(
                db,
                testComments
            )
        })

        it('Responds with a 200 and an array of comments', async () => {
            let res = await supertest(app)
                .get(`/api/comment/1`)
                .set('Authorization', helpers.makeAuthHeader(testUser))
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array')
        })
    })

})
