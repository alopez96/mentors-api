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


//register user
app.post('/register', (req,res) => { register.handleRegister(req, res, db, bcrypt) })

//sign in user
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

//search user
app.get('/findUser/:name', (req, res) => { getUsers.handleUsers(req,res,db) })

//get this user profile
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req,res,db) })

//get all events events from post
app.get('/getEvents', (req, res) => { posts.handlegetEvents(req,res,db) })

//post event
app.post('/createEvent', (req, res) => { posts.createPost(req,res,db) })

//get all questions
app.get('/getQuestions', (req, res) => { posts.findQuestions(req,res,db) })

//post new questions
app.post('/createQuestion', (req, res) => { posts.newQuestion(req,res,db) })

//edit profile
app.put('/editProfile', (req, res) => { profile.editProfile(req,res,db) })

app.listen(3000, () => {
    console.log('app is running on port 3000')
})