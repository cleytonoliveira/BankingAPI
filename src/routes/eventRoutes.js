const express = require("express");
const eventRouter = express.Router();
const eventController = require("../controllers/eventController");

eventRouter.post("/event", eventController.createEvent);

module.exports = eventRouter;
