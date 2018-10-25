var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongo = require('mongoose');
var cors = require('cors');
var router = express.Router();

var db = mongo.connect("mongodb://localhost:27017/test", function (err, response) {
  if (err) { console.log(err); }
  else { console.log('Connected to db'); }
});


var app = express();
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/',function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

var Schema = mongo.Schema;

var UsersSchema = new Schema({
  _id: { type: String },
  company: { type: String },
  contact: { type: String },
  country: { type: String }
}, { versionKey: false });


var model = mongo.model('customers', UsersSchema, 'customers');

app.post("/api/saveUser", function (req, res) {
  var mod = new model(req.body);
  if (req.body.mode == "Save") {
    mod.save(function (err, data) {
      if (err) {
        res.send(err);
      }
      else {
        res.send({ data: "Record has been Inserted..!!" });
      }
    });
  }
  else {
    model.findByIdAndUpdate(req.body._id, { company: req.body.company, contact: req.body.contact, country: req.body.country },
      function (err, data) {
        if (err) {
          res.send(err);
        }
        else {
          res.send({ data: "Record has been Updated..!!" });
        }
      });


  }
})

app.post("/api/deleteUser", function (req, res) {
  model.remove({ _id: req.body.id }, function (err) {
    if (err) {
      res.send(err);
    }
    else {
      res.send({ data: "Record has been Deleted..!!" });
    }
  });
})



app.get("/api/getUser",function(req,res){  
    model.find({},function(err,data){  
              if(err){  
                  res.send(err);  
              }  
              else{                
                  res.send(data);  
                  }  
          });  
  })  

app.listen(8080, function () {

  console.log('Example app listening on port 8080!')
})  

