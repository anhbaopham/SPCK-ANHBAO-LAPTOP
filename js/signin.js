// chờ trang tải xong rồi mới chạy code bên trong
window.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login-form");
  console.log(loginForm);
  //lắng nghe sự kiện submit của form đăng nhập
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault(); //chặn sự kiện submit mặc định của form (chặn reload)
    let email = e.target.email.value;
    let password = e.target.password.value;

    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Chít rùi!",
        text: "Vui lòng nhập đầy đủ thông tin!",
      });
      return;
    }

    //lấy ra dữ liệu trong localStorage
    //chuyển đổi chuỗi JSON thành mảng đối tượng
    let users = JSON.parse(localStorage.getItem("users")) || [];
    //Tìm người dùng với email và mật khẩu đã nhập
    let userExists = users.find(
      (user) => user.email === email && user.password === password
    );
    //nếu không tìm thấy người dùng thì báo lỗi
    if (!userExists) {
      Swal.fire({
        icon: "error",
        title: "Chít rùi!",
        text: "Mật khẩu hoặc email không đúng!",
      });
      return;
    }
    //tạo người dùng mới
    let newUser = {
      email: userExists.email,
      password: userExists.password,
      plan: userExists.plan,
    };
    // lưu người dùng hiện tại vào localStorage
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    Swal.fire({
      title: "Đăng nhập thành công",
      text: "Đang chuyển hướng đến trang chủ...",
      icon: "success",
      //nếu bấm vô nút OK thì chuyển hướng đến trang chủ
      willClose: () => {
        window.location.href = "index.html";
      },
    });
  });
});
const users = JSON.parse(localStorage.getItem("users")) || [];

function login(email, password) {
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    Swal.fire({
      icon: "error",
      title: "Chít rùi!",
      text: "Mật khẩu hoặc email không đúng!",
    });
    return;
  }

  // nếu user chưa có plan thì gán free
  if (!user.plan) {
    user.plan = "free";
  }

  localStorage.setItem("currentUser", JSON.stringify(user));
  location.href = "index.html";
}
