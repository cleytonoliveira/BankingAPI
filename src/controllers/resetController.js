const accountService = require("../services/accountService");

async function reset(_req, res, next) {
  // #swagger.tags = ['Reset']
  // #swagger.description = 'Endpoint to reset the account'
  try {
    await accountService.reset();
    /* #swagger.responses[200] = {
      schema: { $ref: "#/definitions/Reset" },
      description: 'Account reset successfully'
    } */
    res.status(200).send("OK");
  } catch (error) {
    next(error);
  }
}

module.exports = {
  reset,
};
