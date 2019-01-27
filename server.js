const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : '',
      password : '',
      database : 'mentors-db'
    }
  });
  
  db.select('*').from('users').then(data => {
    console.log(data)
  })
  
  const app = express();
  
  app.use(bodyParser.json());
  app.use(cors());

//register user
app.post('/register', (req,res) => { register.handleRegister(req, res, db, bcrypt) })

//sign in user
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.listen(3000, () => {
    console.log('app is running on port 3000')
})