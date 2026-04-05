// js/products.js
const productList = document.getElementById("product-list");
const btnEdit = document.querySelector("#btnEdit");
let isEditMode = false;

// Hàm hiển thị sản phẩm ra màn hình
function renderProducts(list) {
  if (!productList) return;
  productList.innerHTML = list
    .map(
      (p) => `
    <div class="card bg-base-100 shadow hover:shadow-lg product-card">
      <figure class="p-4 ${!isEditMode ? "cursor-pointer" : ""}" 
        onclick="${!isEditMode ? `location.href='detail1.html?id=${p.id}'` : ""}">
        <img src="${p.thumbnail}" class="h-40 object-contain w-full" alt="${p.title}" />
      </figure>
      <div class="card-body">
        <h2 class="card-title text-sm line-clamp-1">${p.title}</h2>
        <p class="font-bold text-red-600">${Number(p.price).toLocaleString()} đ</p>
        
        <div class="grid grid-cols-2 gap-2 mt-2 ${isEditMode ? "" : "hidden"}">
          <button class="btn btn-sm btn-warning" onclick="location.href='edit.html?id=${p.id}'">Sửa</button>
          <button class="btn btn-sm btn-error" onclick="deleteProduct('${p.id}')">Xoá</button>
        </div>
      </div>
    </div>
  `,
    )
    .join("");
}

// Hàm khởi tạo trang
async function initPage() {
  const products = await getProductsFromFirebase();
  renderProducts(products);
}

// Xử lý xoá sản phẩm
window.deleteProduct = async (id) => {
  const res = await Swal.fire({
    title: "Xác nhận xoá?",
    text: "Dữ liệu sẽ bị mất vĩnh viễn!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Xoá ngay",
    cancelButtonText: "Huỷ",
  });

  if (res.isConfirmed) {
    const success = await deleteProductFromFirebase(id);
    if (success) {
      Swal.fire("Đã xoá!", "", "success");
      initPage(); // Tải lại danh sách
    }
  }
};

// Bật/Tắt chế độ chỉnh sửa
btnEdit?.addEventListener("click", () => {
  isEditMode = !isEditMode;
  btnEdit.textContent = isEditMode ? "Hoàn tất" : "Chỉnh sửa";
  initPage();
});

initPage();
