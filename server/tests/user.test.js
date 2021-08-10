const request = require("supertest");
const app = require("../src/app");
const { userOne, setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should create userOne", async () => {
  const response = await request(app)
    .post("/users/signup")
    .send(userOne)
    .expect(201);
});

test("Should Not create user", async () => {
  const response = await request(app)
    .post("/users/signup")
    .send({
      username: "temp",
      email: "aaa",
      password: "hi",
    })
    .expect(400);
});

// LOGIN
test("Should login user", async () => {
  request(app)
    .post("/users/login")
    .send({
      username: userOne.username,
      password: userOne.password,
    })
    .expect(200);
});

test("Should Not login user", async () => {
  request(app)
    .post("/users/login")
    .send({
      username: "asohfs",
      password: "slhfieros",
    })
    .expect(400);
});
