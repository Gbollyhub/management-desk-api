const Transaction = require('../models/transactions')

exports.createTransaction = async (req, res) => {
    try{
        let ref_id = 'ref-' + Math.random().toString(36).substr(2, 10);
     const transaction = new Transaction({
        "owner": req.user._id,
        "transaction_type": req.body.transaction_type,
        "item": req.body.item,
        "details": req.body.details,
        "quantity": req.body.quantity,
        "amount": req.body.amount,
        "account_balance": req.body.account_balance,
        "ref_id": ref_id
     })
    await transaction.save()
    res.status(201).send({message: "Transaction Successful"})
    }
    catch(e){
        res.status(400).send({ error: 'Transaction Failed'})
    }
}

exports.getTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.find({owner: req.user._id})
        res.send(transaction)
    } catch (error) {
        res.status(500).send({error:"Operation Failed"})
    }
    
}