const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')
const { expect } = require('chai')
const supertest = require('supertest')

describe('Avatar endpoints', function () {
    let db;

    const { testUsers, } = helpers.makeInitFixtures()
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

    context(`POST /api/avatar/upload`, () => {

       beforeEach('insert users', () =>
           helpers.seedUsers(
               db,
               testUsers,
           )
       )

       describe('Upload Endpoint - token ', function () {

              xit('Press Send w/out attaching photos returns error message', function (done) {
              return supertest(app)
                     .post(`/api/avatar/upload`)
                     .set('Authorization', helpers.makeAuthHeader(testUser))
                     .send({ user_id: testUsers[2].id })
                     .expect(401)
              });
       })

       describe('Upload Endpoint', function (){

              xit('Attached photo - should return 201 response', function (done){
                  return supertest(app)
                        .post(`/api/avatar/upload`)
                        .set('Authorization', helpers.makeAuthHeader(testUser))
                        .attach('name', buffer, 'custom_file_name.txt')
                        .end(function(err, res) {
                             expect(res.body.ok).to.equal(true);
                         done();
                     });
              });
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