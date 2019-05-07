const mongoose = require("mongoose");
const Request = require("./models/Request");
const SensorData = require("./models/SensorData");
const SensorStatus = require("./models/SensorStatus");
const User = require("./models/User");
const Node = require("./models/Node");
const Cluster = require("./models/Cluster");
const dbRoute =
  "mongodb+srv://dbUser:Qwerty@123@cluster0-auqrg.mongodb.net/mydb";

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

var db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

async function findRequestsForUser(user_id) {
  var query = { user_id: user_id };
  find_result = Request.find(query);
  result = await find_result.exec();
  return result;
}
//Below query needs Date type parameter
async function getSensorDatabetDate(from, to) {
  var query = {
    createdAt: {
      $gte: from,
      $lte: to
    }
  };
  find_result = SensorData.find(query);
  result = await find_result.exec();
  return result;
}

async function getSensorDatafromNodeid(node_id) {
  var query = { node_id: node_id };
  console.log(query);
  find_result = SensorData.find(query);
  result = await find_result.exec();
  return result;
}

async function getCount() {
  cMetadata = new Object();
  nodes = Node.countDocuments();
  nCount = await nodes.exec();
  cMetadata.nodes = nCount;
  clusters = Cluster.countDocuments();
  cCount = await clusters.exec();
  cMetadata.clusters = cCount;
  users = User.find({ role: "user" }).countDocuments();
  uCount = await users.exec();
  cMetadata.users = uCount;
  cMetadata.sensors = nCount * 4;
  //   console.log(cMetadata);
  return cMetadata;
}

async function listClusternames(user_name, zipcode) {
  user_find = User.find({ name: user_name }, { _id: 1 });
  user_op = await user_find.exec();
  var uid = user_op[0]["_id"].toString();

  var query = { user_id: uid, areaCode: zipcode };
  console.log(query);
  find_result = Cluster.find(query, { cluster_name: 1, _id: 0 });
  result = await find_result.exec();
  return result;
}

async function listNodes(cluster_name) {
  cluster_find = Cluster.find(
    { cluster_name: cluster_name },
    { cluster_id: 1, _id: 0 }
  );
  cluster_op = await cluster_find.exec();
  var Cl_id = cluster_op[0]["cluster_id"].toString();

  var query = { cluster_id: Cl_id };
  console.log(query);
  find_result = Node.find(query);
  result = await find_result.exec();
  return result;
}

async function findUserForRequests(user_id) {
  db.collection("farmerrequests")
    .aggregate([
      { $match: { userId: user_id } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "userId",
          as: "userdetails"
        }
      },
      { $unwind: "$userdetails" },
      {
        $project: {
          userdetails: "$userdetails.name",
          requestId: 1,
          newCluster: 1,
          status: 1
        }
      }
    ])
    .toArray(function(err, res) {
      if (err) throw err;
      console.log(JSON.stringify(res));
      return;
    });
}

async function findRequestsForAdmin() {
  find_result = Request.find().aggregate([
    {
      $lookup: {
        from: "users",
        localField: "",
        foreignField: "_id",
        as: "orderdetails"
      }
    }
  ]);
  result = await find_result.exec();
  return result;
}

async function findAllUsers() {
  find_result = User.find();
  result = await find_result.exec();
  return result;
}

async function dataViewQuery(
  start_date,
  end_date,
  user_name,
  zipcode,
  cluster_name,
  node_id,
  sensor_type
) {
  var query = {};
  if (start_date != null && end_date != null) {
    gt_query = {};
    gt_query["$gte"] = start_date;
    gt_query["$lt"] = end_date;
    query.createdAt = gt_query;
  }
  // if(end_date!=null)
  // {
  //    query['created_at']='{$lte:new ISODate('+end_date+')}';
  // }
  if (user_name != null) {
    user_find = User.find({ name: user_name }, { _id: 1 });
    user_op = await user_find.exec();
    var uid = user_op[0]["_id"].toString();
    cluster_find2 = Cluster.find({ user_id: uid }, { cluster_id: 1, _id: 0 });
    cluster_op2 = await cluster_find2.exec();
    var size = Object.keys(cluster_op2).length;
    if (size > 1) {
      var or_query = [];
      for (item in cluster_op2) {
        or_query.push(cluster_op2[item]);
      }
      console.log(or_query);
      query["$or"] = or_query;
    } else {
      query["cluster_id"] = cluster_op2["cluster_id"];
    }
  }
  if (zipcode != null) {
    cluster_find2 = Cluster.find(
      { areaCode: zipcode },
      { cluster_id: 1, _id: 0 }
    );
    cluster_op2 = await cluster_find2.exec();
    console.log(cluster_op2);
    var size = Object.keys(cluster_op2).length;
    if (size > 1) {
      var or_query = [];
      for (item in cluster_op2) {
        or_query.push(cluster_op2[item]);
      }
      console.log(or_query);
      query["$or"] = or_query;
    } else {
      query["cluster_id"] = cluster_op2["cluster_id"];
    }
  }
  if (cluster_name != null) {
    cluster_find = Cluster.find(
      { cluster_name: cluster_name },
      { cluster_id: 1, _id: 0 }
    );
    cluster_op = await cluster_find.exec();
    query["cluster_id"] = cluster_op[0]["cluster_id"];
  }
  if (node_id != null) query["node_id"] = node_id;
  if (sensor_type != null) {
    query["type"] = sensor_type;
  }
  console.log(query);
  find_result = SensorData.find(query);
  result = await find_result.exec();
  //result[0]['cluster_name']='2';
  return result;
}

async function updateRequests(request_id, status_code) {
  var query = { _id: request_id };
  var update_query = { $set: { status: status_code } };
  find_result = Request.updateMany(query, update_query);
  result = await find_result.exec();
  return result;
}

async function getTheData() {
  var query = { nodeId: "4000" };
  SensorStatus.find().exec(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
}

async function testQueries() {
  //daa = await updateRequests('5cbe50f48f51ce3117d4311d',"pending");
  //daa = await findUserForRequests("5cbd62b6a090d8249f70a016");
  // daa = await dataViewQuery("2019-05-02", "2019-05-04", "Akshay" , "422002", null, null , 'airflow');
  // daa = await getSensorDatafromNodeid("2");
  //console.log(daa);
  //await getTheData();
  await getCount();
}

testQueries();
