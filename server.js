var express = require('express');
var app = express();
var mongojs= require('mongojs');
var db= mongojs('WSR',['WSR']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname+ "/public"));
app.use(bodyParser.json());
//*******************Fetching the data********************
app.get('/contactlist',function(req,res)
{
	//console.log("I received the get request");
	db.WSR.find(function(err,docs)
	{
	 //console.log(docs);
	 res.json(docs);
	});
	 
	 
});

//*******************Inserting the data**********************
app.post('/contactlist', function(req,res){
  //console.log(req.body);
  db.WSR.insert(req.body,function(err,doc){
    res.json(doc);
  });
});

//********************Deleting the data*********************
app.delete('/contactlist/:id',function(req,res){
 var id=req.params.id;
 //console.log(id);
 db.WSR.remove({_id:mongojs.ObjectId(id)},function(err,doc){
  res.json(doc);
 });
 
});

//**********************Updating the data********************
app.put('/contactlist', function(req,res){

var id = req.body.id;
console.log("Id " + id)
  //console.log(req.body);
  db.WSR.update({_id:mongojs.ObjectId(id)} , req.body , function(err,doc){
    res.json(doc);
  });
});


app.listen(3000);
console.log("server running on port:3000");