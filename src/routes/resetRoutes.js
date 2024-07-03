const express = require("express");
const resetRouter = express.Router();
const resetController = require("../controllers/resetController");

resetRouter.post("/reset", resetController.reset);

module.exports = resetRouter;
