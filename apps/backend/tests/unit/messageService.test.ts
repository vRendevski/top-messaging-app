import messageService from "../../src/service/MessageService";
import userService from "../../src/service/UserService";

describe("messageService", () => {

  beforeEach(() => jest.restoreAllMocks());

  const cases = [
    { doesUserFromExist: true, doesUserToExist: false },
    { doesUserFromExist: false, doesUserToExist: true },
    { doesUserFromExist: true, doesUserToExist: true}
  ];

  test.each(cases)("throws when creating message - doesUserFromExist($doesUserFromExist) and doesUserToExist($doesUserToExist)", 
    ({ doesUserFromExist, doesUserToExist }) => {
      jest.spyOn(userService, "userExistsById")
        .mockImplementationOnce(() => Promise.resolve(doesUserFromExist))
        .mockImplementationOnce(() => Promise.resolve(doesUserToExist));

      expect(() => messageService.createNewMessage(1, 2, "myVeryCoolMessage")).rejects.toThrow();
    }
  );
})