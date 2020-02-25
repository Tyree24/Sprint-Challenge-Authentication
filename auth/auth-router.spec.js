const server = require("../api/server.js");
const request = require("supertest");
const db = require("../database/dbConfig.js");

//testing environment test

describe("root", () => {
  test("environment should be testing", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });
});

//register tests

describe("Register Functionality", () => {
  it("register user successful 201", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({
        username: "ola",
        password: "comoestas"
      });
    expect(res.status).toBe(201);
  });

  it("return json", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({
        username: "pippin",
        password: "merrysucks"
      });
    expect(res.type).toBe("application/json");
  });

  beforeEach(async () => {
    await db("users").truncate();
  });
});

//login tests

describe("Login Functionality", () => {
  it("return registered user", async () => {
    request(server)
      .post("/api/auth/register")
      .send({
        username: "jelly",
        password: "peanutbutter"
      })
      .set("Accept", "application/json")
      .expect(201);
  });

  it("return 200", async () => {
    request(server)
      .post('/api/auth/login')
      .send({
        username: "cheese",
        password: "please"
      })
      .set('Accept', 'application/json')
      .expect(200)
  });
});