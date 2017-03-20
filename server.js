const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const MongoClient   = require('mongodb').MongoClient
const db;

MongoClient.connect('mongodb://dylan:kinner@ds137090.mlab.com:37090/dylans-app', (err, database) => {
  if (err) return console.log(err);
  db = database
  app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on 3000');
  })
})

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(express.statis('public'));

app.get('/', (req, res) => {
  db.collection('products').find().toArray((err, result) => {
    if (err) return console.log(err);
    res.render('index.ejs', {quotes: result});
  })
})

app.post('/products', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log('Saved to database');
    res.redirect('/');
  })
})

app.put('/products', (req, res) => {
  db.collection('products');
  .findOneAndUpdate({name: 'Spikeball'}, {
    $set: {
      name: req.body.name,
      price: req.body.price
    }
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/products', (req, res) => {
  db.collection('products').findOneAndDelete({name: req.body.name}, (err, result) => {
    if (err) return res.send(500, err);
    res.send('A product was deleted from the database');
  })
})
