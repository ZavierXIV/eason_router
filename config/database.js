// mongoose api http://mongoosejs.com/docs/2.7.x/docs/updating-documents.html
var mongoose = require('mongoose');

var dbURI = process.env.DBURI;

mongoose.connect(dbURI);

mongoose.connection.on('connected',function()
{
    console.log('mongoose connected to '+dbURI);
});

mongoose.connection.on('error', function(err)
{
    console.log('mongoose connected error: '+err);
});