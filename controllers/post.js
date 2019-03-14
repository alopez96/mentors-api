//get all general posts
const handlegetEvents = (req,res,db) => {
    db.select('title', 'description','userid','created').from('posts')
    .then(data => {
        if(data){
        return db.select('*').from('posts')
        .orderBy('created', 'desc')
        .then(event => {
            res.json(event)
        })
        .catch(err => res.status(400).json('unable to find events'))
        }
        else{
            res.status(400).json('event does not exist')
        }
    })
    .catch(err => res.status(400).json('event does not exist'))
}



//create new general post
const createPost = (req, res, db) => {
    const { title, imageurl, description, userid } = req.body

    if(!description || !userid){
        return res.status(400).json('incorrect form submission');
    }
    db.transaction(trx => {
      trx.insert({
        title: title,
        imageurl: imageurl,
        description: description,
        userid: userid,
        created: new Date()
      })
      .into('posts')
      .then(event => {
          res.json(event[0])
      })
      .then(trx.commit)
      .catch(trx.rollback)
    })  
    .catch(err => res.status(400).json('unable to create event'))
    
  }

//get all questions
const findQuestions = (req,res,db) => {
    db.select('*').from('questions')
    .then(data => {
        if(data){
        return db.select('*').from('questions')
        .orderBy('created', 'desc')
        .then(event => {
            res.json(event)
        })
        .catch(err => res.status(400).json('unable to find events'))
        }
        else{
            res.status(400).json('event does not exist')
        }
    })
    .catch(err => res.status(400).json('event does not exist'))
}

//create new question
const newQuestion = (req, res, db) => {
    const { subject, title, body, imageurl, userid } = req.body

    if(!body || !userid){
        return res.status(400).json('incorrect form submission');
    }
    db.transaction(trx => {
      trx.insert({
        subject,
        title,
        body,
        imageurl,
        userid: userid,
        created: new Date()
      })
      .into('questions')
      .then(event => {
          res.json(event[0])
      })
      .then(trx.commit)
      .catch(trx.rollback)
    })  
    .catch(err => res.status(400).json('unable to create event'))
}


module.exports = {
    handlegetEvents,
    createPost,
    findQuestions,
    newQuestion
}
