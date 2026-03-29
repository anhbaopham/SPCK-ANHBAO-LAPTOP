const nameInput = document.querySelector("#nameLaptop");
const imageInput = document.querySelector("#imageLaptop");
const descInput = document.querySelector("#descriptionLaptop");
const priceInput = document.querySelector("#priceLaptop");
const stockInput = document.querySelector("#stockLaptop");
const btnCreate = document.querySelector("#btnCreate");

const productList = document.querySelector("#product-list");
const searchBar = document.getElementById("search-bar");

// const sampleProducts = [
//   {
//     id: 1,
//     title: "Macbook Pro 14",
//     description: "Laptop Apple hiệu năng cao",
//     price: 1999,
//     stock: 10,
//     thumbnail:
//       "https://cdn.tgdd.vn/Products/Images/44/303169/apple-macbook.jpg",
//   },
//   {
//     id: 2,
//     title: "Asus Zenbook",
//     description: "Laptop mỏng nhẹ",
//     price: 1499,
//     stock: 20,
//     thumbnail: "https://cdn.tgdd.vn/Products/Images/44/309016/asus.jpg",
//   },
// ];

// // chỉ set khi chưa có dữ liệu
// if (!localStorage.getItem("products")) {
//   localStorage.setItem("products", JSON.stringify(sampleProducts));
// }
//

let products = JSON.parse(localStorage.getItem("products")) || [];

//
function renderProducts(list) {
  if (!productList) return;

  productList.innerHTML = "";

  list.forEach((p) => {
    productList.innerHTML += `
      <div class="card bg-base-100 shadow-md">
        <figure class="p-4">
          <img src="${p.thumbnail}" class="h-40 object-contain">
        </figure>
        <div class="card-body">
          <h2 class="card-title text-sm">${p.title}</h2>
          <p>${p.description}</p>
          <p class="font-bold text-red-500">$${p.price}</p>
          <p>Kho: ${p.stock}</p>
        </div>
      </div>
    `;
  });
}

renderProducts(products);

// tạo sản phẩm mới
if (btnCreate) {
  btnCreate.addEventListener("click", (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const desc = descInput.value.trim();
    const price = priceInput.value.trim();
    const image = imageInput.value.trim();
    const stock = stockInput.value.trim();

    if (!name || !desc || !price || !image || !stock) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (isNaN(price) || price <= 0 || isNaN(stock) || stock < 0) {
      alert("Giá hoặc số lượng không hợp lệ");
      return;
    }

    const newProduct = {
      id: Date.now(),
      title: name,
      description: desc,
      price: Number(price),
      stock: Number(stock),
      thumbnail: image,
    };

    products.push(newProduct);
    console.log(newProduct);
    localStorage.setItem("products", JSON.stringify(products));

    window.location.href = "index.html";
  });
}

// search
if (searchBar) {
  searchBar.addEventListener("input", () => {
    const keyword = searchBar.value.toLowerCase();

    const result = products.filter((p) =>
      p.title.toLowerCase().includes(keyword),
    );

    renderProducts(result);
  });
}
