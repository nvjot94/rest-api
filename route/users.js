const router = require("express").Router();
const mongoose = require("../db/connection");
const userModel = require("../db/userSchema");
const querystring = require('querystring');
const url = require('url');


router.post("/users", (req, res) => {
    console.log("i go her at signup", req.body);
    if (req.body.id && req.body.first_name && req.body.last_name && req.body.company_name && req.body.city && req.body.state && req.body.zip && req.body.age && req.body.email && req.body.web) {
        userModel.find({
            id: req.body.id
        }, (err, data) => {
            if (err)
                console.log(err);

            else if (data.length > 0) {
                res.json({
                    "status": "user Already registered with this id"
                });
            } else if (data.length == 0) {

                userModel.create(req.body, (err) => {
                    if (err)
                        console.log("ERROR IS", err);
                });
                res.status(201).json({
                    status: "user Registered"
                });
            }
        });
    } else {
        res.json({
            msg: "some credential is wrong/empty"
        });
    }
});



router.get("/users", (req, res) => {

    let parsedUrl = url.parse(req.url);

    let parsedQs = querystring.parse(parsedUrl.query);
    console.log(parsedQs);

    if(parsedQs.name)
    {
        userModel.find({
            $or: [{
                    "first_name": {
                        $regex: parsedQs.name
                    }
                },
                {
                    "last_name": {
                        $regex: parsedQs.name
                    }
                }
            ]
        }, (err, data) => {
            if (err)
                console.log(err);
    
            else if (data) {
    
                data1 = data.slice((parsedQs.page - 1) * parsedQs.limit, parsedQs.limit * parsedQs.page);
    
                if (!parsedQs.sort.startsWith("-")) {
                    console.log("ascscending");
                    var sortedData = data1.sort(function (a, b) {
                        return parseInt(a[parsedQs.sort]) - parseInt(b[parsedQs.sort]);
                    });
                    res.status(200).json(sortedData);
                }
    
                if (parsedQs.sort.startsWith("-"))
    
                {
                    console.log("descending",parsedQs.sort.split("-")[1]);
                    var sortedData = data1.sort(function (a, b) {
                        return parseInt(b[parsedQs.sort.split("-")[1]]) - parseInt(a[parsedQs.sort.split("-")[1]]);
                    });
                    res.status(200).json(sortedData);
                    
                }
            }
    
        });
    }
    if(!parsedQs.name)
    {
        userModel.find({},(err,data)=>
            {
                res.status(200).json(data);
                
            });
    }
    

});



router.put("/users", (req, res) => {
    let parsedUrl = url.parse(req.url);

    let parsedQs = querystring.parse(parsedUrl.query);

    userModel.findOneAndUpdate({
        id: parsedQs.id
    }, req.body, (err, data) => {
        if (err)
            console.log(err);

        else if (!data) {
            res.status(200).json({
                "status": "user with this id doesnt exist"
            });
        } else if (data) {
            res.json({
                "status": "details Updated"
            });
        }

    });

});

router.delete("/users", (req, res) => {
    let parsedUrl = url.parse(req.url);

    let parsedQs = querystring.parse(parsedUrl.query);

    userModel.findOneAndRemove({
        id: parsedQs.id
    }, (err, data) => {
        if (err)
            console.log(err);

        else if (!data) {
            res.status(200).json({
                "status": "user with this id doesnt exist"
            });
        } else if (data) {
            res.status(200).json({
                "status": "user with this id has been deleted"
            });
        }

    });

});


module.exports = router;