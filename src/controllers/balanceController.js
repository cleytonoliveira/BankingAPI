const accountService = require("../services/accountService");

async function getBalance(req, res) {
  try {
    const { account_id: accountId } = req.query;
    const balance = await accountService.getBalance(accountId);
    if (!balance) {
      return res.status(404).json(0);
    }
    res.status(200).json(balance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getBalance,
};
