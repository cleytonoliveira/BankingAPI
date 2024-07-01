const request = require("supertest");
const app = require("../../src/app");

describe("GET to /balance", () => {
  it("should return 404 for non-existing account balance", async () => {
    const response = await request(app).get("/balance?account_id=1234");
    expect(response.status).toBe(404);
    expect(response.body).toEqual(0);
  });
});
