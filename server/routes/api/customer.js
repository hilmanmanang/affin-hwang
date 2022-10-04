const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

router.get('/', async (req, res) => {
    const customer = await loadCustomerCOllection();
    res.send(await customer.find({}).toArray());
});

router.post('/', async (req, res) => {
    const customer = await loadCustomerCOllection();
    await customer.insertOne({
        name: req.body.name,
        age: req.body.age
    })
    res.status(201).send();
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