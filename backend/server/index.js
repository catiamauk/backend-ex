const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

//Import Models
const User = require('../models/user');
const Product = require('../models/product');
const Order = require('../models/order');

//create app express
const app = express();

//PORT
const PORT = process.env.PORT || 4000;

// Log every request to console
app.use(morgan('dev') ); 

//middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//connect to mongodb
const dbURI = 'mongodb+srv://teste:passteste@nodejstut.ojz5d.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(PORT, () => {
          console.log(`Server listening on ${PORT}`);
        }))
  .catch(err => console.log(err));


app.get("/", (req, res) => {
});

//get user / create user if doesn't exist
app.get("/users/:user_id", (req, res) => {
  const user = User.find({user_id: req.params.user_id}, (err, data) =>{
      let new_user = new User({ user_id: req.params.user_id,
        data: {balance: 1000, product_ids: []}});  
    if(err){
        console.log(err);
        return
    }
    //se nao existe cria um user
    if(data.length == 0) {
        console.log("No record found")
        new_user.save()
        .then((result) => {
          console.log(result);
        })
        .catch(err => {
          console.log(err);
          return
        })
    }
    res.send({user: data[0]});
  })
});

//get products
app.get("/products", (req, res) => {
  const products = Product.find().lean().exec((err, data) => {
      res.send({products: data});
  });
});


//make order
app.post("/orders", async (req, res) => {

  let items = req.body.order.items;
  let user_id = req.body.order.user_id;

 //get user balance
  let user_balance = await User.find({user_id: user_id}, (err, data) => {
    //o que tornar qd só quero o valor?
    //console.log(data[0].data.balance)
  });

  let prices = [];

  for (let i = 0; i < items.length; i++) {
     await Product.find({id: items[i]}, async (err, data) => {
        prices.push(await data[0].price);
      if(err){
        console.log(err);
        return
      }
      if(data.length == 0){
        //return {"error" : "product_not_found"};
        res.status(400).send({"error" : "product_not_found"});
      }
    })
  }

  let total = prices.reduce((a, b) => a + b, 0);
  let updated_balance = user_balance[0].data.balance - total;

  if(updated_balance < 0){
    //return {"error" : "insufficient_balance"};
    res.status(400).send({"error" : "insufficient_balance"});
  } else {
    const order = new Order({
    user_id: user_id,
    items: items,
    total: total
    });

    order.save()
      .then((result) => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      })
      
    //update user balance
    await User.findOneAndUpdate(
      {user_id: user_id},
      {"data.balance": updated_balance}, 
      {new: true});
  }
    //update user items
    await User.updateOne(
      {user_id: user_id},
      { "$addToSet": {"data.product_ids": items } }
    )
  })
