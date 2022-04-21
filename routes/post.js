const Post = require("../model/post")
const Category = require("../model/category")
const express = require('express')
const router = express.Router();
const {google} = require("googleapis");
const Review = require("../model/review");
const Address = require("../model/address");
const User = require("../model/user");
// const Review = require("../model/review");




router.get('/post/:postType', function(req, res, next){
    Post.find({postType: req.params.postType}).populate("category").populate("user").then(function(posts){
       res.send(posts)
    })
})


router.get('/posts/:id', function(req, res, next){
    Post.find({user:req.params.id}).populate("category").then(function(posts){
       res.send(posts)
    })
})



router.get('/address/:id', function(req, res, next){
    Address.findOne({user:req.params.id}).then(function(posts){
       res.send({message:posts})
    })
})


router.put("/update/:id", function (req, res, next) {
    Address.updateOne(
      { user: req.params.id },
      {
        postcode: req.body.postcode,
        state: req.body.state,
        city: req.body.city,
        country: req.body.country,
      },
      function (err, docs1) {
        if (err) {
          res.status(400).send({ message: "failed to update" });
        } else {
              User.updateOne({_id: req.params.id}, 
                    {phone: req.body.phone,
                    // email: req.body.email,
                    fullname: req.body.fullname,
                    image: req.body.image
                    }, function (err, docs2) {
                    if (err){
                        res.status(400).send({ message: "failed to update" });
                    }
                    else{
                            Address.findOne({ user: req.params.id }).then(function (address) {
                                User.findOne({ _id: req.params.id }).then(function (userinfo) {
                                    res.send({address, userinfo});
                                  });
          });
                    }
                });
            }
       
        }
      
    );
  });



// router.put('/update_address_user/:id', function(req, res, next){
//     Address.updateOne({user:req.params.id}, {
//         postcode: req.body.postcode,
//         state: req.body.state,
//         city: req.body.city,
//         country: req.body.country,
//         // function (err, docs1) {
//         //     if (err){
//         //         console.log(err)
//         //     }
//         //     else{
//         //         es.send({...docs1})
//                 // console.log("Updated Docs : ", docs1);
//                 // User.updateOne({user: req.params.id}, 
//                 //     {phone: req.body.phone,
//                 //     fullname: req.body.fullname,
//                 //     image: req.body.image
//                 //     }, function (err, docs2) {
//                 //     if (err){
//                 //         console.log(err)
//                 //     }
//                 //     else{
//                 //         console.log("Updated Docs : ", docs2);
//                 //         res.send({...docs1, ...docs2})
//                 //     }
//                 // });
//             // }
//         // }
//     }).then(function(e){
//         res.send(e)
//     })
// })



router.get('/posts', function(req, res, next){
    Post.find({}).then(function(posts){
       res.send(posts)
    })
})


router.get('/review/:postID', function(req, res, next){
    Review.find({post: req.params.postID}).populate("user").then(function(posts){
       res.send(posts)
    })
})



router.get('/review', function(req, res, next){
    Review.find({}).populate("post").then(function(posts){
        if(posts){
            res.send(posts)
        }else{
            res.send({message: "success"})
        }
       
    }).catch(next)
})


router.post('/review', function(req,res,next){
      Review.create(req.body).then(function(review){
          res.send(review)
      })
})



router.post('/category', function(req,res,next){
    Category.create(req.body).then(function(category){
        res.send(category)
    })
})



router.post('/post', function(req,res,next){
    Post.create(req.body).then(function(posts){
        res.send(posts)
    })
})



router.get('/category',async function(req, res, next){
 Category.find({}).then(async function(category){
    let result = []
       for(e of category){
      await  Post.find({category: e._id}).then(function(post){
            result = [...result, {
                adtotal: post.length,
                category: e.title,
                catID: e._id
            }]
        })
        
       }
       res.send(result)
    })
})


module.exports = router;