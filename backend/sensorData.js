var http = require('http'); 
var port = process.argv[2];
function generateTempData(){
    tempData =(Math.floor(Math.random() * 5) + 25);
    return tempData;
}
function generatePHData(){
    phData =((Math.random() * 2) + 6);
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
// module.exports.generateTempData = generateTempData;
// module.exports.generateAirflowData = generateAirflowData;
// module.exports.generatePHData = generatePHData;
// module.exports.generateHumidityData = generateHumidityData;

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

http.createServer(function (req, res) {
    if(req.url=='/getData'){
        console.log("Method called");
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(generateJSONData());
    res.end();
    }
    else{
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify("Not the data you're looking for..."));
    res.end();}
  }).listen(port);
