const mongoose = require("mongoose");
const Request = require('./models/Request');
const Request_new = require('./models/Request_new');
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
    find_result= Request_new.find().aggregate([
        { $lookup:
           {
             from: 'users',
             localField: '',
             foreignField: '_id',
             as: 'orderdetails'
           }
         }]);
    result= await find_result.exec();
    return result;
}

async function findAllUsers()
{ 
    find_result= User.find()
    result= await find_result.exec();
    return result;
}

async function updateRequests(request_id, status_code)
{ 
    var query = {_id: request_id };
    var update_query ={ $set: {status: status_code }};
    find_result= Request.updateMany(query, update_query);
    result= await find_result.exec();
    return result;
}


async function testQueries()
{
    daa = await updateRequests('5cbe50f48f51ce3117d4311d',"pending");
    console.log(daa);
}

testQueries();