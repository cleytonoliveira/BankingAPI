const accountService = require("../services/accountService");

async function createEvent(req, res) {
  try {
    const { type, destination, amount } = req.body;
    const account = await accountService.createAccount(
      type,
      destination,
      amount,
    );
    res.status(201).json({ destination: account });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createEvent,
};
