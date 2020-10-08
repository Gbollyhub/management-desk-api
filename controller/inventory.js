const Inventory = require('../models/inventory')

exports.createInventory = async (req, res) => {
    try{
        let ref_id = 'ref-' + Math.random().toString(36).substr(2, 10);
     const inventory = new Inventory({
        "owner": req.user._id,
        "item": req.body.item,
        "details": req.body.details,
        "stock_value": req.body.stock_value,
        "supplier": req.body.supplier,
        "cost": req.body.cost,
        "price": req.body.price
     })
    await inventory.save()
    res.status(201).send({message: "Created Successful"})
    }
    catch(e){
        res.status(400).send({ error: 'Operation Failed'})
    }
}

exports.getInventory = async (req, res) => {
    try {
        const inventory = await Inventory.find({owner: req.user._id})
        res.send(inventory)
    } catch (error) {
        res.status(500).send({error:"Operation Failed"})
    }
    
}

exports.updateInventory = async (req, res) => {
    const _id = req.params.id

    try {
     const task = await Inventory.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
     if(!task){
       return  res.status(404).send()
     }
     
     res.send(task)

    }
    catch(e){
        res.status(400).send(e)
    }
 }


 exports.deleteInventory = async (req, res) => {
    const _id = req.params.id
    try{
       
     const task = await Inventory.deleteOne({ _id: req.params.id, owner: req.user._id })
     if(!task){
        return  res.status(404).send()
      }
      
    res.send(task)
    }
    catch(e){
        res.status(400).send(e)
    }
 }