const mongoose=require("mongoose");

//i am using mlab online db
mongoose.connect("mongodb://nvjot94:12345@ds129946.mlab.com:29946/api-assignment");

module.exports=mongoose;