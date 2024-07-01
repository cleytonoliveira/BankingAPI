const express = require("express");
const app = express();
const balanceRoutes = require("./routes/balanceRoutes");

app.use(balanceRoutes);

module.exports = app;
