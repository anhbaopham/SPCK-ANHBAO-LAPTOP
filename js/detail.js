// js/detail.js
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const productTitle = document.getElementById("product-title");
const productDesc = document.getElementById("product-desc");
const productImage = document.getElementById("product-image");
const productPrice = document.getElementById("product-price");
const productStock = document.getElementById("product-stock");
const btnBuy = document.getElementById("btnBuy");
async function renderDetail() {
  const product = await getProductByIdFromFirebase(id);

  if (!product) {
    return Swal.fire("Lỗi", "Sản phẩm không tồn tại", "error").then(
      () => (location.href = "index.html"),
    );
  }
  productTitle.innerText = product.title;
  productDesc.innerText = product.description;
  productImage.src = product.thumbnail;
  productPrice.innerText = product.price.toLocaleString() + " đ";
  productStock.innerText = "Kho: " + product.stock;
  if (product.stock < 0 || product.stock === 0) {
    btnBuy.disabled = true;
    btnBuy.innerText = "Hết hàng";
  }
}

renderDetail();
