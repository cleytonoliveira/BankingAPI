const accounts = {};

function getAccount(accountId) {
  return accounts[accountId];
}

function getBalance(accountId) {
  const account = getAccount(accountId);
  const balance = account ? account.balance : 0;
  return balance;
}

module.exports = {
  getBalance,
};
