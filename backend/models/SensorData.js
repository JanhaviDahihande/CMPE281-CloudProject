const mongoose = require("mongoose");
let AutoIncrement = require("mongoose-sequence")(mongoose);
const bcrypt = require("bcrypt");
const SensorDataSchema = new mongoose.Schema({
  sensor_id: {
    type: String,
    default: ""
  },
<<<<<<< Updated upstream
=======
  
>>>>>>> Stashed changes
  node_id: {
    type: String,
    default: ""
  },
  cluster_id: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default: ""
  },
  value: {
    type: String,
    default: ""
  },
 
  status: {
    type: Boolean,
    default: false
  }
},{ timestamps: true });
// SensorSchema.plugin(AutoIncrement, { id: "sensor_id", inc_field: "sensor_id" });
module.exports = mongoose.model("SensorData", SensorDataSchema);
