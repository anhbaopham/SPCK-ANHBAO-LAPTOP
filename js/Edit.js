// js/Edit.js
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const bgEdit = document.getElementById("bgcreateEdit");
const editTitle = document.getElementById("editTitle");
const editPrice = document.getElementById("editPrice");
const editDesc = document.getElementById("editDesc");
const editImg = document.getElementById("editImg");
const editStock = document.getElementById("editStock");
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
  editTitle.value = product.title || "";
  editPrice.value = product.price || 0;
  editDesc.value = product.description || "";
  editImg.value = product.thumbnail || "";
  editStock.value = product.stock || 0;
  bgEdit.src = product.thumbnail || "";

  editStock.addEventListener("input", async (o) => {
    if (o.target.value < 0) {
      Swal.fire({
        title: "Số lượng không hợp lệ",
        icon: "warning",

        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        backdrop: false,
        toast: true,
        width: "auto", // Để nó tự co giãn theo chữ cho gọn
        padding: "0.8rem",

        // Custom giao diện bằng CSS class
        customClass: {
          popup: "my-pro-toast",
          title: "my-pro-title",
          timerProgressBar: "my-pro-progress",
        },

        // Hiệu ứng mượt mà
        showClass: {
          popup: "animate__animated animate__backInRight",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutRight",
        },
      });
      return (o.target.value = 0);
    }
  });
  editImg.addEventListener("input", async (r) => {
    bgEdit.src = r.target.value;
  });
}

// Xử lý nút lưu thay đổi
document
  .getElementById("btnSaveChanges")
  ?.addEventListener("click", async (e) => {
    e.preventDefault();

    const updatedData = {
      title: editTitle.value,
      price: Number(editPrice.value),
      description: editDesc.value,
      thumbnail: editImg.value,
      stock: Number(editStock.value),
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
