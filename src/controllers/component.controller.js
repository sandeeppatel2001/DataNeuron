const { asyncHandler } = require("../middleware/asyncHandler");
const mongoose = require("mongoose");
const { ComponentModel } = require("../model/component.model");
module.exports.addComponentHandler = asyncHandler(async (req, res, next) => {
  console.log("ssssss");
  const session = await mongoose.startSession();
  await session.startTransaction();
  console.log("abc");
  try {
    const component = await ComponentModel.findOne({ _id: req.body.id });
    console.log("abc");
    if (!component || component.is_deleted) {
      throw new Error("Invalid Component Id");
    }
    console.log("sandeep", component.update_count);
    component.data = req.body.data;
    component.update_count = 0;
    console.log("sandeep", component.update_count);
    // component.is_deleted = false;
    await component.save();

    // await ComponentModel. create({
    //   data: req.body.data,
    // });
    await session.commitTransaction();

    return res.status(200).json({
      message: "Component saved",
    });
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    return res.status(400).json({
      message: "Error while creating",
    });
  }
});
module.exports.updateComponentHandler = asyncHandler(async (req, res, next) => {
  const component = await ComponentModel.findOne({ _id: req.body.id });

  if (!component || component.is_deleted) {
    throw new Error("Invalid Component Id");
  }
  component.data = req.body.data;
  component.update_count += 1;
  await component.save();

  return res.status(200).json({
    message: "Component Updated",
  });
});

module.exports.getCountHandler = asyncHandler(async (req, res, next) => {
  const addCount = await ComponentModel.countDocuments({});
  const updateCount = await ComponentModel.aggregate([
    {
      $group: {
        _id: null,
        updateCount: { $sum: "$update_count" },
      },
    },
  ]);

  return res.status(200).json({
    data: {
      add: addCount,
      update: (updateCount[0] && updateCount[0].updateCount) || 0,
    },
  });
});

module.exports.getComponentHandler = asyncHandler(async (req, res, next) => {
  const components = await ComponentModel.find({ is_deleted: false });
  console.log("hited");
  return res.status(200).json({
    data: components,
  });
});
