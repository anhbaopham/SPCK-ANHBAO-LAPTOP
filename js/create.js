const btnCreate = document.getElementById("btnCreateSubmit");
const bgCreate = document.getElementById("bgcreate");
const stockInput = document.getElementById("stockLaptop");
const name = document.getElementById("nameLaptop").value.trim();
const price = document.getElementById("priceLaptop").value.trim();
const desc = document.getElementById("descriptionLaptop").value.trim();
const image = document.getElementById("imageLaptop").value.trim();

if (btnCreate) {
  stockInput.addEventListener("input", async (r) => {
    if (r.target.value < 0) {
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
      return (r.target.value = 0);
    }
  });
  // Hiển thị ảnh preview khi người dùng nhập URL
  const imgInput = document.getElementById("imageLaptop");
  imgInput.addEventListener("input", (o) => {
    const url = o.target.value.trim();
    if (url) {
      bgCreate.src = url;
    } else {
      bgCreate.src = ""; // Xóa ảnh nếu input trống
    }
  });
  btnCreate.addEventListener("click", async (e) => {
    e.preventDefault();

    // Lấy dữ liệu từ các ID có trong create.html

    // Kiểm tra thông tin bắt buộc
    if (!name || !price || !image) {
      return Swal.fire(
        "Lỗi",
        "Vui lòng nhập đầy đủ tên, giá và ảnh sản phẩm!",
        "error",
      );
    }

    const newProduct = {
      title: name,
      price: Number(price),
      description: desc || "",
      thumbnail: image,
      stock: Number(stock) || 0,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(), // Thời gian tạo tự động
    };

    // Hiển thị thông báo đang xử lý
    Swal.fire({
      title: "Đang lưu sản phẩm...",
      didOpen: () => Swal.showLoading(),
    });

    try {
      // Sử dụng hàm addProductToFirebase từ product-data.js (nếu bạn đã nhúng file đó)
      // Hoặc gọi trực tiếp như bên dưới để đảm bảo chạy ngay:
      await firebase.firestore().collection("products").add(newProduct);

      Swal.fire({
        title: "Thành công!",
        text: "Sản phẩm đã được thêm.",
        icon: "success",
      }).then(() => {
        location.href = "index.html"; // Chuyển về trang chủ
      });
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
      Swal.fire("Lỗi", "Không thể thêm sản phẩm: " + error.message, "error");
    }
  });
}
