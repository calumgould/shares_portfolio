const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');

const app = express();

app.use(cors());
app.use(bodyParser.json());

MongoClient.connect('mongodb://localhost:27017')
.then((client) => {
  const db = client.db('shares-portfolio');
  const sharesCollection = db.collection('shares');
  const sharesRouter = createRouter(sharesCollection);
  app.use('/api/shares', sharesRouter);
})
.catch(console.error);


app.listen(3000, function() {
  console.log(`Listening on port ${ this.address().port }`);
});
