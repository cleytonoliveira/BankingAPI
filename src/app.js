const express = require("express");
const app = express();

const resetRoutes = require("./routes/resetRoutes");
const balanceRoutes = require("./routes/balanceRoutes");
const eventRoutes = require("./routes/eventRoutes");

app.use(express.json());
app.use(resetRoutes);
app.use(balanceRoutes);
app.use(eventRoutes);

module.exports = app;
