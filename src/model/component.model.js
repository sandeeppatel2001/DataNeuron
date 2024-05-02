const { Schema, model } = require("mongoose");

const ComponentSchema = new Schema(
  {
    data: { type: String },
    is_deleted: { type: Boolean, default: false },
    update_count: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports.ComponentModel = model("component", ComponentSchema);
