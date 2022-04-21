
const express = require('express')
const router = express.Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const checkAuth = require("../middleware/validate");
const saltRounds = 10;
const { json } = require("body-parser");
const Post = require('../model/post');
const Review = require('../model/review');
const Address = require('../model/address');
const TOKEN_SECRET = "222hwhdhnnjduru838272@@$henncndbdhsjj333n33brnfn";

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};


function RemoveExtraSpace(value)
  {
    return value.replace(/\s+/g,' ');
  }

router.post("/login", function (req, res, next) {
  let { email, password } = req.body;
  if (email === "" || password === "" || !email || !password) {
    res.status(400).send({ message: "field cannot be empty" });
  }
  if (!validateEmail(RemoveExtraSpace(email))) {
    res.status(400).send({ message: "enter a valid email" });
  }
  User.findOne({ email: email })
    .then(function (user) {
      if (!user) {
        res.status(400).send({ message: "invalid credentials" });
      }

      else{
        bcrypt.compare(password, user.password).then(function (result) {
          if (!result) {
            res.status(400).send({ message: "invalid credentials" });
          }
         else{
          let token = jwt.sign({ id: user._id }, TOKEN_SECRET, {
            expiresIn: "3600000000s",
          });
            res.send({...user._doc, token:token});
         }
        });
      }
    })
    
    .catch(next);
});





router.post("/signup", function (req, res, next) {
  let { email, password, fullname, image, phone } = req.body;
  if (email === "" || password === "" || !email || !password || !image ||!phone) {
    res.status(400).send({ message: "field cannot be empty" });
  }
  else if (password.length <= 6) {
        res
          .status(400)
          .send({ message: "password must be greater than 6 characters" });
      }
      else if (!validateEmail(RemoveExtraSpace(email))) {
        res.status(400).send({ message: "enter a valid email" });
      }
     else{
        User.findOne({ email: email })
        .then(function (user) {
          if (user) {
            res.status(400).send({ message: "user already exist" });
          } else {
            bcrypt.hash(password, saltRounds, function (err, hashedPassword) {
              User.create({
                email: email,
                password: hashedPassword,
                fullname: fullname,
                image: image,
                phone: phone,
              })
                .then(function (createduser) {
                   Address.create({
                    user: createduser._id,
                    postcode: '',
                    state: '',
                    city: '',
                    country: '',
                   }).then(function(e){
                    res.send({message: createduser})
                   })
                })
                .catch(next);
            });
          }
        }) .catch(next);
    }
    
});



//get all user
router.get("/users/:id/:postowner", function (req, res, next) {
  User.findOne({_id: req.params.id}).then(function (users) {
     Review.find({postowner: req.params.postowner}).then(function(review){
        Post.find({user: req.params.id}).then(function(posts){

           res.send({message: {...users._doc, posttotal: posts.length, reviewtotal: review.length}})
        })
     })
   
  }).catch(next);
});

// User.find()
// .populate({
//     path: 'roles',
//     match: { name: { $in: roles }},
//     select: 'name'
// })
// .sort({'_id': 1})
// .exec(function (err, users) {

//     res.send(users);
// });


//get user of a particular user
router.get("/user", checkAuth, function (req, res, next) {
    User.findOne ({ user: req.params.userid }).then(function (user) {
    res.send(user);
  });
});

module.exports = router; 