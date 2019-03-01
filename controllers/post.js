const handlegetEvents = (req,res,db) => {
    const { offsetVal } = req.params;
    var offset = parseInt(offsetVal, 10);
    db.select('title', 'description','userid','created').from('posts')
    .then(data => {
        if(data){
        return db.select('*').from('posts')
        // .limit(3).offset(offset)
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


module.exports = {
    handlegetEvents,
    createPost
}
