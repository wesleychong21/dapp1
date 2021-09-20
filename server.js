const express = require ('express');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.json());

app.post('/', (req, res)=>{
    var email = req.body.email;
    var amount = req.body.amount;

    res.send({"amount": amount, "email": email});
})


app.get('/', (req, res)=>{
    res.send("HELLO WEB 2.0");
})


app.listen(3000,()=>{
    console.log('server is running on port 3000');
});