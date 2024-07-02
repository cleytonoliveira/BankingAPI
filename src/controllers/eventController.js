const accountService = require("../services/accountService");

async function createEvent(req, res) {
  try {
    const { type, destination, origin, amount } = req.body;
    const account = await accountService.createAccount(
      type,
      destination,
      origin,
      amount,
    );
    if (!account) {
      return res.status(404).json(0);
    }
    res.status(201).json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createEvent,
};
