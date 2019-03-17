//get all posts
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



//create new post
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

//edit post
const editPost = (req, res, db) => {
    const { title, imageurl, description, userid, postid } = req.body
    if(!userid){
        return res.status(400).json('user must be signed in');
    }
    db('posts')
    .where({ postid: postid })
    .andWhere( {userid: userid})
    .update({
        title,
        imageurl,
        description
    })
    .then(updatedPost => {
        res.json(updatedPost[0])
    })
    .catch(err => { res.status(400).json('unable to update post')})
}


module.exports = {
    handlegetEvents,
    createPost,
    editPost
}
