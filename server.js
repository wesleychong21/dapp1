const express = require ('express');
const app = express();

app.post('/', (req, res)=>{
    var email = req.body.email;
    var email = req.body.amount;

    res.send({"amount": amount, "email": email});
})

/*
app.get('/', (req, res)=>{
    res.send("HELLO WEB 2.0");
})
*/

app.listen(3000,()=>{
    console.log('server is running on port 3000');
});