const mongoose = require("mongoose");
let AutoIncrement = require("mongoose-sequence")(mongoose);
const bcrypt = require("bcrypt");
const SensorSchema = new mongoose.Schema({
  node_id: {
    type: String,
    default: ""
  },
  cluster_id: {
    type: String,
    default: ""
  },
  sensor_type: {
    type: String,
    default: ""
  },
  status: {
    type: Boolean,
    default: false
  }
},
{ timestamps: true });
SensorSchema.plugin(AutoIncrement, { id: "sensor_id", inc_field: "sensor_id" });
module.exports = mongoose.model("Sensor", SensorSchema);
