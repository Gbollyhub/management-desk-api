const Planner = require('../models/planner')

exports.createPlanner = async (req, res) => {
    try{
        let ref_id = 'ref-' + Math.random().toString(36).substr(2, 10);
     const planner = new Planner({
        "owner": req.user._id,
        "details": req.body.details,
        "completed": false,
        "date_due": req.body.date_due,
     })
    await planner.save()
    res.status(201).send({message: "Created Successful"})
    }
    catch(e){
        res.status(400).send({ error: 'Operation Failed'})
    }
}

exports.getPlanner = async (req, res) => {
    try {
        const planner = await Planner.find({owner: req.user._id})
        res.send(planner)
    } catch (error) {
        res.status(500).send({error:"Operation Failed"})
    }
    
}

exports.updatePlanner = async (req, res) => {
    const _id = req.params.id

    try {
     const task = await Planner.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
     if(!task){
       return  res.status(404).send()
     }
     
     res.send(task)

    }
    catch(e){
        res.status(400).send(e)
    }
}

exports.deletePlanner = async (req, res) => {
       const _id = req.params.id
    try{
       
     const task = await Planner.deleteOne({ _id: req.params.id, owner: req.user._id })
     if(!task){
        return  res.status(404).send()
      }
      
    res.send(task)
    }
    catch(e){
        res.status(400).send(e)
    }

}