import request from "supertest";
import express from "express";
import errorMiddleware from "../../src/middleware/errorMiddleware";
import { withValidation } from "../../src/middleware/validationMiddleware";
import { EmptyRequestSchema, EmptyResponseSchema } from "@vRendevski/shared/schemas/rest";

const mockController = jest.fn();

const app = express();
app.use(express.json());
app.post("/", withValidation(EmptyRequestSchema, EmptyResponseSchema, mockController));
app.use(errorMiddleware);

describe("request-response flow", () => {
  beforeEach(() => jest.resetAllMocks())

  it("wraps controller-returned data in SuccessResponse on success", async () => {
    const data = { example: "data" };
    mockController.mockImplementation(() => data);

    const res = await request(app)
      .post("/")
      .expect(200);

    expect(res.body).toEqual({
      success: true,
      data
    });
  });

  it("returns ErrorResponse on error", async () => {
    mockController.mockImplementation(() => { throw new Error() });

    const res = await request(app)
      .post("/")
      .expect(500)

    expect(res.body).toMatchObject({
      success: false,
      data: {
        message: expect.any(String)
      }
    })
  })
});