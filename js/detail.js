const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));
const buy = document.getElementById("btnBuy");

const products = JSON.parse(localStorage.getItem("products")) || [];
const product = products.find((p) => p.id === id);

if (!product) {
  Swal.fire({
    icon: "error",
    title: "Không tìm thấy sản phẩm",
    willClose: () => (location.href = "index.html"),
  });
} else {
  document.querySelector(".product-title").innerText = product.title;
  document.querySelector(".product-desc").innerText = product.description;
  document.querySelector(".product-image").src = product.thumbnail;
  document.querySelector(".product-price").innerText =
    product.price.toLocaleString() + " đ";
  document.querySelector(".product-stock").innerText =
    "Còn sẵn: " + product.stock.toLocaleString();
}

buy.addEventListener("click", () => {
  Swal.fire({
    title: "Bạn muốn mua sản phẩm này?",
    text: "Chắc chắn chứ?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Mua ngay",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Đã mua!",
        text: "Sản phẩm đang trong quá trình xử lý.",
        icon: "success",
      });
    }
  });
});
