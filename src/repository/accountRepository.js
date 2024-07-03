const { accounts } = require("../infra/data");

function getAccountById(accountId) {
  return accounts[accountId] || null;
}

function saveAccount(account) {
  accounts[account.id] = account;
}

function reset() {
  Object.keys(accounts).forEach((key) => {
    delete accounts[key];
  });
}

module.exports = {
  getAccountById,
  saveAccount,
  reset,
};
