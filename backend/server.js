const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");

const User = require("./models/User");
const UserSession = require("./models/UserSession");
const Request = require("./models/Request");
const Cluster = require("./models/Cluster");
const Node = require("./models/Node");
const Sensor = require("./models/Sensor");

const API_PORT = 3002;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute =
  "mongodb+srv://dbUser:Qwerty@123@cluster0-auqrg.mongodb.net/mydb";

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// this is our get method
// this method fetches all available data in our database
router.get("/getData", (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our update method
// this method overwrites existing data in our database
router.post("/updateData", (req, res) => {
  const { id, update } = req.body;
  Data.findOneAndUpdate(id, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  Data.findOneAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post("/putData", (req, res) => {
  let data = new Data();

  const { id, message } = req.body;

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.message = message;
  data.id = id;
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

/*
 * Sign up
 */
app.post("/api/account/signup", (req, res, next) => {
  const { body } = req;
  const { password } = body;
  let { email } = body;
  const { name } = body;
  const { lname } = body;
  const { confirm_password } = body;
  let { role } = body;

  if (!email) {
    return res.send({
      success: false,
      message: "Error: Email cannot be blank."
    });
  }
  if (!password) {
    return res.send({
      success: false,
      message: "Error: Password cannot be blank."
    });
  }

  email = email.toLowerCase();
  email = email.trim();

  // Steps:
  // 1. Verify email doesn't exist
  // 2. Save
  User.find(
    {
      email: email
    },
    (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Server error"
        });
      } else if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: "Error: Account already exist."
        });
      }

      // Save the new user
      const newUser = new User();

      newUser.email = email;
      newUser.name = name;
      newUser.lname = lname;
      newUser.role = "user";
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        }
        return res.send({
          success: true,
          message: "Signed up"
        });
      });
    }
  );
});

app.post("/api/account/signin", (req, res, next) => {
  const { body } = req;
  const { password } = body;
  let { email } = body;

  if (!email) {
    return res.send({
      success: false,
      message: "Error: Email cannot be blank."
    });
  }
  if (!password) {
    return res.send({
      success: false,
      message: "Error: Password cannot be blank."
    });
  }

  email = email.toLowerCase();
  email = email.trim();

  User.find(
    {
      email: email
    },
    (err, users) => {
      if (err) {
        console.log("err 2:", err);
        return res.send({
          success: false,
          message: "Error: server error"
        });
      }
      if (users.length != 1) {
        return res.send({
          success: false,
          message: "Error: Invalid"
        });
      }

      const user = users[0];
      if (!user.validPassword(password)) {
        return res.send({
          success: false,
          message: "Error: Invalid"
        });
      }

      // Otherwise correct user
      const userSession = new UserSession();
      userSession.userId = user._id;

      userSession.save((err, doc) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: "Error: server error"
          });
        }

        return res.send({
          success: true,
          message: "Valid sign in",
          role: user.role,
          token: doc._id,
          user_id: userSession.userId,
          name: user.name,
          lname: user.lname
        });
      });
    }
  );
});

app.post("/api/request/newRequest", (req, res, next) => {
  const { body } = req;
  const { zip_code } = body;
  let { no_of_nodes } = body;
  let { latlong } = body;
  let { user_id } = body;
  let { new_cluster } = body;
  let { status } = body;

  if (!zip_code) {
    return res.send({
      success: false,
      message: "Error: Zip code cannot be blank."
    });
  }
  if (!no_of_nodes) {
    return res.send({
      success: false,
      message: "Error: No. of nodes cannot be 0."
    });
  }

  // Save the new request
  const newRequest = new Request();

  newRequest.zip_code = zip_code;
  newRequest.no_of_nodes = no_of_nodes;
  newRequest.latlong = latlong;
  newRequest.user_id = user_id;
  newRequest.new_cluster = new_cluster;
  newRequest.status = status;
  newRequest.save((err, user) => {
    if (err) {
      return res.send({
        success: false,
        message: "Error: Server error"
      });
    }
    return res.send({
      success: true,
      message: "New Request added"
    });
  });
});

// const sleep = milliseconds => {
//   console.log("Sleep called");
//   return new Promise(resolve => setTimeout(resolve, milliseconds));
// };

app.get("/api/myrequests/:id", (req, res, next) => {
  let id = req.params.id;
  // console.log("id: " + id.toString());
  var query = { user_id: id.toString() };
  find_result = Request.find(query);
  result = find_result.exec();
  // sleep(10000).then(() => {
  //   console.log(result);
  //   return res.send({
  //     success: true,
  //     message: JSON.stringify(result)
  //   });
  // });
  result.then(function(data) {
    // console.log(data);
    return res.send({
      success: true,
      message: JSON.stringify(data)
    });
  });
});

