const express = require("express");
const resetRouter = express.Router();
const { accounts } = require("../infra/data");

resetRouter.post("/reset", (_req, res) => {
  Object.keys(accounts).forEach((key) => {
    delete accounts[key];
  });
  res.status(200).json("OK");
});

module.exports = resetRouter;
