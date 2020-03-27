const express = require('express');
const ObjectId = require('mongodb').ObjectID;
const API_KEY=process.env.VUE_APP_ENV_SHARESAPI;
const fetch = require('node-fetch');
const closeValuesResult = require('./closeValueFormatter.js')
// const dateFormatter = require('./dateFormatter.js')
const totalValueCalc = require('./totalValueCalc.js')


const createRouter = function (collection) {

  const router = express.Router();

  // INDEX
  router.get('/', (req, res) => {
    collection
    .find()
    .toArray()
    .then(docs => res.json(docs))
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.json({status: 500, error: err})
    });
  });
  // SHOW - INDEX
  router.get('/:id', (req, res) => {
    const id = req.params.id;
    collection
    .findOne({ _id: ObjectId(id) })
    .then((doc) => res.json(doc))
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.json({status: 500, error: err})
    });
  });

  router.post(`/stock/:symbol`, (req, res) => {
    const symbol = req.params.symbol;
    const stock = req.body
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${API_KEY}`

    fetch(url)
    .then(jsonData => jsonData.json())
    .then(data => {
      stock.closeValues = closeValuesResult(data)
      stock.totalValue = totalValueCalc(stock)

      collection
      .insertOne(stock)
      .then((result) => {
        res.json(result.ops[0])
      })
      })
      .catch((err) => {
        console.log(err);
        res.status(500);
        res.json({status: 500, error: err})
      });
    });

    // DESTROY - DELETE
  router.delete('/:id', (req, res) => { // MODIFIED
      const id = req.params.id;
      collection
      .deleteOne({ _id: ObjectId(id) }) // MODIFIED
      .then (result => res.json(result) // MODIFIED
      )
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
    });

    // CREATE - POST
    router.post('/', (req, res) => {
      const newData = req.body;
      collection
      .insertOne(newData)
      .then((result) => {
        res.json(result.ops[0])
      })
      .catch((err) => {
        console.log(err);
        res.status(500);
        res.json({status: 500, error: err})
      });
    });
    // UPDATE - PUT
    router.patch('/:id', (req, res) => {
      const id = req.params.id;
      const updatedData = req.body;
      delete updatedData._id
      collection
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: updatedData },
        { returnOriginal: false }
      )
      .then((result) => {
        res.json(result.value)
      })
      .catch((err) => {
        console.log(err);
        res.status(500);
        res.json({status: 500, error: err})
      });
    });
  return router;

};

module.exports = createRouter;
