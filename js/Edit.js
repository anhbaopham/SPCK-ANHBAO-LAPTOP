const itemId = JSON.parse(localStorage.getItem("products")) || []; // Lấy mảng sản phẩm từ localStorage
const params = new URLSearchParams(window.location.search); // lấy tham số từ url
const id = Number(params.get("id")); // lấy id từ tham số url
const nameInput = document.getElementById("editTitle");
const descInput = document.getElementById("editDesc");
const priceInput = document.getElementById("editPrice");
const imageInput = document.getElementById("editImg");
const stockInput = document.getElementById("editStock");
const btnSaveChanges = document.getElementById("btnSaveChanges");
// Tìm sản phẩm dựa trên id từ URL
const productsss = itemId.find((p) => p.id === id); // tìm id sản phẩm cần sửa
if (!productsss) {
  Swal.fire({
    icon: "error",
    title: "Không tìm thấy sản phẩm",
    willClose: () => (location.href = "index.html"),
  });
} else {
  // Điền thông tin sản phẩm vào các trường input
  nameInput.value = productsss.title;
  descInput.value = productsss.description;
  priceInput.value = productsss.price;
  imageInput.value = productsss.thumbnail;
  stockInput.value = productsss.stock;
}
btnSaveChanges.addEventListener("click", (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const desc = descInput.value.trim();
  const price = Number(priceInput.value);
  const image = imageInput.value.trim();
  const stock = Number(stockInput.value);
  if (!name || !desc || !price || !image) {
    alert("Vui lòng nhập đầy đủ thông tin");
    return;
  }
  if (isNaN(price) || price <= 0 || isNaN(stock) || stock < 0) {
    alert("Giá hoặc số lượng không hợp lệ");
    return;
  }
  // Cập nhật thông tin sản phẩm
  productsss.title = name;
  productsss.description = desc;
  productsss.price = price.toLocaleString();
  productsss.thumbnail = image;
  productsss.stock = stock;
  // Lưu mảng sản phẩm trở lại localStorage
  localStorage.setItem("products", JSON.stringify(itemId));
  Swal.fire({
    title: "Lưu thay đổi thành công",
    text: "Đang chuyển hướng đến trang chủ...",
    icon: "success",
    willClose: () => {
      window.location.href = "index.html";
    },
  });
});
