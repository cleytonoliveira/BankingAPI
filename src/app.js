const express = require("express");
const app = express();
const balanceRoutes = require("./routes/balanceRoutes");
const eventRoutes = require("./routes/eventRoutes");

app.use(express.json());
app.use(balanceRoutes);
app.use(eventRoutes);

module.exports = app;
