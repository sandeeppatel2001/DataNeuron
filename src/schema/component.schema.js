const { object, string } = require("zod");

module.exports.addComponentSchema = object({
  body: object({
    id: string({ required_error: "Component id is required" }),
    data: string({ required_error: "Data is required" }),
  }),
});

module.exports.updateComponentSchema = object({
  body: object({
    id: string({ required_error: "Component Id is required" }),
    data: string({ required_error: "Data is required" }),
  }),
});
