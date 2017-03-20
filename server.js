const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
  // Note: __dirname is directory that contains the JavaScript source code.
})

app.post('/input', (req, res) => {
  console.log(req.body);
})

app.listen(3000, function() {
  console.log('Listening on port 3000');
})
