// js/create.js
const form = document.getElementById("create-form"); // Giả sử form có id này
const btnCreate = document.getElementById("btnCreate");
const nameInput = document.getElementById("nameLaptop").value.trim();
const priceInput = document.getElementById("priceLaptop").value.trim();
const descInput = document.getElementById("descriptionLaptop").value.trim();
const imageInput = document.getElementById("imageLaptop").value.trim();
const stockInput = document.getElementById("stockLaptop").value.trim();

if (!nameInput || !priceInput || !imageInput) {
  return alert("Vui lòng nhập các thông tin bắt buộc!");
}

const newProduct = {
  title: nameInput,
  price: Number(priceInput),
  description: descInput,
  thumbnail: imageInput,
  stock: Number(stockInput),
};

Swal.fire({ title: "Đang lưu...", didOpen: () => Swal.showLoading() });

const success = await addProductToFirebase(newProduct);
if (success) {
  Swal.fire({
    title: "Thành công",
    text: "Sản phẩm đã được lưu lên Firebase",
    icon: "success",
  }).then(() => (location.href = "index.html"));
}
