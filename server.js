const express = require("express");
const bodyParser = require("body-parser");
const { save_user_information } = require("./models/server_db");
const path = require("path");
const publicpath = path.join(__dirname, "./public");
const paypal = require("paypal-rest-sdk");
const app = express();

app.use(bodyParser.json());
app.use(express.static(publicpath));

//paypal configuration
paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "ARiDmEYE89xk5Np95ydHR-nX3vJmbuK37ACCuRa9MDSNQmGNgfvOcdxdYQK8j-YPPf8QhMTu5HcxRWRr",
  client_secret:
    "EAGzo8Eaeg1QGQDys4X_FUXzwmZBvgt9mZHuLS3QdU8Ze19G97Gz2SzzbsLZznb_wnHUJ3nWxsC7vKbc",
});

app.post("/post_info", async (req, res) => {
  var email = req.body.email;
  var amount = req.body.amount;

  if (amount <= 1) {
    return_info = {};
    return_info.error = true;
    return_info.message = "The amount should be greater than 1";
    return res.send(return_info);
  }

  var create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "Lottery",
              sku: "funding",
              price: amount,
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: amount,
        },
        payee : {
            email : 'bnext.my@gmail.com'
        },
        description: "Lottery purchase",
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      console.log("Create Payment Response");
      console.log(payment);
      for (var i = 0;i<payment.links.length;i++)
      {
          if(payment.links[i].rel == 'approval_url'){
              return res.send(payment.links[i].href);
          }

      }
    }
  });

  console.log("start save");
  var result = await save_user_information({ amount: amount, email: email });
  //res.send(result);
});

app.get("/", (req, res) => {
  res.send("Successful");
  console.log("Successful");
});

app.get("/get_total_amount", async (req, res) => {
  var result = await get_total_amount();
  res.send(result);
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
