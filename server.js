var express = require('express'),
    multer  = require('multer'),
    app     = express(),
    port = 5555;

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    console.log(file);
    callback(null, Date.now() + '.' + file.originalname);
  }
});
var upload = multer({ storage : storage }).single('theFile');

app.get('/',function(req,res){
  res.sendFile(__dirname + '/index.html');
});

app.post('/startUpload',function(req,res){
  upload(req,res,function(err) {
    if(err) {
      console.log(err);
      return res.end('Error uploading file.');
    }
    res.end('File has uploaded');
  });
});

app.listen(port, function(){
    console.log('http://localhost:' + port);
});
