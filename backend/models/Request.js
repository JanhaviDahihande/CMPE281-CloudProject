const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const RequestSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      default: ""
    },
    zip_code: {
      type: String,
      default: ""
    },
    no_of_nodes: {
      type: Number,
      default: 0
    },
    new_cluster: {
      type: String,
      default: ""
    },
    latlong: {
      type: Array,
      default: []
    },
    status: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", RequestSchema);
