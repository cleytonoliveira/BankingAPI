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
});
