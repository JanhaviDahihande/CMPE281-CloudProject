const mongoose = require("mongoose");
const Request = require('./models/Request');
const User= require('./models/User');
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

async function findRequestsForUser(user_id)
{
    var query = { user_id: user_id };
    find_result= Request.find(query)
    result= await find_result.exec();
    return result;
}

async function findRequestsForAdmin()
{ 
    find_result= Request.find()
    result= await find_result.exec();
    return result;
}

async function findAllUsers()
{ 
    find_result= User.find()
    result= await find_result.exec();
    return result;
}

async function testQueries()
{
    daa = await findRequestsForAdmin();
    console.log(daa);
}

testQueries();