app.get("/api/farmerrequests", (req, res, next) => {
  find_result = Request.find();
  result = find_result.exec();

  result.then(function(data) {
    // console.log(data);
    return res.send({
      success: true,
      message: JSON.stringify(data)
    });
  });
});

app.get("/api/users", (req, res, next) => {
  find_result = User.find();
  result = find_result.exec();

  result.then(function(data) {
    // console.log(data);
    return res.send({
      success: true,
      message: JSON.stringify(data)
    });
  });
});

app.post("/api/manageinfrastruture/cluster/add", (req, res, next) => {
  const { body } = req;
  const { areaCode } = body;
  let { ipAddr } = body;
  let { cluster_name } = body;
  let { user_id } = body;

  if (!areaCode) {
    return res.send({
      success: false,
      message: "Error: Area code cannot be blank."
    });
  }
  if (!ipAddr) {
    return res.send({
      success: false,
      message: "Error: IP address cannot be 0."
    });
  }
  if (!cluster_name) {
    return res.send({
      success: false,
      message: "Error: Cluster name cannot be blank."
    });
  }

  // Save the new request
  const newCluster = new Cluster();

  newCluster.areaCode = areaCode;
  newCluster.ipAddr = ipAddr;
  newCluster.cluster_name = cluster_name;
  newCluster.status = true;
  newCluster.user_id = user_id;
  newCluster.save((err, user) => {
    if (err) {
      return res.send({
        success: false,
        message: "Error: Server error"
      });
    }
    return res.send({
      success: true,
      message: "New Cluster added"
    });
  });
});

