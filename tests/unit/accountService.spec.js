const Account = require("../../src/models/Account");
const accountService = require("../../src/services/accountService");
const accountRepository = require("../../src/repository/accountRepository");
const { NotFoundError } = require("../../src/errors/AppError");

jest.mock("../../src/repository/accountRepository");

describe("accountService", () => {
  describe("getBalance", () => {
    it("should return the balance of an existing account", () => {
      const accountId = "100";
      const account = new Account(accountId);
      account.deposit(100);
      accountRepository.getAccountById.mockReturnValue(account);
      const balance = accountService.getBalance(accountId);
      expect(balance).toBe(100);
    });

    it("should throw an error if the account does not exist", () => {
      const accountId = "200";
      accountRepository.getAccountById.mockReturnValue(null);
      expect(() => accountService.getBalance(accountId)).toThrow(NotFoundError);
    });
  });

  describe("handleDeposit", () => {
    it("should deposit the amount into an existing account", () => {
      const destination = "100";
      const amount = 100;
      const account = new Account(destination);
      accountRepository.getAccountById.mockReturnValue(account);
      const result = accountService.handleDeposit(destination, null, amount);
      expect(result.destination.balance).toBe(100);
      expect(accountRepository.saveAccount).toHaveBeenCalledWith(account);
    });

    it("should create a new account and deposit the amount", () => {
      const destination = "100";
      const amount = 100;
      accountRepository.getAccountById.mockReturnValue(null);
      const result = accountService.handleDeposit(destination, null, amount);
      expect(result.destination.balance).toBe(100);
      expect(accountRepository.saveAccount).toHaveBeenCalledWith(
        result.destination,
      );
    });
  });

  describe("handleWithdraw", () => {
    it("should withdraw the amount from an existing account", () => {
      const origin = "100";
      const amount = 100;
      const account = new Account(origin);
      account.deposit(200);
      accountRepository.getAccountById.mockReturnValue(account);
      const result = accountService.handleWithdraw(null, origin, amount);
      expect(result.origin.balance).toBe(100);
      expect(accountRepository.saveAccount).toHaveBeenCalledWith(account);
    });

    it("should throw an error if the account does not exist", () => {
      const origin = "999";
      const amount = 100;
      accountRepository.getAccountById.mockReturnValue(null);
      expect(() => accountService.handleWithdraw(null, origin, amount)).toThrow(
        NotFoundError,
      );
    });
  });

  describe("handleTransfer", () => {
    it("should transfer the amount from one account to another", () => {
      const origin = "100";
      const destination = "300";
      const amount = 5;
      const originAccount = new Account(origin);
      originAccount.deposit(20);
      const destinationAccount = new Account(destination);
      accountRepository.getAccountById.mockImplementation((accountId) => {
        if (accountId === origin) {
          return originAccount;
        }
        return destinationAccount;
      });
      const result = accountService.handleTransfer(destination, origin, amount);
      expect(result.origin.balance).toBe(15);
      expect(result.destination.balance).toBe(5);
      expect(accountRepository.saveAccount).toHaveBeenCalledWith(originAccount);
      expect(accountRepository.saveAccount).toHaveBeenCalledWith(
        destinationAccount,
      );
    });

    it("should create a new account if the destination account does not exist", () => {
      const origin = "100";
      const destination = "777";
      const amount = 5;
      const originAccount = new Account(origin);
      originAccount.deposit(20);
      accountRepository.getAccountById.mockImplementation((accountId) => {
        if (accountId === origin) {
          return originAccount;
        }
        return null;
      });
      const result = accountService.handleTransfer(destination, origin, amount);
      expect(result.origin.balance).toBe(15);
      expect(result.destination.balance).toBe(5);
      expect(accountRepository.saveAccount).toHaveBeenCalledWith(originAccount);
      expect(accountRepository.saveAccount).toHaveBeenCalledWith(
        result.destination,
      );
    });

    it("should throw an error if the origin account does not exist", () => {
      const origin = "888";
      const destination = "100";
      const amount = 100;
      accountRepository.getAccountById.mockReturnValue(null);
      expect(() =>
        accountService.handleTransfer(destination, origin, amount),
      ).toThrow(NotFoundError);
    });
  });

  describe("reset", () => {
    it("should reset the account repository", () => {
      accountService.reset();
      expect(accountRepository.reset).toHaveBeenCalled();
    });
  });
});
