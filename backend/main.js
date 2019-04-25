const http = require('http');
var request = require('sync-request');
const SensorData = require('./models/SensorData');
const SensorStatus = require('./models/sensorstatus');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var port= '8008';
var cluster_id='1';
    
const dbRoute = "mongodb+srv://dbUser:Qwerty@123@cluster0-auqrg.mongodb.net/mydb";

mongoose.connect(
    dbRoute,
    { useNewUrlParser: true }
  );
  
let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));
  
  // checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));
  

function fetch(port)
{
    url= 'http://localhost:'+port+'/getAllData'
    var res = request('GET', url);
    var result = JSON.parse(res.getBody());
    return result ;
}


function getJsonData()
{   

    var jData= fetch(port);
    for (var key in jData) {
        if (jData.hasOwnProperty(key)) {
          var newData= new SensorData();
          newData.sensor_id= 1; 
          newData.node_id= key; 
          newData.cluster_id= cluster_id; 
          newData.type = 'temperature';
          newData.value= jData[key].tempData;
          newData.status= true;
          console.log(key + ": " + jData[key].tempData);
          var obj = new SensorData(newData);
          obj.save((err, user) => {console.log("Data saved") });
          var status=  new SensorStatus();
          status.clusterId= cluster_id;
          status.nodeId= key;
          status.sensorId= 1;
          var obj2 = new SensorStatus(status);
          obj2.save((err, user) => {console.log("status saved") });
          
          
          newData= new SensorData();
          newData.sensor_id= 2; 
          newData.node_id= key; 
          newData.cluster_id= cluster_id; 
          newData.type = 'ph';
          newData.value= jData[key].phData;
          newData.status= true;
          console.log(key + ": " + jData[key].phData);
          obj = new SensorData(newData);
          obj.save((err, user) => {console.log("Data saved") });
          status=  new SensorStatus();
          status.clusterId= cluster_id;
          status.nodeId= key;
          status.sensorId= 2;
          obj2 = new SensorStatus(status);
          obj2.save((err, user) => {console.log("Data saved") });

          newData= new SensorData();
          newData.sensor_id= 3; 
          newData.node_id= key; 
          newData.cluster_id= cluster_id; 
          newData.type = 'airflow';
          newData.value= jData[key].airflowData;
          newData.status= true;
          console.log(key + ": " + jData[key].airflowData);
          obj = new SensorData(newData);
          obj.save((err, user) => {console.log("Data saved") });
          status=  new SensorStatus();
          status.clusterId= cluster_id;
          status.nodeId= key;
          status.sensorId= 3;
          obj2 = new SensorStatus(status);
          obj2.save((err, user) => {console.log("Data saved") });
          
          newData= new SensorData();
          newData.sensor_id= 4; 
          newData.node_id= key; 
          newData.cluster_id= cluster_id; 
          newData.type = 'humidity';
          newData.value= jData[key].humidData;
          newData.status= true;
          console.log(key + ": " + jData[key].humidData);
          obj = new SensorData(newData);
          obj.save((err, user) => {console.log("Data saved") });
          status=  new SensorStatus();
          status.clusterId= cluster_id;
          status.nodeId= key;
          status.sensorId= 4;
          obj2 = new SensorStatus(status);
          obj2.save((err, user) => {console.log("Data saved") });
        }
      }
   // const obj = new mongoSensor(jData);
    //obj.save((err, user) => {console.log("Data saved") });
}

function run() {
    setInterval(getJsonData, 5000);
};
  
run();