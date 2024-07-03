const accountService = require("../services/accountService");

async function getBalance(req, res, next) {
  try {
    const { account_id: accountId } = req.query;
    const balance = await accountService.getBalance(accountId);
    res.status(200).json(balance);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getBalance,
};
