const accountService = require("../services/accountService");

async function createEvent(req, res, next) {
  try {
    const { type, destination, origin, amount } = req.body;
    const account = await accountService.handleEvent(
      type,
      destination,
      origin,
      amount,
    );
    res.status(201).json(account);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createEvent,
};
