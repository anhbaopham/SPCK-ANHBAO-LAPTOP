// Cấu hình chung cho Auth
const auth = firebase.auth();
var provider = new firebase.auth.GoogleAuthProvider();
// 1. Kiểm tra trạng thái đăng nhập & Cập nhật UI

var btnSignin = document.getElementById("btnSignin");
var btnSignup = document.getElementById("btnSignup");
var btnLogout = document.getElementById("btn-logout");
const greeting = document.getElementById("greeting");
const loginForm = document.getElementById("login-form");
const checkUser = document.getElementById("check-user");
const profile = document.getElementById("profile");
const googleLogin = document.getElementById("googleLogin");
const signupForm = document.getElementById("signup-form");
var btnEdit = document.getElementById("btnEdit");
var btnCreate = document.getElementById("btnCreate");
const googleRegister = document.getElementById("googleRegister");
const admingreeting = document.getElementById("admin-greeting");
const textgreeting = document.getElementById("text-greeting");
auth.onAuthStateChanged((user) => {
  if (user) {
    // Trạng thái: ĐÃ ĐĂNG NHẬP
    if (btnSignin) btnSignin.classList.add("hidden");
    if (btnSignup) btnSignup.classList.add("hidden");
    if (btnLogout) btnLogout.classList.remove("hidden");
    if (profile) profile.classList.remove("hidden");
    if (greeting) {
      greeting.classList.remove("hidden");
      greeting.innerText = `Hi, ${user.displayName || user.email}`;
    }
    if (loginForm) loginForm.classList.add("hidden");
    if (checkUser) checkUser.classList.remove("hidden");

    // 2. ĐI KIỂM TRA QUYỀN ADMIN TỪ FIRESTORE
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists && doc.data().role === "admin") {
          // Hiện các nút dành riêng cho Admin
          if (btnEdit) btnEdit.classList.remove("hidden");
          if (btnCreate) btnCreate.classList.remove("hidden");
          if (admingreeting) {
            admingreeting.classList.remove("hidden");
            textgreeting.innerText = `Xin chào Admin ${user.displayName || user.email}`;
          }
        } else {
          // Ẩn các nút Admin nếu người này không phải admin
          if (btnEdit) btnEdit.classList.add("hidden");
          if (btnCreate) btnCreate.classList.add("hidden");
        }
      });
  } else {
    // Trạng thái: ĐĂNG XUẤT
    if (btnSignin) btnSignin.classList.remove("hidden");
    if (btnSignup) btnSignup.classList.remove("hidden");
    if (btnLogout) btnLogout.classList.add("hidden");
    if (profile) profile.classList.add("hidden");
    if (greeting) greeting.classList.add("hidden");
    if (loginForm) loginForm.classList.remove("hidden");
    if (checkUser) checkUser.classList.add("hidden");
  }
});

// 2. Xử lý Đăng ký (nếu đang ở trang signup)

if (signupForm) {
  googleRegister.addEventListener("click", (o) => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // IdP data available in result.additionalUserInfo.profile.
        // ...
        Swal.fire({
          title: "Chào mừng!",
          text: `Đăng nhập thành công, ${user.displayName || user.email}!`,
          icon: "success",
        }).then(() => (location.href = "index.html"));
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  });
  signupForm.addEventListener("submit", (e) => {
    const { email, password } = e.target;
    auth
      .createUserWithEmailAndPassword(email.value, password.value)
      .then(() => {
        Swal.fire("Thành công!", "Tài khoản đã được tạo.", "success").then(
          () => (location.href = "signin.html"),
        );
      })
      .catch((err) => Swal.fire("Lỗi", err.message, "error"));
  });
}

// 3. Xử lý Đăng nhập (nếu đang ở trang signin)

if (loginForm && !signupForm && googleLogin) {
  // Tránh nhầm với form signup
  googleLogin.addEventListener("click", (o) => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // IdP data available in result.additionalUserInfo.profile.
        // ...
        Swal.fire({
          title: "Chào mừng!",
          text: `Đăng nhập thành công, ${user.displayName || user.email}!`,
          icon: "success",
        }).then(() => (location.href = "index.html"));
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        alert("Lỗi đăng nhập Google: " + errorMessage);
      });
  });
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const { email, password } = e.target;
    Swal.fire({
      title: "Đang đăng nhập " + email.value,
      icon: "info",
      didOpen: () => {
        Swal.showLoading();
      },
    });
    auth
      .signInWithEmailAndPassword(email.value, password.value)
      .then(() => {
        Swal.fire({
          title: "Chào mừng!",
          text: "Đăng nhập thành công.",
          icon: "success",
        }).then(() => (location.href = "index.html"));
      })
      .catch((err) => Swal.fire("Lỗi", err.message, "error"));
  });
}

// 4. Xử lý Đăng xuất (dùng chung cho mọi nút logout)
document.addEventListener("click", (e) => {
  if (e.target.id === "btn-logout" || e.target.closest("#btn-logout")) {
    auth.signOut().then(() => {
      Swal.fire("Đã đăng xuất", "", "info").then(() => location.reload());
    });
  }
});
