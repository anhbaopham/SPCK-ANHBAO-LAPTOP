// js/generate-data.js
import { faker } from "https://cdn.skypack.dev/@faker-js/faker";

export function seedProducts(count = 20) {
  const fakeProducts = Array.from({ length: count }, () => ({
    id: Date.now() + Math.random(), // Hoặc dùng faker.string.uuid()
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: Number(faker.commerce.price({ min: 500, max: 2000 })), // Giá USD như code cũ của bạn
    stock: faker.number.int({ min: 1, max: 50 }),
    thumbnail: `https://picsum.photos/seed/${Math.random()}/400/300`, // Dùng Picsum cho ảnh mượt hơn
  }));

  // Lưu vào localStorage để các trang khác (index.html) có thể lấy ra dùng
  localStorage.setItem("products", JSON.stringify(fakeProducts));
  console.log(`${count} sản phẩm giả đã được tạo!`);
}
