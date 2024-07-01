const accounts = {};

function getAccount(accountId) {
  return accounts[accountId];
}

function setAccount(accountId, amount) {
  accounts[accountId] = { id: accountId, balance: amount };
}

function getBalance(accountId) {
  const account = getAccount(accountId);
  const balance = account ? account.balance : 0;
  return balance;
}

function createAccount(_type, destination, amount) {
  setAccount(destination, amount);
  return getAccount(destination);
}

module.exports = {
  getBalance,
  createAccount,
};
