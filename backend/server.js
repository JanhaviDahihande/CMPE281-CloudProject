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
  console.log("id: " + id.toString());
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
    console.log(data);
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
    console.log(data);
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
    console.log(data);
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
  find_result = Request.updateOne(query, { $set: { status: status } });
  result = find_result.exec();
  return result;
});

// append /api for our http requests
//change1
// app.use("/api", router);
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
