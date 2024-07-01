const request = require("supertest");
const app = require("../../src/app");

describe("POST to /event", () => {
  it("should return 201 for create account with initial balance", async () => {
    const response = await request(app).post("/event").send({
      type: "deposit",
      destination: "100",
      amount: 10,
    });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      destination: {
        id: "100",
        balance: 10,
      },
    });
  });
});
