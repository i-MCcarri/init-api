# [Init](https://init-blush.vercel.app/)

`Init` is a social media site for developers to connect over their work. Users can upload posts with demo images that are stored in our database. These posts appear in the feed of users that are following you and can also be viewed on your portfolio page. You can interact with other users by commenting on their posts or by following their future posts.

This is a repository for the `Init client`.

View the live version [here](https://init-blush.vercel.app/)

View the client repository [here](https://github.com/i-MCcarri/init-client)

View the repository for the server [here](https://github.com/i-MCcarri/init-api).

## Demo Credentials

To test `Init`, log in with these credentials:
username: `test1`
password: `ssRAGE2!`

## Tech Stack

- React
- CSS3
- Jest
- deployed with Vercel

## Features

### Infinite scroll through your feed

![](Screenshots/scroll.jpg)

### Infinite scroll through profiles

![](Screenshots/profile.jpg)

### View expanded version of posts

![](Screenshots/modal.jpg)

#### Write and see comments in expanded view

![](Screenshots/comments.jpg)

### Follow and Unfollow users

![](/Screenshots/following3.jpg)

![](Screenshots/following1.jpg)

### Get notifications when other users follow you or comment on your posts

![](Screenshots/activity.jpg)

## API Overview

/api
.
├── /auth', authRouter
|   └── GET
|       ├── /:username
|   └── POST
|       ├── /login
|   └── PUT
|       └── /login
├── /avatar', avatarRouter
|   └── POST
|       ├── /upload
|   └── PATCH
|       ├── /upload/:avatar_id
|   └── GET
|       └── /download
├── /user', userRouter
|   └── POST
|       ├── /
|   └── GET
|       ├── /:user_id
|       └── /user/:user_id
├── /follow', followRouter
|   └── GET
|       ├── /
|   └── POST
|       ├── /
|   └── DELETE
|       └── /
├── /post', postRouter
|   └── POST
|       ├── /upload
|   └── GET
|       ├── /download
|       ├── /feed
|       └── /:post_id
├── /comment', commentRouter
|   └── GET
|       ├── /:post_id
|   └── POST
|       └── /:post_id
├── /activity', unreadActivitiesRouter
|   └── GET
|       └── /

## GET /api/auth/:username
// req.body
{ 
    authToken: String,
    user: []
}

//res.body
{
    user: []
}

## POST /api/auth/login
// req.body
{ 
    username: String, 
    user_password: String
}

//res.body
{
    authToken: String
}

## PUT /api/auth/login
// req.body
{ 
    username: String, 
    user_id: Integer,
    fullname: String,
    email: String,
    about_user: String,
    user_stack: String
}

//res.body
{
    authToken: String
}

## POST /api/avatar/upload
// req.body
{ 
    authToken: String,
    storage: {},
    upload: {},
    uploadData: {},
    imgData: String,
    user_id: String
}

// req.params
{
    path: String|Number,
    options: String
}

//res.body
{
    status: 201
}

## PATCH /api/avatar/upload/:avatar_id
// req.body
{ 
    updateData: {},
    imgData: String,
    user_id: String
}

// req.params
{
    path: String|Number,
    options: String,
    avatar_id: String
}

//res.body
{
    status: 204
}

## GET /api/avatar/download
// req.body
{ 
    user_id: String
}

// req.params
{
    path: Sting|Number,
    options: String,
    avatar_id: String
}

//res.body
{
    user_avatar: {}
}

## POST /api/user/
// req.body
{
  fullname: String,
  username: String,
  user_password: String,
  email: String,
  newUser: {}
}

// res.body
{
  user_information: {}
}

## GET /api/user/:user_id
// req.params
{
  id: user_id
}

//req.body
{
  authToken: String,
}

// res.body
{
  user: Integer
}

## GET /api/user/user/:user_id
//req.params
{
  id: user_id
}

//req.body
{
  authToken: String,
}

//res.body
{
  user_info: {},
  NoPost: Integer,
  FBU: Integer,
  UF: Integer
}

## GET /api/follow/
//req.body
{
  authToken: String,
  user.id: Integer
}

//res.body
{
  Status: 200,
  followedByUser: {},
  followingUser: {}
}

## POST /api/follow/
//req.body
{
  authToken: String,
  following_id: Integer,
  user.id: Integer
}

//res.body
{
  Status: 200,
  following: {}
}

## DELETE /api/follow/
//req.body
{
  authToken: String,
  following_id: Integer,
  user.id: Integer
}

//res.body
{
  Status: 200,
  following: {}
}

## POST /api/post/upload
//req.body
{
  authToken: String,
  uploadData: {},
  imgData: {},
  user.id: Integer,
}

//res.body
{
  Status: 201,
}

## GET /api/post/download
//req.body
{
  authToken: String,
  query: {},
  user.id: Integer
}

//res.body
{
  results: {}
}

## GET /api/post/feed
//req.body
{
  authToken: String,
  query: {},
  user.id: Integer
}

//res.body
{
  results: {}
}

## GET /api/post/:post_id
//req.params
{
  post_id: String
}

//req.body
{
  authToken: String,
}

//res.body
{
  post: {},
  user: {}
}

## GET /api/comment/:post_id
//req.params
{
  post_id: String
}

//req.body
{
  authToken: String,
}

//res.body
{
  status: 200,
  comments: {}
}

## POST /api/comment/:post_id
//req.params
{
  post_id: String
}

//req.body
{
  authToken: String,
  user.id: Integer
}

//res.body
{
  status: 200,
  comments: {}
}

## GET /api/activity/ 
//req.body
{
  authToken: String,
  user.id: Integer
}

//res.body
{
  status: 200,
  followedByUser: {},
  unreadFollowingUser: {}
  unreadCommentsForUser: {}
}

## Authors

<ul>`Init` was created by:
<li>Adyceum Magna Ccarri - Full Stack - [i-MCarri]()</li>
<li>Rachel Reilly - Full Stack - [Rachanastasia](https://github.com/Rachanastasia)</li>
<li>Steven Henderson - Full Stack - [Hendoe](https://github.com/Hendoe)</li>
<li>Trevor J Alt - Full Stack - [trevorjalt](https://github.com/trevorjalt)</li>
</ul>

## Contributors

Alex Cumbo

## Acknowledgements

Capi Etheriel, Gwynn Dandridge-Perry, Sarkis Melkonyan, and more.
