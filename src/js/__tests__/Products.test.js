import Products from "../Products";

const obj = new Products("Samsung", "10000");

test("Создание продукта", () => {
  expect(obj).toEqual({ name: "Samsung", cost: "10000" });
});
