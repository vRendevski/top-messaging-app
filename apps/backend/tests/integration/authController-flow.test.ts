import request from "supertest";
import express from "express";
import * as authController from "../../src/controller/authController";

const app = express();
app.use(express.json());
app.get("/me", authController.me);

describe("authController.me", () => {
  it("returns 401 on unauthenticated user", async () => {
    await request(app).get("/me").expect(401);
  })
})