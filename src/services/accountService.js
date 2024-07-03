const accountRepository = require("../repository/accountRepository");
const Account = require("../models/Account");
const { NotFoundError } = require("../errors/AppError");

function getBalance(accountId) {
  const account = accountRepository.getAccountById(accountId);
  if (account) {
    return account.balance;
  }
  throw new NotFoundError(0);
}

function handleDeposit(destination, _origin, amount) {
  let account = accountRepository.getAccountById(destination);
  if (!account) {
    account = new Account(destination);
  }
  account.deposit(amount);
  accountRepository.saveAccount(account);
  return { destination: account };
}

function handleWithdraw(_destination, origin, amount) {
  const account = accountRepository.getAccountById(origin);
  if (!account) {
    throw new NotFoundError(0);
  }
  account.withdraw(amount);
  accountRepository.saveAccount(account);
  return { origin: account };
}

function handleTransfer(destination, origin, amount) {
  const originAccount = accountRepository.getAccountById(origin);
  if (!originAccount) {
    throw new NotFoundError(0);
  }
  let destinationAccount = accountRepository.getAccountById(destination);
  if (!destinationAccount) {
    destinationAccount = new Account(destination);
  }
  originAccount.withdraw(amount);
  destinationAccount.deposit(amount);
  accountRepository.saveAccount(originAccount);
  accountRepository.saveAccount(destinationAccount);
  return { origin: originAccount, destination: destinationAccount };
}

const eventFunctionsByTypes = {
  deposit: handleDeposit,
  withdraw: handleWithdraw,
  transfer: handleTransfer,
};

function handleEvent(type, destination, origin, amount) {
  const event = eventFunctionsByTypes[type];
  return event(destination, origin, amount);
}

function reset() {
  accountRepository.reset();
}

module.exports = {
  getBalance,
  handleEvent,
  reset,
};
