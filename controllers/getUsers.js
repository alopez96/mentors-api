
const handleUsers = (req,res,db) => {
    const {name} = req.params;
    if(!name && !email){
        return res.status(400).json('incorrect form submission');
    }
    db.select('name', 'email').from('users')
    .where('name', '=', name)
    .then(data => {
        if(data){
        return db.select('id', 'name', 'city', 'major', 'imageurl').from('users')
        .where('name', 'like', '%'+name+'%')
        .orWhere('email', 'like', '%'+name+'%')
        .then(users => {
            res.json(users)
        })
        .catch(err => res.status(400).json('unable to find user'))
        }
        else{
        res.status(400).json('user does not exist')
        }
    })
    .catch(err => res.status(400).json('user does not exist'))

}

module.exports = {
    handleUsers
}