const { CategoryBusiness } = require("..");

const MOCK_RESULTS = {
  allCategories: [
    {
      id: 1,
      name: "Anel",
    },
    {
      id: 3,
      name: "Brinco",
    },
    {
      id: 4,
      name: "Pulseira",
    },
  ],
  oneCategory: {
    id: 1,
    name: "Anel",
  }, 
  insertedCategory: {
    name: "test"
  },
  updatedCategory: {
    id: 2,
    name: "Colar",
  }
}

jest.mock("../../repository", () => {
  return {
    __esModule: true,
    CategoryRepository: {
      findAll: jest.fn(() => MOCK_RESULTS.allCategories),
      findById: jest.fn((id) => MOCK_RESULTS.oneCategory),
      insert: jest.fn((category) => MOCK_RESULTS.insertedCategory),
      update: jest.fn((id, category) => MOCK_RESULTS.updatedCategory),
      delete: jest.fn((id) => MOCK_RESULTS.updatedCategory),
    }
  };
});

describe('Business categories CRUD - Happy way', () => {

  test("Business findAll categories", async () => {
    const result = await CategoryBusiness.findAll();
  
    expect(result).toBeInstanceOf(Array);
    expect(result).toEqual(MOCK_RESULTS.allCategories);
  });
  
  test("Business findById category", async () => {
    const result = await CategoryBusiness.findById(1);
    expect(result).toEqual(MOCK_RESULTS.oneCategory);
  });

  test("Business insert category ", async () => {
    const result = await CategoryBusiness.insert(MOCK_RESULTS.insertedCategory);
    expect(result).toEqual(MOCK_RESULTS.insertedCategory);
  });

  test("Business update category ", async () => {
    const result = await CategoryBusiness.update(MOCK_RESULTS.updatedCategory.id, MOCK_RESULTS.updatedCategory);
    expect(result).toEqual(MOCK_RESULTS.updatedCategory);
  });

  test("Business delete category ", async () => {
    const result = await CategoryBusiness.delete(MOCK_RESULTS.updatedCategory.id);
    expect(result).toEqual(MOCK_RESULTS.updatedCategory);
  });
});

describe('Business categories CRUD - Sad way', () => {
  jest.mock("../../repository", () => {
    return {
      __esModule: true,
      CategoryRepository: {
        findById: jest.fn((id) => null),
      }
    };
  });
  
  test("Business findById category failed not found", async () => {
    try {
      const result = await CategoryBusiness.findById(-1);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual("Categoria não encontrada");
      expect(error.status).toEqual(404);
    }
  });

  test("Business insert category failed fields validation", async () => {
    try {
      const result = await CategoryBusiness.insert({});
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual("Faltam parâmetros da categoria");
      expect(error.status).toEqual(400);
    }
  });

  test("Business update category failed not found", async () => {
    try {
      const result = await CategoryBusiness.update(-1, MOCK_RESULTS.updatedCategory);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual("Categoria não encontrada");
      expect(error.status).toEqual(404);
    }
  });
  
  test("Business delete category failed not found", async () => {
    try {
      const result = await CategoryBusiness.delete(-1);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual("Categoria não encontrada");
      expect(error.status).toEqual(404);
    }
  });
});