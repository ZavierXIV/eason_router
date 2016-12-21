var mongoose = require('mongoose');
var schemaName = 'Category';

var categorySchema = mongoose.Schema;

var schema = categorySchema(
    {
       name:
       {
           type:String,
           unique:true,
           lowercase:true,
       },

       count:
       {
           type:Number,
           default:'10',
       }
    });

module.exports = mongoose.model(schemaName, schema);