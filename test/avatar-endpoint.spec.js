const knex = require('knex')
const fs = require('fs')
const app = require('../src/app')
const helpers = require('./test-helpers')
const { expect } = require('chai')
const supertest = require('supertest')

describe.only('Avatar endpoints', function () {
    let db;

    const { testUsers } = helpers.makeInitFixtures()
    const testUser = testUsers[0];
    const test_img = '../images/avatar1.png';
    const imgData = fs.readFileSync(test_img, 'utf-8');

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

    describe('Testing Avatar Endpoint', function () {

        beforeEach('insert users', () =>
            helpers.seedUsers(
                db,
                testUsers,
            )
        )

        it('Press Send w/out attaching photos returns error message', function () {
            return supertest(app)
                .post(`/api/avatar/upload`)
                .set('Authorization', helpers.makeAuthHeader(testUser))
                .send({ user_id: testUsers[2].id })
                .expect(400)
        });

        it('Attached Photo Happy Path - should return 201 response', function () {
            return supertest(app)
                .post(`/api/avatar/upload`)
                .set('Authorization', helpers.makeAuthHeader(testUser))
                .send({img_file: imgData, img_type: 'image/png', name: null, user_id: testUser})
                .expect(201);
        });

    })
})


//read an image file with dfs
//put into an image data
//line 43

//send file through form data to send along with the request
//image request property containing file details
//pass through api

//get what multar saves on the disk and match with image data
//test if image is the same 
//npm package to check if same

//file sent from client is not changed by api or multar

//client side 
//how send

//create service to couple with fs readflilesync passing image path
//one img

//use services
//create promise to use one service until after the other

//insert user
//after retrieving img insert 

//calling endpoint to test sameness
//jestimage

//POST
//get in db
//pull from db
//match going into api and turning away

//GET
//get in db
//get from db
//match returned from api