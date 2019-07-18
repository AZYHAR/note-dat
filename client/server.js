const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
var proxy = require('express-http-proxy');

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname + '/dist'));

app.all('/api/*', proxy('https://node-dat-backend.herokuapp.com/api*'));

app.all('*', function(request, response){
    // request.redirect('https://node-dat-backend.herokuapp.com/api/*');
    response.sendFile(path.resolve(__dirname + '/dist', 'index.html'));
});

app.listen(port);