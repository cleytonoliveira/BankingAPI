const express = require("express");
const app = express();

const resetRoutes = require("./routes/resetRoutes");
const balanceRoutes = require("./routes/balanceRoutes");
const eventRoutes = require("./routes/eventRoutes");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());
app.use(resetRoutes);
app.use(balanceRoutes);
app.use(eventRoutes);
app.use(errorHandler);

module.exports = app;
