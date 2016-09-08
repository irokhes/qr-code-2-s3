var qr = require('qr-image');  
var express = require('express');
var imageProvider = require('./image-provider.js');
var app = express();

app.get('/', function(req, res) {  
    var code = qr.image("{evnet:'Apple Dev Conference', type: 'day pass'}", { type: 'png' });
    imageProvider.saveImage('south-summit', code, 'png').then(image =>{
        console.log(image);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(image));
    });
});

app.listen(3000);  