const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const getUsers = require('./controllers/getUsers');
const profile = require('./controllers/profile');
const posts = require('./controllers/post');
const question = require('./controllers/question');
const mysql = require('./sql');

const db = knex({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : mysql.user,
      password : mysql.pass,
      database : mysql.database
    }
  });
  
  db.select('name').from('users').then(data => {
    console.log('users', data)
  })
  
  const app = express();
  
  app.use(bodyParser.json());
  app.use(cors());

//users
//register user
app.post('/register', (req,res) => { register.handleRegister(req, res, db, bcrypt) })
//sign in user
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })
//search user
app.get('/findUser/:name', (req, res) => { getUsers.handleUsers(req,res,db) })
//get this user profile
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req,res,db) })

//posts
//get all posts
app.get('/getEvents', (req, res) => { posts.handlegetEvents(req,res,db) })
//new post
app.post('/createEvent', (req, res) => { posts.createPost(req,res,db) })
//edit post
app.put('/editPost', (req, res) => { posts.editPost(req,res,db) })
//delete post
app.put('/deletePost', (req, res) => { posts.removePost(req,res,db) })

//questions
//get all questions
app.get('/getQuestions', (req, res) => { question.findQuestions(req,res,db) })
//post new questions
app.post('/createQuestion', (req, res) => { question.newQuestion(req,res,db) })
//edit profile
app.put('/editProfile', (req, res) => { profile.editProfile(req,res,db) })

app.listen(3000, () => {
    console.log('app is running on port 3000')
})