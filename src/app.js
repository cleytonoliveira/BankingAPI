const express = require("express");
const app = express();
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./docs/swagger_output.json");

const resetRoutes = require("./routes/resetRoutes");
const balanceRoutes = require("./routes/balanceRoutes");
const eventRoutes = require("./routes/eventRoutes");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());
app.use(cors());
app.use(resetRoutes);
app.use(balanceRoutes);
app.use(eventRoutes);
app.use(errorHandler);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

module.exports = app;
