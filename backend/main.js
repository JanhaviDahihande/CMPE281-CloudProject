const http =  require('http');
const url2 =  require('url');
var readline = require('readline-sync');
var request = require('sync-request');
const Node = require('./models/Node');
const Cluster = require('./models/Cluster');
const SensorData = require('./models/SensorData');
const SensorStatus = require('./models/SensorStatus');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var ClusterArray = new Array();
var Num_Clusters = readline.question("How many Clusters:");
for(var l=0; l<Num_Clusters; l++)
{
  cId = readline.question("Cluster Id: ");
  addCluster(cId);
}
    
const dbRoute = "mongodb+srv://dbUser:Qwerty@123@cluster0-auqrg.mongodb.net/mydb";

mongoose.connect(
    dbRoute,
    { useNewUrlParser: true }
  );
  
let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));
  
  // checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));
  

function fetch(Address)
{
    url= 'http://'+Address+'/getAllData'
    var res = request('GET', url);
    var result = JSON.parse(res.getBody());
    return result ;
}


function getJsonData()
{   
  for (var i=0;i<ClusterArray.length;i++)
  {
    cUrl= 'http://'+ClusterArray[i]+'/getClusterInfo'
    var res = request('GET', cUrl);
    ClusterInfo = JSON.parse(res.getBody());
    var jData= fetch(ClusterArray[i]);
    for (var key in jData) 
    {
        if (jData.hasOwnProperty(key)) 
        {
          var newData= new SensorData();
          newData.sensor_id= 1; 
          newData.node_id=ClusterInfo.nodes[key] ; 
          newData.cluster_id= ClusterInfo.cluster_id; 
          newData.type = 'temperature';
          newData.value= jData[key].tempData;
          newData.status= true;
          console.log(key + ": " + jData[key].tempData);
          var obj = new SensorData(newData);
          obj.save((err, user) => {console.log("Data saved") });
          db.collection('sensorstatus').updateOne(
            { sensorId:1, nodeId: ClusterInfo.nodes[key], clusterId:ClusterInfo.cluster_id, sensorType:"Temperature", status:true },
            { $set: { last_online: new Date() } },
            { upsert: true }
          );
          
          newData= new SensorData();
          newData.sensor_id= 2; 
          newData.node_id= ClusterInfo.nodes[key]; 
          newData.cluster_id= ClusterInfo.cluster_id; 
          newData.type = 'ph';
          newData.value= jData[key].phData;
          newData.status= true;
          console.log(key + ": " + jData[key].phData);
          obj = new SensorData(newData);
          obj.save((err, user) => {console.log("Data saved") });
          db.collection('sensorstatus').updateOne(
            { sensorId:2, nodeId: ClusterInfo.nodes[key], clusterId:ClusterInfo.cluster_id, sensorType:"ph", status:true },
            { $set: { last_online: new Date() } },
            { upsert: true }
          );

          newData= new SensorData();
          newData.sensor_id= 3; 
          newData.node_id= ClusterInfo.nodes[key]; 
          newData.cluster_id= ClusterInfo.cluster_id; 
          newData.type = 'airflow';
          newData.value= jData[key].airflowData;
          newData.status= true;
          console.log(key + ": " + jData[key].airflowData);
          obj = new SensorData(newData);
          obj.save((err, user) => {console.log("Data saved") });
          db.collection('sensorstatus').updateOne(
            {sensorId:3, nodeId: ClusterInfo.nodes[key], clusterId:ClusterInfo.cluster_id, sensorType:"airflow", status:true },
            { $set: { last_online: new Date() } },
            { upsert: true }
          );

          newData= new SensorData();
          newData.sensor_id= 4; 
          newData.node_id= ClusterInfo.nodes[key]; 
          newData.cluster_id= ClusterInfo.cluster_id; 
          newData.type = 'humidity';
          newData.value= jData[key].humidData;
          newData.status= true;
          console.log(key + ": " + jData[key].humidData);
          obj = new SensorData(newData);
          obj.save((err, user) => {console.log("Data saved") });
          db.collection('sensorstatus').updateOne(
            {sensorId:4, nodeId: ClusterInfo.nodes[key], clusterId:ClusterInfo.cluster_id, sensorType:"humidity", status:true },
            { $set: { last_online: new Date() } },
            { upsert: true }
          );
        }
      }
    }
}

async function addNode(nId){
  query= {node_id:nId};
  find_result= Node.findOne(query,{cluster_id:1});
  result= await find_result.exec();
  query2= {cluster_id:result.cluster_id};
  find_result2= Cluster.findOne(query2,{ipAddr:1});
  result2= await find_result2.exec();
  url= 'http://'+result2.ipAddr+'/addNode?node_id='+nId;
  var res = request('GET', url);
  var nodeRes = res.getBody();
  return nodeRes;
}

async function deleteNode(nId){
  query= {node_id:nId};
  find_result= Node.findOne(query,{cluster_id:1});
  result= await find_result.exec();
  query2= {cluster_id:result.cluster_id};
  find_result2= Cluster.findOne(query2,{ipAddr:1});
  result2= await find_result2.exec();
  url= 'http://'+result2.ipAddr+'/deleteNode?node_id='+nId;
  var res = request('GET', url);
  var nodeRes = res.getBody();
  return nodeRes;
}

async function addCluster(Cid){
  query= {cluster_id:Cid};
  find_result= Cluster.findOne(query,{ipAddr:1});
  result= await find_result.exec();
  ClusterArray.push(result.ipAddr);
  return JSON.stringify("Cluster has been added");
}

async function deleteCluster(Cid){
  query= {cluster_id:Cid};
  find_result= Cluster.findOne(query,{ipAddr:1});
  result= await find_result.exec();
  ClusterArray.splice(ClusterArray.indexOf(result.ipAddr),1);
  console.log(ClusterArray);  
  return JSON.stringify("Cluster has been deleted");
}

async function startServer(port, Host)
{
http.createServer(async function (req, res) {
  if(req.url=='/getAllData'){
      console.log("Intl Method called");
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(getJsonData());
  res.end();
  }
  else if(req.url=='/getClusterInfo'){
    console.log("metadata Method called");
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(await getInfo());
    res.end();
  }
  var q = url2.parse(req.url, true);
  if(q.pathname=='/addNode')
  {
    res.write(await addNode(q.query.node_id));
    res.end();
  }
  else if(q.pathname=='/deleteNode')
  {
    res.write(await deleteNode(q.query.node_id));
    res.end();
  }
  else if(q.pathname=='/addCluster')
  {
    res.write(await addCluster(q.query.cluster_id));
    res.end();
  }
  else if(q.pathname=='/deleteCluster')
  {
    res.write(await deleteCluster(q.query.cluster_id));
    res.end();
  }
  else{
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify("Not the data you're looking for..."));
    res.end();}
}).listen(8070, "localhost");
}

startServer(8070, "localhost");

function run() {
    setInterval(getJsonData, 5000);
};



run();