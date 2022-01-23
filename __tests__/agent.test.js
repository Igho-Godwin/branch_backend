const request = require("supertest");
const faker = require("@faker-js/faker");
const { generateUUID } = require("../controllers/globals.js");

let db;
let app;

beforeAll(() => {
  const server = require("../app");
  db = server.db;
  app = server.app;
});

afterAll(async () => {
  await db.sequelize.close();
});

describe("Agent Integration test", () => {
  test("POST /api/agent/signup", (done) => {
    const signUpTestDetails = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(
        faker.name.firstName(),
        faker.name.lastName()
      ),
    };

    request(app)
      .post("/api/agent/signup")
      .send(signUpTestDetails)
      .expect(200)
      .expect(async (response) => {
        expect(response.body.data.firstName).toBe(signUpTestDetails.firstName);
        expect(response.body.data.lastName).toBe(signUpTestDetails.lastName);
        expect(response.body.data.email).toBe(signUpTestDetails.email);
      })
      .end(done);
  });

  test("POST /api/agent/login", async () => {
    const { create } = require("../repository/AgentRepository");

    const signUpTestDetails = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      agentId: generateUUID(),
    };

    const agentDetails = await create(signUpTestDetails);
    const loginTestDetails = {
      email: agentDetails.email,
    };

    const response = await request(app)
      .post("/api/agent/login")
      .send(loginTestDetails);
    expect(response.status).toBe(200);
    expect(response.body.hasOwnProperty("token")).toBe(true);
  });
});
