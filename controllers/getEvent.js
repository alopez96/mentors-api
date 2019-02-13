const handleEvents = (req,res,db) => {
    const {name, date,time,location,description,userid,created} = req.body;
  
    db.select('name', 'date','time','location','description','userid','created').from('events')
  
    .then(data => {
        if(data){
        return db.select('*').from('events')
        
        .then(event => {
            res.json(event)
        })
        .catch(err => res.status(400).json('unable to find event'))
        }
        else{
        res.status(400).json('event does not exist')
        }
    })
    .catch(err => res.status(400).json('event does not exist'))

}

module.exports = {
    handleEvents
}
