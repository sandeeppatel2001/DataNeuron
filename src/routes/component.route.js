const express = require("express");
const {
  addComponentHandler,
  updateComponentHandler,
  getCountHandler,
  getComponentHandler,
} = require("../controllers/component.controller");
const { validateRequest } = require("../middleware/validateRequest");
const {
  addComponentSchema,
  updateComponentSchema,
} = require("../schema/component.schema");
const router = express.Router();

router.post("/", validateRequest(addComponentSchema), addComponentHandler);
router.patch(
  "/",
  validateRequest(updateComponentSchema),
  updateComponentHandler
);
router.get("/", getComponentHandler);
router.get("/count", getCountHandler);

module.exports = router;
