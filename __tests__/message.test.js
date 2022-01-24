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
  try {
    await db.sequelize.sync();
  } catch (error) {
    console.log(`
        You did something wrong dummy!
        ${error}
      `);
  }
  create = require("../repository/MessageRepository").create;
  createAgent = require("../repository/AgentRepository").create;
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
  try {
    db.sequelize.close();
  } catch (error) {
    console.log(`
          You did something wrong dummy!
          //${error}
        `);
    throw error;
  }
});

describe("Message integration test", () => {
  test("GET /api/messages?offset=0&limit=1 is secure", async () => {
    const response = await request(app).get("/api/messages?offset=0&limit=1");
    expect(response.status).toBe(401);
  });

  test("GET /api/messages?offset=0&limit=1", async () => {
    const userId = String(faker.datatype.number());
    const entryDate = faker.datatype.datetime();
    const message = faker.lorem.text() + " loan";
    const messageTestDetails = {
      userId,
      messageId: generateUUID(),
      entryDate,
      message,
    };

    const messageDetails = await create(messageTestDetails);

    const response = await request(app)
      .get("/api/messages?offset=0&limit=1")
      .set("Authorization", token);
    expect(response.status).toBe(200);
    expect(response.body.data.rows[0].userId).toBe(messageDetails.userId);
    expect(response.body.data.rows[0].message).toBe(messageDetails.message);
  });

  test("GET /api/messages?offset=0&limit=1&param=loan", async () => {
    const userId = String(faker.datatype.number());
    const entryDate = faker.datatype.datetime();
    const message = "challenges with created loan";
    const messageTestDetails = {
      userId,
      messageId: generateUUID(),
      entryDate,
      message,
    };

    const messageDetails = await create(messageTestDetails);

    const response = await request(app)
      .get("/api/messages?offset=0&limit=1&param=loan")
      .set("Authorization", token);
    expect(response.status).toBe(200);
    expect(response.body.data.rows[0].userId).toBe(messageDetails.userId);
    expect(response.body.data.rows[0].message).toBe(messageDetails.message);
  });
});
