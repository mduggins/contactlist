var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose')
    path = require('path'),
    Contact = require('./models/contact'),
    app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}), bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));

mongoose.connect('mongodb://localhost/contacts', (err) => {
  if (err) {
    console.log('MongoDB server did not start', err);
  }else{
    console.log('MongoDB started successfully!');
  }
});

app.get('/', (req, res) => {
  res.send('this is from the server');
});

app.get('/contacts/all', (req, res) => {
  Contact.find({})
    .populate('contacts')
    .exec(function(err, contacts){
      res.json(contacts)
    });
});

app.post('/contact/create', (req, res) => {
  var newContact = new Contact(req.body)
  newContact.save((err, data) => {
    if (err){
      console.error('Did not save:', err)
    }else{
      console.log('Contact Saved!')
      res.json(data)
    }
  })
});

app.put('/contact/update', (req, res) => {
  res.send('this is the update page')
});

app.listen(3000);
