var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();
var port = 3000 || process.env.PORT;



app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
    {
        extended:true
    }));


app.use(morgan('dev'));



require('./config/database.js');

// faker module
var apiRouter = require('./api/api.js');
// set subRouter for faker
// localhost:3000/api/xxxx   will link apiRouter
app.use('/api', apiRouter);

require('./app/routes.js')(app);

app.use(express.static(__dirname+'/public'));

// =========== launch ====
app.listen(port, onServerRunning());

function onServerRunning()
{
    console.log("Server is running on port "+port +"...");
}