const request = require("supertest");
const app = require("../../src/app");

describe("GET to /balance", () => {
  it("should return 404 for non-existing account balance", async () => {
    const response = await request(app).get("/balance?account_id=1234");
    expect(response.status).toBe(404);
    expect(response.body).toEqual(0);
  });

  it("should return 200 and balance for existing account", async () => {
    await request(app).post("/event").send({
      type: "deposit",
      destination: "100",
      amount: 10,
    });
    await request(app).post("/event").send({
      type: "deposit",
      destination: "100",
      amount: 10,
    });

    const response = await request(app).get("/balance?account_id=100");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(20);
  });
});
