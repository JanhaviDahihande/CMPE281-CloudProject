//var NodeArray = new Array();
var PortArray= [4000, 4001, 4002, 4003, 4004]
var i=0;
const request2 = require('request');
const http = require('http');
var request = require('sync-request');
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

var Iport = process.argv[2];
var NodeArray = [4000,4001]
  
function addNode()
{
    NodeArray.push(PortArray[i]);
    i++;
}

function deleteNode(j)
{
    NodeArray.splice(j,1);
    i--;
}


function fetch(port)
{
    url= 'http://localhost:'+port+'/getData'
    var res = request('GET', url);
    var data= JSON.parse(res.getBody())
    return data ;
}

function getCumulativeData()
{
    var root= new Object();
    var cTemp=0, cPh=0, cAir=0, cHumid=0; 
    for(var k=0;k<NodeArray.length;k++){
        data= fetch(NodeArray[k]);
        var tag= NodeArray[k];
        console.log(NodeArray[k]+" : ");
        console.log(data);
        cTemp=data.sensorData.tempData;
        cPh=parseFloat(data.sensorData.phData);
        cAir=data.sensorData.airflowData;
        cHumid=data.sensorData.humidData;
        tag = new Object();
        tag.tempData = cTemp;
        tag.phData  = cPh;
        tag.airflowData = cAir;
        tag.humidData = cHumid;
        root[NodeArray[k]]=tag; 
    }
    var Data= JSON.stringify(root);
    return Data;
}

function getJsonData()
{
    var jData= getCumulativeData();
    console.log(jData);
    return jData;
}


http.createServer(function (req, res) {
  if(req.url=='/getAllData'){
      console.log("Intl Method called");
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(getJsonData());
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
}).listen(Iport);
