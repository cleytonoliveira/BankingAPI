const accountService = require("../services/accountService");

async function getBalance(req, res, next) {
  // #swagger.tags = ['Balance']
  // #swagger.description = 'Endpoint to get the balance'
  // #swagger.parameters['account_id'] = { in: 'query', description: 'Account ID', type: 'string' }
  try {
    const { account_id: accountId } = req.query;
    const balance = await accountService.getBalance(accountId);
    /* #swagger.responses[200] = {
    schema: { $ref: "#/definitions/Balance" },
    description: 'Balance retrieved successfully'
  } */
    res.status(200).json(balance);
  } catch (error) {
    /* #swagger.responses[404] = {
    schema: { $ref: "#/definitions/Error" },
    description: 'Account not found'
  } */
    next(error);
  }
}

module.exports = {
  getBalance,
};
