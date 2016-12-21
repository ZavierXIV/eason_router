var mongoose = require('mongoose');

var productSchema = mongoose.Schema;
var schemaName = 'Product';

var schema = productSchema({
       category:{
           type: productSchema.Types.ObjectId,
           ref:'Category'
       },

       name:String,
       price:Number,
       image:String
    });

module.exports = mongoose.model(schemaName, schema);
