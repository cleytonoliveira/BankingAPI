const express = require("express");
const balanceRouter = express.Router();
const balanceController = require("../controllers/balanceController");

balanceRouter.get("/balance", balanceController.getBalance);

module.exports = balanceRouter;
