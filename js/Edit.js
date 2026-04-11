// js/Edit.js
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function loadDataToEdit() {
  if (!id) return;

  // Gọi hàm từ product-data.js
  const product = await getProductByIdFromFirebase(id);

  if (!product) {
    return Swal.fire("Lỗi", "Không tìm thấy sản phẩm", "error").then(
      () => (location.href = "index.html"),
    );
  }

  // Đổ dữ liệu vào đúng ID trong file edit.html của bạn
  document.getElementById("editTitle").value = product.title || "";
  document.getElementById("editPrice").value = product.price || 0;
  document.getElementById("editDesc").value = product.description || "";
  document.getElementById("editImg").value = product.thumbnail || "";
  document.getElementById("editStock").value = product.stock || 0;
}

// Xử lý nút lưu thay đổi
document
  .getElementById("btnSaveChanges")
  ?.addEventListener("click", async (e) => {
    e.preventDefault();

    const updatedData = {
      title: document.getElementById("editTitle").value,
      price: Number(document.getElementById("editPrice").value),
      description: document.getElementById("editDesc").value,
      thumbnail: document.getElementById("editImg").value,
      stock: Number(document.getElementById("editStock").value),
    };

    const success = await updateProductInFirebase(id, updatedData);
    if (success) {
      Swal.fire("Thành công", "Đã cập nhật sản phẩm", "success").then(
        () => (location.href = "index.html"),
      );
    }
  });

// Chạy hàm ngay khi load file
loadDataToEdit();
