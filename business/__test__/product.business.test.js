const { ProductBusiness } = require("..");
const { ProductRepository } = require("../../repository");

const MOCK_RESULTS = {
  allProducts: [
    {
      id: "3f0d2dd3-6648-4edb-b98c-83af3565a52c",
      name: "Algema metade corrente",
      description: "Pulseira banhada a ouro com garantia de 6 meses",
      imageUrl:
        "https://res.cloudinary.com/dd484lr42/image/upload/v1655776828/DEV/be89hbrxruc75h97iuty.jpg",
      price: 149,
      categoryId: 4,
    },
    {
      id: "3f0d2dd3-6648-4edb-b98c-83af3565a52b",
      name: "Anel",
      description: "Anel banhado a ouro com garantia de 6 meses",
      imageUrl:
        "https://res.cloudinary.com/dd484lr42/image/upload/v1655776828/DEV/be89hbrxruc75h97iuty.jpg",
      price: 199,
      categoryId: 4,
    },
    {
      id: "3f0d2dd3-6648-4edb-b98c-83af3565a52d",
      name: "Corrente",
      description: "Corrente banhada a ouro com garantia de 6 meses",
      imageUrl:
        "https://res.cloudinary.com/dd484lr42/image/upload/v1655776828/DEV/be89hbrxruc75h97iuty.jpg",
      price: 249,
      categoryId: 4,
    },
  ],
  oneProduct: {
    id: "3f0d2dd3-6648-4edb-b98c-83af3565a52c",
    name: "Algema metade corrente",
    description: "Pulseira banhada a ouro com garantia de 6 meses",
    imageUrl:
      "https://res.cloudinary.com/dd484lr42/image/upload/v1655776828/DEV/be89hbrxruc75h97iuty.jpg",
    price: 149,
    categoryId: 4,
  },
  insertedProduct: {
    id: "3f0d2dd3-6648-4edb-b98c-83af3565a52b",
    name: "Anel",
    description: "Anel banhado a ouro com garantia de 6 meses",
    imageUrl:
      "https://res.cloudinary.com/dd484lr42/image/upload/v1655776828/DEV/be89hbrxruc75h97iuty.jpg",
    price: 199,
    categoryId: 4,
  },
  insertedProductWithCategory: {
    id: "3f0d2dd3-6648-4edb-b98c-83af3565a52b",
    name: "Anel",
    description: "Anel banhado a ouro com garantia de 6 meses",
    imageUrl:
      "https://res.cloudinary.com/dd484lr42/image/upload/v1655776828/DEV/be89hbrxruc75h97iuty.jpg",
    price: 199,
    categoryName: "Test",
  },
  insertedProductWithCategoryInvalid: {
    id: "3f0d2dd3-6648-4edb-b98c-83af3565a52b",
    name: "Anel",
    description: "Anel banhado a ouro com garantia de 6 meses",
    imageUrl:
      "https://res.cloudinary.com/dd484lr42/image/upload/v1655776828/DEV/be89hbrxruc75h97iuty.jpg",
    price: 199,
    categoryName: "Test",
    categoryId: 4,
  },
  updatedProduct: {
    id: "3f0d2dd3-6648-4edb-b98c-83af3565a52d",
    name: "Corrente",
    description: "Corrente banhada a ouro com garantia de 6 meses",
    imageUrl:
      "https://res.cloudinary.com/dd484lr42/image/upload/v1655776828/DEV/be89hbrxruc75h97iuty.jpg",
    price: 249,
    categoryId: 4,
  },
};

jest.mock("../../repository", () => {
  return {
    __esModule: true,
    ProductRepository: {
      findAll: jest.fn(() => MOCK_RESULTS.allProducts),
      findById: jest.fn((id) => MOCK_RESULTS.oneProduct),
      insert: jest.fn((product) => MOCK_RESULTS.insertedProduct),
      insertWithCategory: jest.fn((product) => MOCK_RESULTS.insertedProduct),
      update: jest.fn((id, product) => MOCK_RESULTS.updatedProduct),
      delete: jest.fn((id) => MOCK_RESULTS.updatedProduct),
    },
  };
});

afterEach(() => {
    jest.clearAllMocks();
});

describe("Business products CRUD - Happy way", () => {
  test("Business findAll products", async () => {
    const result = await ProductBusiness.findAll();

    expect(result).toBeInstanceOf(Array);
    expect(result).toEqual(MOCK_RESULTS.allProducts);
  });

  test("Business findById product", async () => {
    const result = await ProductBusiness.findById(1);
    expect(result).toEqual(MOCK_RESULTS.oneProduct);
  });

  test("Business insert product ", async () => {
    const result = await ProductBusiness.insert(MOCK_RESULTS.insertedProduct);
    expect(result).toEqual(MOCK_RESULTS.insertedProduct);
  });

  test("Business insert product with category ", async () => {
    const result = await ProductBusiness.insert(MOCK_RESULTS.insertedProductWithCategory);
    
    expect(ProductRepository.insertWithCategory).toBeCalled();
    expect(result).toEqual(MOCK_RESULTS.insertedProduct);
  });

  test("Business update product ", async () => {
    const result = await ProductBusiness.update(
      MOCK_RESULTS.updatedProduct.id,
      MOCK_RESULTS.updatedProduct
    );
    expect(result).toEqual(MOCK_RESULTS.updatedProduct);
  });

  test("Business delete product ", async () => {
    const result = await ProductBusiness.delete(MOCK_RESULTS.updatedProduct.id);
    expect(result).toEqual(MOCK_RESULTS.updatedProduct);
  });
});

describe("Business products CRUD - Sad way", () => {
  jest.mock("../../repository", () => {
    return {
      __esModule: true,
      ProductRepository: {
        findById: jest.fn((id) => null),
      },
    };
  });

  test("Business findById product failed not found", async () => {
    try {
      const result = await ProductBusiness.findById(-1);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual("Produto não encontrado");
      expect(error.status).toEqual(404);
    }
  });

  test("Business insert product failed fields validation", async () => {
    try {
      const result = await ProductBusiness.insert({});
    } catch (error) {
      expect(ProductRepository.insertWithCategory).not.toBeCalled();
      expect(ProductRepository.insert).not.toBeCalled();
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual("Faltam parâmetros do produto");
      expect(error.status).toEqual(400);
    }
  });

  test("Business insert product with category failed fields validation", async () => {
    try {
      const result = await ProductBusiness.insert(MOCK_RESULTS.insertedProductWithCategoryInvalid);
    } catch (error) {
      expect(ProductRepository.insertWithCategory).not.toBeCalled();
      expect(ProductRepository.insert).not.toBeCalled();
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual("O parâmetro de categoria só pode ser ou o 'categoryId' ou o 'categoryName'");
      expect(error.status).toEqual(400);
    }
  });

  test("Business update product failed not found", async () => {
    try {
      const result = await ProductBusiness.update(
        -1,
        MOCK_RESULTS.updatedProduct
      );
    } catch (error) {
      expect(ProductRepository.update).not.toBeCalled();
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual("Produto não encontrado");
      expect(error.status).toEqual(404);
    }
  });

  test("Business delete product failed not found", async () => {
    try {
      const result = await ProductBusiness.delete(-1);
    } catch (error) {
      expect(ProductRepository.delete).not.toBeCalled();
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual("Produto não encontrado");
      expect(error.status).toEqual(404);
    }
  });
});
