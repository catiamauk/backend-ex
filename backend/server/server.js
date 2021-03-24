// const express = require('express');

// const app = express();

// app.listen(3000);

// app.get('/nome/vaca', (req, res) => {
//     //res.send('<p>home page</p>');
//     console.log('request made');
// })

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  console.log(req.url);


  let path = '../frontend/src/index.js';

  //set header content type
  res.setHeader('Content-Type', 'text/plain');
  // res.write('hello nija');
  // res.end();

  //send an html file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.write(data);
      res.end();
    }
  });
});

// localhost is the default value for 2nd argument
server.listen(4000, 'localhost', () => {
  console.log('listening for requests on port 4000');
});

  // res.send(
  //   { user: 'catia', data: {
  //                 balance: 1000,
  //                 cena: 'coiso'
  // }});
  // res.end();

  const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const qs = require('querystring');


//Import Models
const User = require('../models/user');
const Product = require('../models/product');
const Order = require('../models/order');

//create app express
const app = express();

//PORT
const PORT = process.env.PORT || 4000;

app.use(morgan('dev') ); // Log every request to console

//middleware
app.use(express.urlencoded({extended: true}));

//connect to mongodb
const dbURI = 'mongodb+srv://teste:passteste@nodejstut.ojz5d.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(PORT, () => {
          console.log(`Server listening on ${PORT}`);
        }))
  .catch(err => console.log(err));


// Order.init();
// const order = new Order({
//       items: ["hbo", "amazonprime"],
//       user_id: "toze"
//     });

//     order.save()
//       .then((result) => {
//         console.log(result);
//       })
//       .catch(err => {
//         console.log(err);
//       })


// const user = new User({
//       user_id: "Joca",
//       data: {
//         balance: 5000,
//         product_ids: ["disneyplus", "netflix"]
//       }
//     })

//     user.save()
//       .then((result) => {
//         console.log(result);
//       })
//       .catch(err => {
//         console.log(err);
//       })

// const product = new Product({
//       id: "tvdosogro",
//       name: "TV Do Sogro",
//       price: 3000
//     })

// product.save()
//   .then((result) => {
//     console.log(result);
//   })
//   .catch(err => {
//     console.log(err);
//   })

app.get("/", (req, res) => {
    //res.send(console.log(req.url));

    const user = new User({
      user_id: "catia",
      data: {
        balance: 10000,
        product_ids: ["hbo", "netflix"]
      }
    })

    user.save()
      .then((result) => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      })
    //res.json({user_id: "catia",data: {"balance": 10500, product_ids: ["hbo"]}});
    //res.json({ message: "Hello from server!" });
});

app.get("/users/:user_id", (req, res) => {
    //res.send(console.log(req.params.user_id));
    //console.log({"user_id": req.params.user_id, "data": {"balance": 10500, "product_ids": ["hbo"]}});
    //res.send({"user" : {"user_id": req.params.user_id, 
            //"data": {"balance": 10500, "product_ids": ["hbo"]}}});
   //res.json({ message: "Hello from server!" });
   //res.json({user_id: "catia", data: {"balance": 10500, "product_ids": ["hbo"]}});
  const user = User.find({user_id: req.params.user_id}, (err, data) =>{
      let new_user = new User({ user_id: req.params.user_id,
        data: {balance: 1000, product_ids: []}});  
    if(err){
        console.log(err);
        return
    }
    //se nao existe cria um
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
        //return
    }
    //console.log(data[0]);
    res.send({user: data[0]});
})

  //console.log(user);


  });

app.get("/products", (req, res) => {
  const products = Product.find().lean().exec((err, data) => {
      //console.log({products: data});
      res.send({products: data});
  });

  //
    //   res.send({ "products": [
  //     {
  //       "id": "netflix",
  //       "name": "Netflix",
  //       "price": "75.99"
  //     },
  //   {
  //       "id": "hbo",
  //       "name": "HBO",
  //       "price": "15.99"
  //   }]
  // })});
  //res.json({ message: "Hello from server!" });

});
app.post("/orders", (req, res) => {
    console.log(req.user_id);
  //res.json({ message: "Hello from server!" });
});

app.use((req, res) => {
  res.send('what???', 404);
  //{"error" : "product_not_found"}
  //{"error" : "products_already_purchased"}
  //{"error" : "insufficient_balance"}
});






//   -----------



