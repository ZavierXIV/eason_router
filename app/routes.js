function routeProcess(app) 
{
    app.get("/", function (req, res) {
        res.send("Hi there, welcome to my assignment eaons kai");
    });
    
    app.get("/speak/:item", function (req, res) {
        var item = req.params.item;
        var result = 'Sorry,page not found...';
        switch(item)
        {
            case "pig":
                result = "The pig says 'Oink'";
                break;
            case "cow":
                result = "The cow says 'Moo'";
                break;
            case "dog":
                result = "The dog says 'Woof Woof !'";
                break;
        }
        res.send(result);
    });  
    
    app.get("/repeat/:action/:count", function (req, res) {
        var action = req.params.action;
        var count = req.params.count;
        
        var result = "";
        if(isNaN(count))
        {
            result = 'Sorry,page not found...';
        }
        else
        {
            for(var i=0; i<count; i++)
                result += action+" ";
        }
        
        res.send(result);
    }); 
    
    // app.get("*", function (req, res) {
    //     var result = 'Sorry,page not found...';
    //     res.send(result);
    // });

    // mlab access
    // *****************************************************************

    var Category = require('./models/category.js');
    var Product = require('./models/product.js');
    // 新增一個 category類別
    app.post('/mlab/addCategory', function(req, res)
    {
        var category = new Category();
        var name = req.body.name;
        category.name = name;

        category.save(function(err, category)
        {
            if(err)
            {
                res.status(500).json({ error:err.toString() });
            }
            else
            {
                res.json(
                    {
                        category:category
                    });
            }
        });
    });

    // 利用名稱 找出DB中符合名字的資料 （findOne 回傳第一個找到的資料） 
    app.get('/mlab/findCategory/:name', function(req, res)
    {
        Category.findOne(
            {
                name : req.params.name
            }, 
            function(err, category)
            {
                if(err)
                {
                    return res.status(500).json(
                        {
                            error:err.toString()
                        });
                }
                if(!category)
                {
                    var msg = 'not found name '+req.params.name;
                    //data notfind
                    return res.status(404).json(
                        {
                            error: msg
                        });
                }

                res.json(
                    {
                        category:category
                    });
            });
    });

    // 回傳所有 category , 條件式{} 為空, 則回傳全部 
    app.get('/mlab/getCategories', function(req, res)
    {
        Category.find({}, function(err, categories)
        {
            if(err)
            {
                return res.status(500).json(
                    {
                        error: err.toString()
                    });
            }

            res.json(
                {
                    categories:categories
                });
        });
    });

    app.get('/mlab/getProducts', function(req, res)
    {
        Product.find({}, function(err, products)
        {
            if(err)
            {
                return res.status(500).json(
                    {
                        error:err.toString()
                    });
            }
            else
            {
                res.json(
                    {
                        fun:'getProducts',
                        products:products,
                    });
            }
        });
    });

    // 找出price 相同的 products
    app.get('/mlab/getProductsByPrice/:price', function(req, res)
    {
        Product.find(
            {
                price : {$gt : req.params.price}
                // price : {$gt: 500, $lt: 1000}  找出錢大於 500 小於1000
            }, 
            function(err, products)
            {
                if(err)
                {
                    return res.status(500).json(
                        {
                            error:err
                        });
                }
                else if(!products)
                {
                    return res.status(404).json(
                        {
                            error:'not found data'
                        });
                }
                else
                {
                    res.json(
                        {
                            fun:'getProductsByPrice',
                            products:products,
                        });
                }
            });
    });

    // 更新 product 的 price 為 oldPrice 更新為 newPrice
    app.get('/mlab/updateProductPrice/:oldPrice/:newPrice', function (req, res) 
    {
        var conditions = { price :req.params.oldPrice};
        var update = {price : req.params.newPrice};
        var options = {multi:true};

        Product.update(
            conditions,
            update,
            options,
            function(err, numAffected)
            {
                if(err)
                {
                    res.status(500).json({error:err});
                }
                else
                {
                    res.json(
                        {
                            numAffected:numAffected
                        });
                }
            });    
    });

    // 刪除 符合價格的 products
    app.get('/mlab/removeProductPrice/:removePrice', function(req, res)
    {
        Product.remove(
            {
                price:req.params.removePrice
            },
            function(err, removed)
            {
                if(err)
                {
                    return res.status(500).json({error:err});
                }
                else
                {
                    res.json(
                        {
                            removed:removed
                        });
                }
            });
    });
   
}

module.exports = routeProcess;
