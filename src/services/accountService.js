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

const eventFunctionsByTypes = {
  deposit: (destination, _origin, amount) => {
    if (!accounts[destination]) {
      setAccount(destination, amount);
      return { destination: accounts[destination] };
    }
    setBalance(destination, amount);
    return { destination: accounts[destination] };
  },
  withdraw: (_destination, origin, amount) => {
    if (!accounts[origin]) {
      return null;
    }
    setBalance(origin, -amount);
    return { origin: accounts[origin] };
  },
  transfer: (destination, origin, amount) => {
    if (!accounts[destination]) {
      setAccount(destination, 0);
    }
    if (!accounts[origin]) {
      return null;
    }
    setBalance(origin, -amount);
    setBalance(destination, amount);
    return { origin: accounts[origin], destination: accounts[destination] };
  },
};

function createAccount(type, destination, origin, amount) {
  const event = eventFunctionsByTypes[type];
  if (event) {
    return event(destination, origin, amount);
  }
  return getAccount(destination);
}

module.exports = {
  getBalance,
  createAccount,
};
