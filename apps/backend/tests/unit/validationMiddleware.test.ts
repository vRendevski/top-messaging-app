import * as z from "zod";
import { ZodError } from "zod";
import { withValidation } from "../../src/middleware/validationMiddleware";
import { Request, Response, NextFunction } from "express";
import { EmptyParams, EmptyQuery, EmptyBody, EmptyResponseSchema, EmptyRequestSchema } from "@vRendevski/shared/schemas/rest/common/empty";

describe("validateWith", () => {
  let mockNext: jest.MockedFunction<NextFunction>;
  let mockController: jest.Mock;
  let mockRes: Response;

  function makeReq(data: Partial<Request>): Request{
    return data as Request;
  }

  function makeReqSchema({ params, query, body }: { params?: z.ZodType, query?: z.ZodType, body?: z.ZodType }) {
    return {
      params: params ?? EmptyParams,
      query: query ?? EmptyQuery,
      body: body ?? EmptyBody
    };
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
  
      const reqSchema = makeReqSchema({ body: z.object({ id: z.string() }) }); // should be id: z.number()
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
  
      const reqSchema = makeReqSchema({ body: z.object({ id: z.number() }) });
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
      expect(mockRes.json).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalled();
      expect(mockNext).not.toHaveBeenCalledWith(expect.any(Error));
    });

    it("on success wraps controller-returned data in a SuccessResponse", async () => {
      const req = makeReq({ body: { id: 123 }});

      const ret = { id: 123 };
      const expectedRet = { success: true, data: ret };
      mockController.mockReturnValue(ret);

      const reqSchema = makeReqSchema({ body: z.object({ id: z.number() })});
      const resSchema = z.object({ id: z.number() });

      const wrapped = withValidation(reqSchema, resSchema, mockController);
      await wrapped(req, mockRes, mockNext);

      expect(mockController).toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith(expectedRet);
      expect(mockNext).toHaveBeenCalled();
      expect(mockNext).not.toHaveBeenCalledWith(expect.any(Error));
    })
  
    it("transforms data based on schema specifications", async () => {
      const req = makeReq({ params: { id: "123" }});
      const expectedReq = { params: { id: 123 }};
  
      const ret = { id: "123" };
      const expectedRet = { success: true, data: { id: 123 }};
      mockController.mockReturnValue(ret);
  
      const reqSchema = makeReqSchema({ params: z.object({ id: z.string().transform(Number) }) });
      const resSchema = z.object({ id: z.string().transform(Number) });
  
      const wrapped = withValidation(reqSchema, resSchema, mockController);
      await wrapped(req, mockRes, mockNext);
  
      expect(mockController).toHaveBeenCalledWith(expectedReq, mockRes, mockNext);
      expect(mockRes.json).toHaveBeenCalledWith(expectedRet);
      expect(mockNext).toHaveBeenCalled();
      expect(mockNext).not.toHaveBeenCalledWith(expect.any(Error));
    })
  });  
})