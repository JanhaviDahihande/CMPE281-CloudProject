const mongoose = require("mongoose");
const Request = require('./models/Request');
const dbRoute = "mongodb+srv://dbUser:Qwerty@123@cluster0-auqrg.mongodb.net/mydb";

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

var db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

module.exports.myrequests = function(req, res) {
    let id = req.params;
    console.log("id: "+id);
    var query = { user_id: id };
    find_result= Request.find(query)
    result= await find_result.exec();
    return result;
  };