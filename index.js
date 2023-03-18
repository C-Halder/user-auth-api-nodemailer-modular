const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const router = require("./route/userRoute")
app.use("/user/api", router)

const dbcon = "mongodb+srv://chalder8250:h8bVVtgQ5O9ITqWR@cluster0.ggg6h1m.mongodb.net/user_auth_api";
const port = 4404;

mongoose.connect(dbcon, {useNewUrlParser: true, useUnifiedTopology: true}).then(result=>{
    app.listen(port, ()=>{
        console.log(`Server Running on http://localhost:${port}`)
    })
}).catch(err =>{
    console.log(`Server not Connected.${err}`)
})