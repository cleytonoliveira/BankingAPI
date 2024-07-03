class Account {
  constructor(id, balance = 0) {
    this.id = id;
    this.balance = balance;
  }

  deposit(amount) {
    this.balance += amount;
  }

  withdraw(amount) {
    this.balance -= amount;
  }
}

module.exports = Account;
