
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
    const { userid, email, name, city, major, bio } = req.body
    if(!userid){
        return res.status(400).json('incorrect form submission');
    }
    db('users')
    .where({ id: userid })
    .update({
        email: email,
        name: name,
        city: city,
        major: major,
        bio: bio
    })
    .then(updatedUser => {
        res.json(updatedUser[0])
    })
    .catch(err => { res.status(400).json('unable to update user')})
      
    
    
  }


module.exports = {
    handleProfileGet,
    editProfile
}