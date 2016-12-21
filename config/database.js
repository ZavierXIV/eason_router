// mongoose api http://mongoosejs.com/docs/2.7.x/docs/updating-documents.html
var mongoose = require('mongoose');

var dbURI = "mongodb://mlab_user:mlab_pass@ds159767.mlab.com:59767/eason_db";

mongoose.connect(dbURI);

mongoose.connection.on('connected',function()
{
    console.log('mongoose connected to '+dbURI);
});

mongoose.connection.on('error', function(err)
{
    console.log('mongoose connected error: '+err);
});