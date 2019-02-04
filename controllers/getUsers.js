
const handleUsers = (req,res,db) => {
    const {name, email} = req.body;
    if(!name && !email){
        return res.status(400).json('incorrect form submission');
    }
    db.select('name', 'email').from('users')
    .where('name', '=', name)
    .then(data => {
        if(data){
        return db.select('*').from('users')
        .where('name', 'like', name+'%')
        .then(user => {
            res.json(user)
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