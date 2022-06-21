const { UserBusiness } = require("..");

const MOCK_RESULTS = {
  allUsers: [
    {
        id: "3f0d2dd3-6648-4edb-b98c-83af3565a52d",
        email: "test@test.com",
      },
      {
        id: "3f0d2dd3-6648-4edb-b98c-83af3565a52f",
        email: "test2@test.com",
      },
      {
        id: "3f0d2dd3-6648-4edb-b98c-83af3565a52g",
        email: "test3@test.com",
      },
  ],
  oneUser: {
    id: "3f0d2dd3-6648-4edb-b98c-83af3565a52d",
    email: "test@test.com",
  }, 
  insertedUser: {
    id: "3f0d2dd3-6648-4edb-b98c-83af3565a52f",
    email: "test2@test.com",
    password: "12345678"
  },
  updatedUser: {
    id: "3f0d2dd3-6648-4edb-b98c-83af3565a52g",
    email: "test3@test.com",
    password: "12345678"
  }
}

jest.mock("../../repository", () => {
  return {
    __esModule: true,
    UserRepository: {
      findAll: jest.fn(() => MOCK_RESULTS.allUsers),
      findById: jest.fn((id) => MOCK_RESULTS.oneUser),
      insert: jest.fn((user) => MOCK_RESULTS.insertedUser),
      update: jest.fn((id, user) => MOCK_RESULTS.updatedUser),
      delete: jest.fn((id) => MOCK_RESULTS.updatedUser),
    }
  };
});

describe('Business users CRUD - Happy way', () => {

  test("Business findAll users", async () => {
    const result = await UserBusiness.findAll();
  
    expect(result).toBeInstanceOf(Array);
    expect(result).toEqual(MOCK_RESULTS.allUsers);
  });
  
  test("Business findById user", async () => {
    const result = await UserBusiness.findById(1);
    expect(result).toEqual(MOCK_RESULTS.oneUser);
  });

  test("Business insert user ", async () => {
    const result = await UserBusiness.insert(MOCK_RESULTS.insertedUser);
    expect(result).toEqual(MOCK_RESULTS.insertedUser);
  });

  test("Business update user ", async () => {
    const result = await UserBusiness.update(MOCK_RESULTS.updatedUser.id, MOCK_RESULTS.updatedUser);
    expect(result).toEqual(MOCK_RESULTS.updatedUser);
  });

  test("Business delete user ", async () => {
    const result = await UserBusiness.delete(MOCK_RESULTS.updatedUser.id);
    expect(result).toEqual(MOCK_RESULTS.updatedUser);
  });
});

describe('Business users CRUD - Sad way', () => {
  jest.mock("../../repository", () => {
    return {
      __esModule: true,
      UserRepository: {
        findById: jest.fn((id) => null),
      }
    };
  });
  
  test("Business findById user failed not found", async () => {
    try {
      const result = await UserBusiness.findById(-1);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual("Usuário não encontrada");
      expect(error.status).toEqual(404);
    }
  });

  test("Business insert user failed fields validation", async () => {
    try {
      const result = await UserBusiness.insert({});
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual("Faltam parâmetros do usuário");
      expect(error.status).toEqual(400);
    }
  });

  test("Business update user failed not found", async () => {
    try {
      const result = await UserBusiness.update(-1, MOCK_RESULTS.updatedUser);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual("Usuário não encontrada");
      expect(error.status).toEqual(404);
    }
  });
  
  test("Business delete user failed not found", async () => {
    try {
      const result = await UserBusiness.delete(-1);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual("Usuário não encontrada");
      expect(error.status).toEqual(404);
    }
  });
});