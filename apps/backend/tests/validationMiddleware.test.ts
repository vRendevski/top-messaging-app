import * as z from "zod";
import { ZodError } from "zod";
import { withValidation, validateAndPass } from "../src/middleware/validationMiddleware";
import { Request, Response, NextFunction } from "express";
import { EmptyRequestSchema, EmptyResponseSchema } from "@vRendevski/shared/src/types/empty";

describe("validateWith", () => {
  let mockNext: jest.MockedFunction<NextFunction>;
  let mockController: jest.Mock;
  let mockRes: Response;

  function makeReq(data: Partial<Request>): Request{
    return data as Request;
  }

  beforeEach(() => {
    jest.resetAllMocks();
    mockNext = jest.fn();
    mockController = jest.fn();
    mockRes = {
      json: jest.fn(),
      status: jest.fn()
    } as any
  })

  describe("withValidation", () => {
    it("passing empty schemas bypasses validations", async () => {
      const req = makeReq({});
  
      const reqSchema = EmptyRequestSchema;
      const resSchema = EmptyResponseSchema;
  
      const wrapped = withValidation(reqSchema, resSchema, mockController);
      await wrapped(req, mockRes, mockNext);
  
      expect(mockController).toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalled();
      expect(mockNext).not.toHaveBeenCalledWith(expect.any(Error));
    });
  
    it("calls next with error on request schema mismatch", async () => {
      const req = makeReq({ body: { id: 123 }});
  
      const reqSchema = z.object({ body: z.object({ id: z.string() })}); // should be id: z.number()
      const resSchema = EmptyResponseSchema;
  
      const wrapped = withValidation(reqSchema, resSchema, mockController);
      await wrapped(req, mockRes, mockNext);
  
      expect(mockController).not.toHaveBeenCalled();
      expect(mockRes.json).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(expect.any(ZodError));
    });
  
    it("calls next with error on response schema mismatch", async () => {
      const req = makeReq({});
  
      mockController.mockReturnValue({ id: 123 });
  
      const reqSchema = EmptyRequestSchema;
      const resSchema = z.object({ id: z.string() }); // should be id: z.number()
  
      const wrapped = withValidation(reqSchema, resSchema, mockController);
      await wrapped(req, mockRes, mockNext);
  
      expect(mockController).toHaveBeenCalled();
      expect(mockRes.json).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(expect.any(ZodError))
    });
  
    it("calls next without arguments on request schema match", async () => {
      const req = makeReq({ body: { id: 123 }});
  
      const reqSchema = z.object({ body: z.object({ id: z.number() })});
      const resSchema = EmptyResponseSchema;
  
      const wrapped = withValidation(reqSchema, resSchema, mockController);
      await wrapped(req, mockRes, mockNext);
  
      expect(mockController).toHaveBeenCalledWith(req, mockRes, mockNext);
      expect(mockRes.json).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalled();
      expect(mockNext).not.toHaveBeenCalledWith(expect.any(Error));
    });
  
    it("calls next without arguments on response schema match", async () => {
      const req = makeReq({});
  
      const ret = { id: 123 };
      mockController.mockReturnValue(ret);
  
      const reqSchema = EmptyRequestSchema;
      const resSchema = z.object({ id: z.number() });
  
      const wrapped = withValidation(reqSchema, resSchema, mockController);
      await wrapped(req, mockRes, mockNext);
  
      expect(mockController).toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith(ret);
      expect(mockNext).toHaveBeenCalled();
      expect(mockNext).not.toHaveBeenCalledWith(expect.any(Error));
    });
  
    it("transforms data based on schema specifications", async () => {
      const req = makeReq({ params: { id: "123" }});
      const expectedReq = { params: { id: 123 }};
  
      const ret = { id: "123" };
      const expectedRet = { id: 123 };
      mockController.mockReturnValue(ret);
  
      const reqSchema = z.object({ params: z.object({ id: z.string().transform((val) => Number.parseInt(val)) })});
      const resSchema = z.object({ id: z.string().transform((val) => Number.parseInt(val)) });
  
      const wrapped = withValidation(reqSchema, resSchema, mockController);
      await wrapped(req, mockRes, mockNext);
  
      expect(mockController).toHaveBeenCalledWith(expectedReq, mockRes, mockNext);
      expect(mockRes.json).toHaveBeenCalledWith(expectedRet);
      expect(mockNext).toHaveBeenCalled();
      expect(mockNext).not.toHaveBeenCalledWith(expect.any(Error));
    })
  });  

  describe("validateAndPass", () => {
    it("calls next with error on request schema mismatch", async () => {
      const req = makeReq({ body: { id: 123 }});

      const reqSchema = z.object({ body: z.object({ id: z.string() })}); // should be id: z.number()

      const wrapped = validateAndPass(reqSchema);
      await wrapped(req, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(ZodError));
    });

    it("calls next without arguments on schema match", async () => {
      const req = makeReq({ body: { id: 123 }});

      const reqSchema = z.object({ body: z.object({ id: z.number() })});

      const wrapped = validateAndPass(reqSchema);
      await wrapped(req, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(mockNext).not.toHaveBeenCalledWith(expect.any(ZodError));
    });
  });
})