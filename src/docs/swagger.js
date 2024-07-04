const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const outputFile = "./src/docs/swagger_output.json";
const endpointsFiles = [
  "./src/routes/balanceRoutes.js",
  "./src/routes/eventRoutes.js",
  "./src/routes/resetRoutes.js",
];

const doc = {
  info: {
    version: "1.0.0",
    title: "Banking API",
    description: "Documentation for the Banking API",
  },
  host: "localhost:3001",
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    { name: "Balance", description: "Endpoints for balance" },
    { name: "Event", description: "Endpoints for event" },
    { name: "Reset", description: "Endpoints for reset" },
  ],

  definitions: {
    Balance: 10,
    Deposit: {
      destination: {
        id: "100",
        balance: 10,
      },
    },
    Withdraw: {
      origin: {
        id: "100",
        balance: 5,
      },
    },
    Transfer: {
      origin: {
        id: "100",
        balance: 5,
      },
      destination: {
        id: "300",
        balance: 10,
      },
    },
    Event: {
      type: "deposit",
      origin: "100",
      destination: "300",
      amount: 10,
    },
    Reset: "OK",
    Error: 0,
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc);
