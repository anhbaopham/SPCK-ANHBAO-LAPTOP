// js/products.js
var productList = document.getElementById("product-list");
var btnEdit = document.getElementById("btnEdit");
var isEditMode = false;
let allProducts = [];

// Hàm hiển thị sản phẩm ra màn hình
function renderProducts(list) {
  if (!productList) return;

  productList.innerHTML = list
    .map((p) => {
      // 1. Kiểm tra điều kiện sắp hết hàng (stock từ 1 đến 4)
      const isLowStock = p.stock > 0 && p.stock < 5;

      return `
    <div class="card bg-base-100 shadow hover:shadow-lg product-card border border-base-200">
      <figure class="relative p-4 ${!isEditMode ? "cursor-pointer" : ""}" 
        onclick="${!isEditMode ? `location.href='detail1.html?id=${p.id}'` : ""}">
        
        ${p.stock === 0 ? '<div class="badge badge-error absolute top-2 right-2 font-bold uppercase text-[10px]">Hết hàng</div>' : ""}
        
        <img src="${p.thumbnail}" class="h-40 object-contain w-full" alt="${p.title}" />
      </figure>

      <div class="card-body p-4">
        <h2 class="card-title text-sm line-clamp-1">
          ${p.title} 
          ${isLowStock ? '<div class="badge badge-warning text-[10px]">Sắp hết hàng</div>' : ""}
        </h2> 
        
        <p class="font-bold text-red-600">${Number(p.price).toLocaleString()} đ</p>
        
        <div class="grid grid-cols-2 gap-2 mt-2 ${isEditMode ? "" : "hidden"}">
          <button class="btn btn-sm btn-warning" onclick="location.href='edit.html?id=${p.id}'">Sửa</button>
          <button class="btn btn-sm btn-error" onclick="deleteProduct('${p.id}')">Xoá</button>
        </div>
      </div>
    </div>
  `;
    })
    .join("");
}

// Hàm khởi tạo trang
async function initPage() {
  // search sản phẩm
  allProducts = await getProductsFromFirebase();
  renderProducts(allProducts);
  allProducts.forEach((e) => {
    if (e.stock > 0 && e.stock < 5) {
      const badge = document.getElementById("sold-badge");
      if (badge) {
        badge.classList.remove("hidden");
      }
    } else {
      const badge = document.getElementById("sold-badge");
      if (badge) {
        badge.classList.add("hidden");
      }
    }
  });

  const searchInput = document.getElementById("search-bar");
  const brandSelect = document.getElementById("brand-select");

  if (searchInput) {
    //e.target => lấy giá trị đã nhập trong input | rồi tạo danh sách lọc thông qua keyword
    // includes là bao gồm
    searchInput.addEventListener("input", (e) => {
      const keyword = e.target.value.toLowerCase();
      brandSelect.value = "all"; // reset bộ lọc thương hiệu khi tìm kiếm
      const filtered = allProducts.filter(
        (p) =>
          p.title.toLowerCase().includes(keyword) ||
          p.description.toLowerCase().includes(keyword) ||
          p.price.toString().includes(keyword),
      );
      //sau đó render ra
      renderProducts(filtered);
    });
    brandSelect.addEventListener("change", (t) => {
      const brand = t.target.value;
      searchInput.value = ""; // reset ô tìm kiếm khi chọn lọc thương hiệu
      const filteredBrand =
        brand === "all"
          ? allProducts
          : allProducts.filter((p) => p.brand === brand);
      //Điều kiện ? Giá trị nếu đúng : Giá trị nếu sai;
      renderProducts(filteredBrand);
    });
  }
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
