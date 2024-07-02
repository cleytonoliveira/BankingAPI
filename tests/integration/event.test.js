const request = require("supertest");
const app = require("../../src/app");

describe("POST to /event", () => {
  beforeEach(async () => {
    await request(app).post("/reset");
  });

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

  it("should return 201 and deposit into existing account", async () => {
    await request(app).post("/event").send({
      type: "deposit",
      destination: "100",
      amount: 10,
    });
    const response = await request(app).post("/event").send({
      type: "deposit",
      destination: "100",
      amount: 10,
    });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      destination: {
        id: "100",
        balance: 20,
      },
    });
  });

  it("should return 404 for non-existing account withdraw", async () => {
    const response = await request(app).post("/event").send({
      type: "withdraw",
      origin: "200",
      amount: 10,
    });
    expect(response.status).toBe(404);
    expect(response.body).toEqual(0);
  });

  it("should return 201 and withdraw from existing account", async () => {
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
    const response = await request(app).post("/event").send({
      type: "withdraw",
      origin: "100",
      amount: 5,
    });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      origin: {
        id: "100",
        balance: 15,
      },
    });
  });

  it("should return 201 and transfer between existing accounts", async () => {
    await request(app).post("/event").send({
      type: "deposit",
      destination: "100",
      amount: 15,
    });
    await request(app).post("/event").send({
      type: "deposit",
      destination: "300",
      amount: 0,
    });
    const response = await request(app).post("/event").send({
      type: "transfer",
      origin: "100",
      destination: "300",
      amount: 15,
    });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      origin: {
        id: "100",
        balance: 0,
      },
      destination: {
        id: "300",
        balance: 15,
      },
    });
  });

  it("should return 404 for non-existing account transfer", async () => {
    const response = await request(app).post("/event").send({
      type: "transfer",
      origin: "200",
      destination: "300",
      amount: 15,
    });
    expect(response.status).toBe(404);
    expect(response.body).toEqual(0);
  });
});
