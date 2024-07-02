const { accounts } = require("../infra/data");

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

function setBalance(accountId, amount) {
  const account = getAccount(accountId);
  if (account) {
    account.balance += amount;
  }
}

const eventTypes = {
  deposit: (destination, amount) => {
    if (!accounts[destination]) {
      setAccount(destination, amount);
      return { destination: accounts[destination] };
    }
    setBalance(destination, amount);
    return { destination: accounts[destination] };
  },
};

function createAccount(type, destination, amount) {
  const event = eventTypes[type];
  if (event) {
    return event(destination, amount);
  }
  return getAccount(destination);
}

module.exports = {
  getBalance,
  createAccount,
};
