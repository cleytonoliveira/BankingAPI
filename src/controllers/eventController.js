const accountService = require("../services/accountService");

async function createEvent(req, res, next) {
  // #swagger.tags = ['Event']
  // #swagger.description = 'Endpoint to create an event'
  /* #swagger.requestBody = {
    content: {
      'application/json': {
        schema: { $ref: "#/definitions/Event" }
      }
    }
  } */
  try {
    const { type, destination, origin, amount } = req.body;
    const account = await accountService.handleEvent(
      type,
      destination,
      origin,
      amount,
    );
    /* #swagger.responses[001] = {
      schema: { $ref: "#/definitions/Deposit" },
      description: 'Deposit created successfully'
    } */
    /* #swagger.responses[002] = {
      schema: { $ref: "#/definitions/Withdraw" },
      description: 'Withdraw created successfully'
    } */
    /* #swagger.responses[003] = {
      schema: { $ref: "#/definitions/Transfer" },
      description: 'Transfer created successfully'
    } */
    res.status(201).json(account);
  } catch (error) {
    /* #swagger.responses[404] = {
      schema: { $ref: "#/definitions/Error" },
      description: 'Account not found'
    } */
    next(error);
  }
}

module.exports = {
  createEvent,
};
