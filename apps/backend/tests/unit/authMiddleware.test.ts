import { onlyPassAuthenticated } from "../../src/middleware/authMiddleware";

describe("authMiddleware", () => {
  const mockRes = jest.fn();
  const mockNext = jest.fn();

  beforeEach(() => jest.resetAllMocks());

  it("onlyPassAuthenticated calls next without argument when user exists", () =>  {
    const req = { user: { id: 123, username: "myUsername" }};

    onlyPassAuthenticated(req as any, mockRes as any, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).not.toHaveBeenCalledWith(expect.any(Error));
  });

  it("onlyPassAuthenticated calls next with error when user doesnt exist", () => {
    const req = { user: undefined };

    onlyPassAuthenticated(req as any, mockRes as any, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
  })
})