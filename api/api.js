// 完整路徑 localHost: 3000/api/ xxxx
var router = require('express').Router();
var faker = require('faker');

var Category = require('../app/models/category.js');
var Product = require('../app/models/product.js');
var createFakeCount = 10;

router.get('/:categoryName', function(req, res, next)
{
    Category.findOne(
        {
            name: req.params.categoryName
        },
        function(err, category)
        {
            if(err)
                return next(err);

             for(var i=0; i<createFakeCount; i++)
             {
                 var product = new Product();
                 product.category = category._id;

                 product.name = faker.commerce.productName();
                 product.price = faker.commerce.price();
                 product.image = faker.image.image();
                 product.save();
             } 

             res.json(
                 {
                     message:'create fake data success ...'
                 });  
        });
});

module.exports = router;