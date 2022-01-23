const request = require("supertest");
const faker = require("@faker-js/faker");
const { generateUUID } = require("../controllers/globals.js");

let db;
let app;
let token;
let create;
let createAgent;

beforeAll(async () => {
  const server = require("../app");
  db = server.db;
  app = server.app;
  createAgent = require("../repository/AgentRepository").create;
  create = require("../repository/ResponseRepository").create;
  const signUpTestDetails = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    agentId: generateUUID(),
  };

  const agentDetails = await createAgent(signUpTestDetails);
  const loginTestDetails = {
    email: agentDetails.email,
  };
  const response = await request(app)
    .post("/api/agent/login")
    .send(loginTestDetails);

  token = response.body.token;
});

afterAll(async () => {
  await db.sequelize.close();
});

describe("Response integration test", () => {
  test("POST /api/agent/response/create is secure", (done) => {
    const agentResponse = {
      messageId: generateUUID(),
      userId: String(faker.datatype.number()),
      response: faker.lorem.text(),
    };

    request(app)
      .post("/api/agent/response/create")
      .send(agentResponse)
      .expect(401)
      .end(done);
  });

  test("POST /api/agent/response/create", (done) => {
    const agentResponse = {
      messageId: generateUUID(),
      userId: String(faker.datatype.number()),
      response: faker.lorem.text(),
    };

    request(app)
      .post("/api/agent/response/create")
      .set("Authorization", token)
      .send(agentResponse)
      .expect(200)
      .expect(async (response) => {
        expect(response.body.data.response).toBe(agentResponse.response);
        expect(response.body.data.userId).toBe(agentResponse.userId);
        expect(response.body.data.messageId).toBe(agentResponse.messageId);
      })
      .end(done);
  });

  test("GET /api/agent/response/all?messageId=?", async () => {
    const agentResponse = {
      responseId: generateUUID(),
      messageId: generateUUID(),
      agentId: generateUUID(),
      userId: String(faker.datatype.number()),
      from: "Agent",
      response: faker.lorem.text(),
    };

    const agentResponseDetails = await create(agentResponse);

    const response = await request(app)
      .get(
        `/api/agent/response/all?messageId=${agentResponseDetails.messageId}`
      )
      .set("Authorization", token);

    expect(response.status).toBe(200);
    expect(response.body.data[0].from).toBe(agentResponse.from);
    expect(response.body.data[0].userId).toBe(agentResponse.userId);
    expect(response.body.data[0].response).toBe(agentResponse.response);
    expect(response.body.data[0].userId).toBe(agentResponse.userId);
    expect(response.body.data[0].messageId).toBe(agentResponse.messageId);
  });

  test("GET /api/agent/response/all?messageId=? is secure", async () => {
    const agentResponse = {
      responseId: generateUUID(),
      messageId: generateUUID(),
      agentId: generateUUID(),
      userId: String(faker.datatype.number()),
      from: "Agent",
      response: faker.lorem.text(),
    };

    const agentResponseDetails = await create(agentResponse);

    const response = await request(app).get(
      `/api/agent/response/all?messageId=${agentResponseDetails.messageId}`
    );
    expect(response.status).toBe(401);
  });
});
