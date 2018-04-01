const express=require("express");
const app=express();
const bodyParser = require("body-parser");
const userRoute=require("./route/users");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("./public"));
app.use("/api",userRoute);

app.listen(process.env.PORT || 3333, () => {
    console.log("Application started at port : 3333");
  });
