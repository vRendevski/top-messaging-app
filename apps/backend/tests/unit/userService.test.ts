import userService from "../../src/service/UserService";

describe("userService", () => {

  beforeEach(() => jest.restoreAllMocks());

  const cases = [
    { doesUserExistByEmail: true, doesUserExistByUsername: false },
    { doesUserExistByEmail: false, doesUserExistByUsername: true },
    { doesUserExistByEmail: true, doesUserExistByUsername: true}
  ];

  test.each(cases)("throws when creating user - userExistsByEmail($doesUserExistByEmail) and userExistsByUsername($doesUserExistByUsername)", 
    ({ doesUserExistByEmail, doesUserExistByUsername }) => {
      jest.spyOn(userService, "userExistsByEmail").mockImplementation(() => Promise.resolve(doesUserExistByEmail));
      jest.spyOn(userService, "userExistsByUsername").mockImplementation(() => Promise.resolve(doesUserExistByUsername));

      expect(() => userService.createUser("username", "email", "password")).rejects.toThrow();
    }
  );
})