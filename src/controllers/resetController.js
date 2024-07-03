const accountService = require("../services/accountService");

async function reset(_req, res, next) {
  try {
    await accountService.reset();
    res.status(200).send("OK");
  } catch (error) {
    next(error);
  }
}

module.exports = {
  reset,
};
