var mongoose = require('mongoose');

var userSchema = mongoose.Schema;
var schemaName = 'User';

var schema = userSchema(
    {
        email:
        {
            type:String,
            unique:true,
            lowercase:true,
        },

        token:String,
        facebook:String,

        profile:
        {
            username:
            {
                type:String,
                default:'',
            },
            picture:
            {
                type:String,
                default:'',
            },
        },

        data:
        {
            totalValue:
            {
                type:Number,
                default:0,
            },

            cart:
            [
                {
                    product:
                    {
                        type:mongoose.Schema.Types.ObjectId,
                        ref:'Product'
                    },
                    quantity:
                    {
                        type:Number,
                        default:1,
                        min:1,
                    },
                    subtotal:
                    {
                        type:Number,
                        default:0,
                        min:0,
                    }
                }
            ]
        }
    });

module.exports = mongoose.model(schemaName, schema);