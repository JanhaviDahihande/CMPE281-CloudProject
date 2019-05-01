var readline = require('readline-sync');
const http = require('http');
var request = require('sync-request');
const Cluster= require('./models/Cluster');
const mongoose = require("mongoose");

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

const dbRoute = "mongodb+srv://dbUser:Qwerty@123@cluster0-auqrg.mongodb.net/mydb";
mongoose.connect(
    dbRoute,
    { useNewUrlParser: true }
  );
  var db = mongoose.connection;
  db.once("open", () => console.log("connected to the database"));
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  
var cluster_id = readline.question("Enter cluster id:");
  
async function findClusterData(Cluster_id)
{ 
  query= {cluster_id:cluster_id};
  find_result= Cluster.findOne(query);
  result= await find_result.exec();
  return result;
}

var NodeArray = new Array();
var Num_nodes = readline.question("How many nodes:");
for(var l=0; l<Num_nodes; l++)
{
   NodeArray[l] = readline.question("Node Address");
   //port= NodeArray[l].split(':')[1];
   //console.log(port);   
}


// function exposeSelfData()
// {
//     var metadata= new Object();
//     metadata.cluster_id= Cluster_id;
//     metadata.port= Iport;
//     metadata.zipcode= Zipcode;
//     metadata.no_of_nodes= NodeArray.length;
//     metadata.nodes= NodeArray;
//     console.log(metadata);
//     var Metadata= JSON.stringify(metadata);
//     return Metadata;
// }


function addNode()
{
    
}

function deleteNode(j)
{
    NodeArray.splice(j,1);
    i--;
}

async function exposeSelfData()
{
    var data= await findClusterData(cluster_id);
   // console.log(data);
    var metadata= new Object();
    metadata.cluster_id= data.cluster_id;
    metadata.Address= data.ipAddr;
    metadata.zipcode= data.areaCode;
    metadata.no_of_nodes= NodeArray.length;
    metadata.Cluster_name= data.cluster_name;
    metadata.user= data.user_id;
    nodes= new Object();
    for(var node in NodeArray){
      url= 'http://'+NodeArray[node]+'/getMetaData'
      var res = request('GET', url);
      nodes[NodeArray[node]]=JSON.parse(res.getBody());
    }
    metadata.nodes= nodes;
    //console.log(metadata);
    var Metadata= JSON.stringify(metadata);
    return Metadata;
}

function fetch(port)
{
    url= 'http://'+port+'/getData'
    var res = request('GET', url);
    var data= JSON.parse(res.getBody())
    return data ;
}

async function getInfo()
{
  info= JSON.parse(await exposeSelfData());
  clusterInfo= new Object();
  clusterInfo.cluster_id= info.cluster_id;
  nArr= new Array();
  node= new Object();
  for (var key in info.nodes) {
     if (info.nodes.hasOwnProperty(key)) {
       node[info.nodes[key].port]=  info.nodes[key].node_id; 
    }
   }
   clusterInfo.nodes=node;
   //console.log(clusterInfo);
   return JSON.stringify(clusterInfo);
}

function getCumulativeData()
{
    var root= new Object();
    var cTemp=0, cPh=0, cAir=0, cHumid=0; 
    for(var k=0;k<NodeArray.length;k++){
        data= fetch(NodeArray[k]);
        var tag= NodeArray[k];
        //console.log(NodeArray[k]+" : ");
        //console.log(data);
        cTemp=data.sensorData.tempData;
        cPh=parseFloat(data.sensorData.phData);
        cAir=data.sensorData.airflowData;
        cHumid=data.sensorData.humidData;
        tag = new Object();
        tag.tempData = cTemp;
        tag.phData  = cPh;
        tag.airflowData = cAir;
        tag.humidData = cHumid;
        root[NodeArray[k].split(':')[1]]=tag; 
    }
    var Data= JSON.stringify(root);
    return Data;
}

function getJsonData()
{
    var jData= getCumulativeData();
    //console.log(jData);
    return jData;
}


async function startServer(Iport, Host)
{
http.createServer(async function (req, res) {
  if(req.url=='/getAllData'){
      console.log("Intl Method called");
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(getJsonData());
  res.end();
  }
  else if(req.url=='/getMetaData'){
    console.log("metadata Method called");
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(await exposeSelfData());
    res.end();
  }
  else if(req.url=='/getClusterInfo'){
    console.log("metadata Method called");
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(await getInfo());
    res.end();
  }
  else if(req.url=='/addNode'){
    addNode();  
  }
  else if(req.url=='/deleteNode'){
    deleteNode();  
  }
  else{
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify("Not the data you're looking for..."));
  res.end();}
}).listen(Iport, Host);
}

async function run()
{
    cData= await findClusterData(cluster_id);
    console.log(cData);
    startServer(cData.ipAddr.split(':')[1],cData.ipAddr.split(':')[0]);
}

run();