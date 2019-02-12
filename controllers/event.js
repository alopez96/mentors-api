
const handleEvent = (req, res, db) => {
    const { name, date, time, location,
         description, userid } = req.body

    if(!name || !date || !location){
        return res.status(400).json('incorrect form submission');
    }
    db.transaction(trx => {
      trx.insert({
        name: name,
        date: date,
        time: time,
        location: location,
        description: description,
        userid: userid,
        created: new Date()
      })
      .into('events')
      .then(event => {
          res.json(event[0])
      })
      .then(trx.commit)
      .catch(trx.rollback)
    })  
    .catch(err => res.status(400).json('unable to create event'))
    
  }

  module.exports = {
    handleEvent: handleEvent 
  };