//  // console.log(getProductsPrices(req.body.order.items));
//   // const meta = await 
//   await getProductsPrices(req.body.order.items, req.body.order.user_id)
//   // console.log(meta);
//   .then(value => console.log("VALUE:" + value))
//   .catch(err => console.log(err));

//   });


// app.use((req, res) => {
//   res.send('what???', 404);
// });

  
  //const productPrice = Product.find({id: req.params.user_id}, (err, data) =>{
//let sum = 0;
  //get products total price
  // req.body.order.items.forEach(p => {
  //   console.log(p);
  //   Product.find({id: p}, (err, data) =>{
  //     console.log(data[0].price);
  //     sum += data[0].price;
  //   })
  // })


  // for (const p of req.body.order.items){
  //   console.log(p);
  //   Product.find({id: p}, (err, data) =>{
  //     console.log(data[0].price);
  //     sum += data[0].price;
  //     console.log("sum1 " + sum);
  //   })
  // }

  
  

  // const total = getOrderPrice(req.body.order.item)
  // .then( result => {console.og(result);})
  // .catch(err => console.log(err));
  // console.log("TOTAL "+ total);
  //Create new order
  // Order.init();
  // const order = new Order({ 
  //   data: { 
  //     items: req.body.order.items,
  //     total: sum
  //   }
  // });
  //   console.log(req.body.order.items);

  //   order.save()
  //   .then((result) => {
  //     console.log(result);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
  //res.json({ message: "Hello from server!" });

    // await items.forEach(item => {
  //   Product.find({id: item}, async (err, data) => {
  //     //array.push(await data[0].price);
  //     let price = await data[0].price;
  //     if(err){
  //         console.log(err);
  //         return
  //     }
  //     if(data.length == 0){
  //       return {"error" : "product_not_found"};
  //     }
  //     total += price; //await getOrderTotal(array);

    // const order = new Order({
    //   user_id: user_id,
    //   items: items,
    //   total: total
    // });

    // order.save()
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })
    //})
 // })
    // console.log(await getOrderTotal(array));
    // let total = await getOrderTotal(array);
    // console.log("total"+total);
    
      //return total;
  //   }).then(value => {
      
  //     total += value[0].price;
  //     //console.log(value)
      
      
  //   })
  //   .catch(err => console.log(err))
  // })

  //
  // console.log("fora:" +prices);



  // const user = User.find({user_id: req.params.user_id}, (err, data) =>{
  //     let new_user = new User({ user_id: req.params.user_id,
  //       data: {balance: 1000, product_ids: []}});  
  //   if(err){
  //       console.log(err);
  //       return
  //   }
  //   //se nao existe cria um
  //   if(data.length == 0) {
  //       console.log("No record found")
  //       new_user.save()
  //       .then((result) => {
  //         console.log(result);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //         return
  //       })
  //   }
  //   res.send({user: data[0]});
  // })

    

  // req.body.order.items.forEach(p => {
  // console.log("product:" + p);
  // let price =  Product.find({id: p}, (err, data) => {
  //     return data[0].price;
  //   })
  // .then(value => {
  //   console.log("value[0] "+value[0].price);
  //   return value[0].price;
  // })
  //   .catch(err => {
  //   console.log(err);
  //   return
  // });

  // console.log("PRICE" + price);
  // total += price.then(value => value);
  // console.log("PRICE2" + price.then(value => value));
  //console.log("price "+ price.then(value => value));

  const getProductsPrices = async (items, user_id) => { 
  //get user balance
  let user_balance = await User.find({user_id: user_id}, (err, data) => {
    console.log(data[0].data.balance)
  });

  let prices = [];

  for (let i = 0; i < items.length; i++) {
    let product = await Product.find({id: items[i]}, async (err, data) => {
        prices.push(await data[0].price);
      if(err){
        console.log(err);
        return
      }
      if(data.length == 0){
        return {"error" : "product_not_found"};
      }
    })
  }

  let total = await getOrderTotal(prices);
  let updated_balance = user_balance[0].data.balance - total;
  if(updated_balance < 0){
    return {"error" : "insufficient_balance"};
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
      
    //update
    await User.findOneAndUpdate(
      {user_id: user_id},
      {"data.balance": updated_balance}, 
      {new: true});
  }

    await User.updateOne(
      {user_id: user_id},
      { "$addToSet": {"data.product_ids": items } }
    )
}


const getOrderTotal = async (prices) =>{
  return await prices.reduce((a, b) => a + b, 0);
}