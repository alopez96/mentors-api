
const handleProfileGet = (req, res, db) => { 
    const {id} = req.params
    db.select('*').from('users').where({
        id: id
    }).then(user => {
        if(user.length){
        res.json(user[0])
        } else {
        res.status(400).json('not found')
        }
    })
    .catch( err => { res.status(400).json('error getting user')})
    
}



const editProfile = (req, res, db) => {
    const {email, name, password } = req.body
    if(!email || !name || !password){
        return res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password)
    db.transaction(trx => {
      trx.insert({
        hash: hash,
        email: email      
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return db('users')
          .returning('*')
          .insert({
            email: email,
            name: name,
            joined: new Date()
          }).then(user => {
            res.json(user[0])
        })
      })
      .then(trx.commit)
      .catch(trx.rollback)
    })  
    .catch(err => res.status(400).json('unable to register'))
    
  }


module.exports = {
    handleProfileGet,
    editProfile
}