// chờ trang tải xong rồi mới chạy code bên trong
window.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.querySelector("#signup-form");
  console.log(registerForm);
  //lắng nghe sự kiện submit của form đăng ký
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault(); //chặn sự kiện submit mặc định của form (chặn reload)
    let email = e.target.email.value;
    let password = e.target.password.value;
    let repassword = e.target.rePassword.value;
    console.log(email, password, repassword);

    //regex chữ hoa
    const uppercaseRegex = /[A-Z]/;
    const lowerRegex = /[a-z]/;
    const numberRegex = /[0-9]/;

    if (!email.includes("@gmail.com")) {
      Swal.fire({
        title: "Có gì đó sai sai...",
        text: "Định dạng email không đúng",
        icon: "question",
        footer:
          '<p href="#">Định dạng là <strong>gmail.com</strong> và không có <strong>kí tự đặc biệt</strong></p>',
      });
      return;
    }
    //kiểm tra độ dài mật khẩu
    if (password.length < 6) {
      Swal.fire({
        title: "Có gì đó sai sai...",
        text: "Mật khẩu phải có ít nhất 6 ký tự",
        icon: "question",
      });
      return;
    }
    //kiểm tra mật khẩu có chứa chữ hoa
    if (!uppercaseRegex.test(password)) {
      Swal.fire({
        title: "Có gì đó sai sai...",
        text: "Mật khẩu phải chứa ít nhất một chữ hoa",
        icon: "question",
      });
      return;
    }
    //kiểm tra mật khẩu có chứa chữ thường
    if (!lowerRegex.test(password)) {
      Swal.fire({
        title: "Có gì đó sai sai...",
        text: "Mật khẩu phải chứa ít nhất một chữ thường",
        icon: "question",
      });
      return;
    }
    //kiểm tra mật khẩu có chứa số
    if (!numberRegex.test(password)) {
      Swal.fire({
        title: "Có gì đó sai sai...",
        text: "Mật khẩu phải chứa ít nhất một số",
        icon: "question",
      });
      return;
    }
    //kiểm tra mật khẩu có khớp không
    if (password !== repassword) {
      Swal.fire({
        title: "Có gì đó sai sai...",
        text: "Mật khẩu không khớp",
        icon: "question",
      });
      return;
    }
    //lấy ra dữ liệu trong localStorage
    //chuyển đổi chuỗi JSON thành mảng đối tượng
    let users = JSON.parse(localStorage.getItem("users")) || [];
    //kiểm tra email đã tồn tại chưa
    let isEmailExist = users.some((user) => user.email === email);
    if (isEmailExist) {
      Swal.fire({
        icon: "error",
        title: "Email?",
        text: "Email bị trùng!",
      });
      return;
    }

    const newUser = {
      id: Date.now(),
      email,
      password,
      plan: "free",
    };
    //thêm người dùng mới vào mảng
    users.push(newUser);
    // lưu mảng người dùng trở lại localStorage dưới dạng chuỗi JSON
    localStorage.setItem("users", JSON.stringify(users));

    // nếu tất cả điều kiện đều đúng thì đăng ký thành công
    Swal.fire({
      title: "Đăng ký thành công",
      text: "Đang chuyển hướng đến trang đăng nhập...",
      icon: "success",
      //nếu bấm vô nút OK thì chuyển hướng đến trang đăng nhập
      willClose: () => {
        window.location.href = "signin.html";
      },
    });
  });
});
