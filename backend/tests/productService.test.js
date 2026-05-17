const {
    calculateSafePercentage,
    isValidGlutenStatus,
    isDuplicateProduct
} = require("../services/productService");

describe("calculateSafePercentage", () => {

    test("should return 100 when all products are safe", () => {

        const products = [
            { glutenStatus: "Safe" },
            { glutenStatus: "Safe" }
        ];

        expect(calculateSafePercentage(products)).toBe(100);

    });

    test("should return 50 when half products are safe", () => {

        const products = [
            { glutenStatus: "Safe" },
            { glutenStatus: "Risky" }
        ];

        expect(calculateSafePercentage(products)).toBe(50);

    });

    test("should return 0 when product list is empty", () => {

        expect(calculateSafePercentage([])).toBe(0);

    });
    test("should return true for valid gluten status", () => {

    expect(isValidGlutenStatus("Safe")).toBe(true);

});

test("should return false for invalid gluten status", () => {

    expect(isValidGlutenStatus("Pizza")).toBe(false);

});

});
describe("isDuplicateProduct", () => {

    test("should return true when product with same name and brand exists", () => {

        const products = [
            { name: "Chocolate", brand: "Tadelle" }
        ];

        const newProduct = {
            name: "Chocolate",
            brand: "Tadelle"
        };

        expect(isDuplicateProduct(products, newProduct)).toBe(true);

    });

    test("should return false when product is different", () => {

        const products = [
            { name: "Chocolate", brand: "Tadelle" }
        ];

        const newProduct = {
            name: "Biscuit",
            brand: "Schar"
        };

        expect(isDuplicateProduct(products, newProduct)).toBe(false);

    });

});