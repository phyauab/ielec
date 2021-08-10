const request = require("supertest");
const app = require("../src/app");
const { userOne, setupDatabase, closeDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);

test("Create userOne (sucess)", async () => {
  const response = await request(app)
    .post("/users/signup")
    .send(userOne)
    .expect(201);
});
