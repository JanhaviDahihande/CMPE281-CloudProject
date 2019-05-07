var http = require('http'); 
var readline = require('readline-sync');
const Node= require('./models/Node');
const mongoose = require("mongoose");

const dbRoute = "mongodb+srv://dbUser:Qwerty@123@cluster0-auqrg.mongodb.net/mydb";
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);
var db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var node_id = readline.question("Enter node id:");

async function findNodeData(node_id)
{ 
    query= {node_id:node_id};
    find_result= Node.findOne(query);
    result= await find_result.exec();
    return result;
}

function generateTempData(){
    tempData =(Math.floor(Math.random() * 5) + 25);
    return tempData;
}
function generatePHData(){
    phData =((Math.random() * 1) + 6.25);
    return parseFloat(phData).toFixed(2);
    
}
function generateAirflowData(){
    airflowData =(Math.floor(Math.random() * 2) + 6);
    return airflowData;
}

function generateHumidityData(){
    humidData =(Math.floor(Math.random() * 10) + 68);
    return humidData;
}

function generateJSONData(){
    var root= new Object();
    var obj = new Object();
    obj.tempData = generateTempData();
    obj.phData  = generatePHData();
    obj.airflowData = generateAirflowData();
    obj.humidData = generateHumidityData();
    root.sensorData= obj;
    var Data= JSON.stringify(root);
    return Data;
}

async function exposeSelfData()
{
    var data= await findNodeData(node_id);
    var metadata= new Object();
    metadata.node_id= data.node_id;
    metadata.ip= data.ip;
    metadata.port= data.port;
    metadata.no_of_sensors= 4;
    metadata.logitude= data.longitude;
    metadata.latitude= data.latitude;
    var Metadata= JSON.stringify(metadata);
    return Metadata;
}

async function startServer(port){
    http.createServer(async function (req, res) {
    console.log("server stated");
    if(req.url=='/getData'){
        console.log("Method called");
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(generateJSONData());
    res.end();
    }
    else if(req.url=='/getMetaData'){
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(await exposeSelfData());
    res.end();
    }
    else{
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify("Not the data you're looking for..."));
    res.end();}
  }).listen(port);
}

async function run()
{
    NData= await findNodeData(node_id);
    startServer(NData.port);
}

run();
