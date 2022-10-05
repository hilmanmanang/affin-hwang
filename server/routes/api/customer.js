const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

router.get('/', async (req, res) => {
    const customer = await loadCustomerCOllection();
    res.send(await customer.find({}).toArray());
});

router.get('/:id', async (req, res) => {
    const customer = await loadCustomerCOllection();
    res.send(await customer.findOne({_id: new mongodb.ObjectId(req.params.id)}));
    res.status(200).send();
})

router.post('/', async (req, res) => {
    const customer = await loadCustomerCOllection();
    await customer.insertOne({
        name: req.body.name,
        age: req.body.age
    })
    res.status(201).send();
});

router.put('/', async (req, res) => {
    const body = {
        name: req.body.name,
        age: req.body.age
    }
    const customer = await loadCustomerCOllection();
    await customer.updateOne({_id: new mongodb.ObjectId(req.body._id)}, {$set: body} )
    res.status(200).json({msg: 'updated'});
});

router.delete('/:id', async (req, res) => {
    const customer = await loadCustomerCOllection();
    await customer.deleteOne({_id: new mongodb.ObjectId(req.params.id)});
    res.status(200).send();
});

async function loadCustomerCOllection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://hilmanmanang:rZeFJ4DvtTLA2sk2@cluster0.o2c6v.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });

    return client.db('affin-db').collection('customer');
}

module.exports = router;