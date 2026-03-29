var btnSignin = document.getElementById("btnSignin");
var btnSignup = document.getElementById("btnSignup");
var profile = document.getElementById("profile");
var greeting = document.getElementById("greeting");
var btnLogout = document.getElementById("btn-logout");
var loginform = document.getElementById("login-form");
var checkuser = document.getElementById("check-user");
var basicsub = document.getElementById("basic-subscribe");
var prosup = document.getElementById("pro-subscribe");
var enterprisub = document.getElementById("enterprise-subscribe");

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
console.log(currentUser);

// Kiểm tra và cập nhật trạng thái đăng nhập cho header
if (btnSignin && btnSignup && profile && greeting && btnLogout) {
  if (currentUser) {
    // Đã đăng nhập: ẩn nút đăng nhập/đăng ký, hiện profile
    btnSignin.classList.add("hidden");
    btnSignup.classList.add("hidden");
    profile.classList.remove("hidden");
    greeting.innerText = `Xin chào, ${currentUser.email}`;
  } else {
    // Chưa đăng nhập: hiện nút đăng nhập/đăng ký, ẩn profile
    btnSignin.classList.remove("hidden");
    btnSignup.classList.remove("hidden");
    profile.classList.add("hidden");
    greeting.innerText = "";
  }
}

// Kiểm tra và cập nhật trạng thái cho form đăng nhập (nếu có)
if (loginform && checkuser) {
  if (currentUser) {
    // Đã đăng nhập: ẩn form, hiện thông tin user
    loginform.classList.add("hidden");
    checkuser.classList.remove("hidden");
    if (greeting) {
      greeting.innerText = `Xin chào, ${currentUser.email}`;
    }
  } else {
    // Chưa đăng nhập: hiện form, ẩn thông tin user
    loginform.classList.remove("hidden");
    checkuser.classList.add("hidden");
  }
}

// Xử lý đăng xuất
if (btnLogout) {
  btnLogout.addEventListener("click", () => {
    console.log("Logging out....");
    localStorage.removeItem("currentUser");
    window.location.reload();
  });
}

if (basicsub && prosup && enterprisub) {
  if (!currentUser) {
    basicsub.addEventListener("click", () => {
      Swal.fire({
        icon: "error",
        title: "Không tìm thấy sản phẩm",
        text: "Vui lòng đăng nhập để tiếp tục!",
      });
      prosup.addEventListener("click", () => {
        Swal.fire({
          icon: "error",
          title: "Không tìm thấy sản phẩm",
          text: "Vui lòng đăng nhập để tiếp tục!",
        });
        enterprisub.addEventListener("click", () => {
          Swal.fire({
            icon: "error",
            title: "Không tìm thấy sản phẩm",
            text: "Vui lòng đăng nhập để tiếp tục!",
          });
        });
      });
    });
  } else {
    basicsub.addEventListener("click", () => {
      Swal.fire({
        title: "Bạn đã đăng ký gói Basic thành công!",
        icon: "success",
        text: "✅",
      });
    });
    prosup.addEventListener("click", () => {
      Swal.fire({
        title: "Bạn đã đăng ký gói Pro thành công!",
        icon: "success",
        text: "✅",
      });
    });
    enterprisub.addEventListener("click", () => {
      Swal.fire({
        title: "Bạn đã đăng ký gói Enterprise thành công!",
        icon: "success",
        text: "✅",
      });
    });
  }
}