app.post("/api/request/update", (req, res, next) => {
  const { body } = req;
  const { req_id } = body;
  let { status } = body;

  var query = { _id: req_id };
  find_result = Request.updateOne(query, { $set: { status: status } }, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
  result = find_result.exec();
  return result;
});

app.get("/api/manageinfrastruture/cluster/view", (req, res, next) => {
  find_result = Cluster.find();
  result = find_result.exec();

  result.then(function(data) {
    // console.log(data);
    return res.send({
      success: true,
      message: JSON.stringify(data)
    });
  });
});

app.put("/api/manageinfrastruture/cluster/update", (req, res, next) => {
  const { current_cluster_id, cluster_id, cluster_name } = req.body;
  var query = { cluster_id: current_cluster_id };
  find_result = Cluster.updateOne(query, {
    $set: { cluster_id: cluster_id, cluster_name: cluster_name }
  });
  result = find_result.exec();
  return result;
});

app.delete("/api/manageinfrastruture/cluster/delete", (req, res, next) => {
  const { cluster_id } = req.body;
  var query = { cluster_id: cluster_id };
  find_result = Cluster.deleteOne(query, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
  result = find_result.exec();
  return result;
});

app.post("/api/manageinfrastruture/node/add", (req, res, next) => {
  const { body } = req;
  const { cluster_id } = body;
  let { latitude } = body;
  let { longitude } = body;

  if (!cluster_id) {
    return res.send({
      success: false,
      message: "Error: Cluster Id cannot be blank."
    });
  }
  if (!latitude) {
    return res.send({
      success: false,
      message: "Error: Latitude cannot be blank."
    });
  }
  if (!longitude) {
    return res.send({
      success: false,
      message: "Error: Longitude cannot be blank."
    });
  }

  // Save the new request
  const newNode = new Node();

  newNode.cluster_id = cluster_id;
  newNode.latitude = latitude;
  newNode.longitude = longitude;
  newNode.status = true;

  newNode.save((err, user) => {
    if (err) {
      return res.send({
        success: false,
        message: "Error: Server error"
      });
    }
    return res.send({
      success: true,
      message: "New Node added"
    });
  });
});

app.put("/api/manageinfrastruture/node/update", (req, res, next) => {
  const { cluster_id, node_id, latitude, longitude } = req.body;

  var query = { cluster_id: cluster_id , node_id: node_id};
  find_result = Node.updateOne(query, {
    $set: { latitude: latitude, longitude: longitude }
  });
  result = find_result.exec();
  console.log(result);
  return result;
});

app.delete("/api/manageinfrastruture/node/delete", (req, res, next) => {
  const { cluster_id, node_id } = req.body;
  var query = { cluster_id: cluster_id, node_id: node_id };
  find_result = Node.deleteOne(query, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
  result = find_result.exec();
  return result;
});

app.get("/api/manageinfrastruture/node/view", (req, res, next) => {
  find_result = Node.find();
  result = find_result.exec();

  result.then(function(data) {
    // console.log(data);
    return res.send({
      success: true,
      message: JSON.stringify(data)
    });
  });
});

app.post("/api/manageinfrastruture/sensor/add", (req, res) => {
  console.log("Add sensor");
  const { cluster_id, node_id, sensor_type, sensor_status } = req.body;

  if (!cluster_id) {
    return res.send({
      success: false,
      message: "Error: Cluster Id cannot be blank."
    });
  }
  if (!node_id) {
    return res.send({
      success: false,
      message: "Error: Node Id cannot be blank."
    });
  }
  if (!sensor_type) {
    return res.send({
      success: false,
      message: "Error: Sensor type cannot be blank."
    });
  }

  // Save the new request
  const newSensor = new Sensor();

  newSensor.cluster_id = cluster_id;
  newSensor.node_id = node_id;
  newSensor.sensor_type = sensor_type;
  newSensor.status = sensor_status;
newSensor.save((err, user) => {
  if (err) {
    return res.send({
      success: false,
      message: "Error: Server error"
    });
  }
  return res.send({
    success: true,
    message: "New Sensor added"
  });
});
});

app.put("/api/manageinfrastruture/sensor/update", (req, res, next) => {
  const { cluster_id, node_id, sensor_id } = req.body;

  var query = { cluster_id: cluster_id, node_id: node_id };
  find_result = Sensor.updateOne(query, {
    $set: { sensor_id: sensor_id }
  });
  result = find_result.exec();
  console.log(result);
  return result;
});

app.delete("/api/manageinfrastruture/sensor/delete", (req, res, next) => {
  console.log("Here!");
  const { cluster_id, node_id, sensor_id } = req.body;
  var query = {
    cluster_id: cluster_id,
    node_id: node_id,
    sensor_id: sensor_id
  };
  console.log(query);
  find_result = Sensor.deleteOne(query, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
  result = find_result.exec();
  return result;
});

app.get("/api/manageinfrastruture/sensor/view", (req, res, next) => {
  find_result = Sensor.find();
  result = find_result.exec();

  result.then(function(data) {
    // console.log(data);
    return res.send({
      success: true,
      message: JSON.stringify(data)
    });
  });
});

app.get("/api/users/:user_name/zip/:zipcode", async (req, res) => {
  const { user_name, zipcode} = req.body;
  var query = {};
    if(user_name!=null)
    { 
        user_find= User.find({name:user_name},{_id:1});
        user_op= await user_find.exec();
        var uid=user_op[0]['_id'].toString();
        cluster_find2= Cluster.find({user_id:uid},{cluster_id:1, _id:0});
        cluster_op2= await cluster_find2.exec();
        var size = Object.keys(cluster_op2).length;
        if(size>1){
            var or_query=[];
            for(item in cluster_op2)
            {
                or_query.push(cluster_op2[item]);
            }
            query['$or']= or_query;
        }
        else{
        query['cluster_id']= cluster_op2['cluster_id'];
        }
        
    }
    if(zipcode!=null){
        cluster_find2= Cluster.find({areaCode:zipcode},{cluster_id:1, _id:0});
        cluster_op2= await cluster_find2.exec();
        console.log(cluster_op2);
        var size = Object.keys(cluster_op2).length;
        if(size>1){
            var or_query=[];
            for(item in cluster_op2)
            {
                or_query.push(cluster_op2[item]);
            }
            query['$or']= or_query;
        }
        else{
        query['cluster_id']= cluster_op2['cluster_id'];
        }
    }
    if(cluster_name!=null){
        cluster_find= Cluster.find({cluster_name:cluster_name},{cluster_id:1, _id:0});
        cluster_op= await cluster_find.exec();
        query['cluster_id']= cluster_op[0]['cluster_id'];
      }
    if(node_id!=null)
        query['node_id']= node_id;
    if(sensor_type!=null){
        query['type']= sensor_type;
    }
    find_result= Sensor.find(query);
    result= find_result.exec();
    //result[0]['cluster_name']='2';
    result.then(function(data) {
      // console.log(data);
      return res.send({
        success: true,
        message: JSON.stringify(data)
      });
    });
});

// append /api for our http requestsf
//change1
// app.use("/api", router);
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
