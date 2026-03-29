const productList = document.getElementById("product-list");
const searchBar = document.getElementById("search-bar");

const btnEdit = document.querySelector("#btnEdit");

let products = JSON.parse(localStorage.getItem("products")) || [];
let isEditMode = false;

// Dữ liệu sản phẩm
let productS = [
  {
    id: 1,
    title: "Samsung Galaxy Book3 360 15 (2023)",
    description:
      "Laptop 2-trong-1 cao cấp với màn hình cảm ứng 15.6 inch FHD xoay gập 360 độ linh hoạt. Được trang bị bộ vi xử lý Intel Core i7-1360P thế hệ 13 mạnh mẽ, RAM 16GB và SSD 512GB cho hiệu suất đa nhiệm và khởi động ứng dụng nhanh chóng. Thiết kế mỏng nhẹ, thời thượng, hoàn hảo cho cả công việc sáng tạo và giải trí.",
    category: "laptops",
    price: 17990000,
    stock: 12,
    tags: ["samsung", "2-in-1"],
    brand: "Samsung",
    sku: "LAP-SAM-001",
    thumbnail:
      "https://mac24h.vn/images/detailed/94/samsung_galaxy_book_3_pro_14_inch_graphite_mac24h_y9hx-ci.png",
  },
  {
    id: 2,
    title: "Samsung Galaxy Book3 360 13 (2023)",
    description:
      "Laptop 2-trong-1 gọn nhẹ với màn hình AMOLED 13.3 inch hiển thị màu sắc sống động và tương phản sâu. Trang bị chip Intel Core i7-1360P, RAM 16GB và ổ cứng SSD 512GB, mang đến trải nghiệm mượt mà cho các tác vụ văn phòng, đồ họa cơ bản và giải trí đa phương tiện.",
    category: "laptops",
    price: 17990000,
    stock: 10,
    tags: ["samsung", "amoled"],
    brand: "Samsung",
    sku: "LAP-SAM-002",
    thumbnail:
      "https://lapvip.vn/upload/products/thumb_350x0/samsung-galaxy-book3-360-13-2023-1695457355.jpg",
  },
  {
    id: 3,
    title: "Acer Swift AI",
    description:
      "Laptop hiệu năng AI với chip Intel Core Ultra 7 tiên tiến, được tối ưu hóa cho các tác vụ trí tuệ nhân tạo. Sở hữu màn hình OLED 14 inch độ phân giải 3K sắc nét, RAM 32GB dung lượng lớn và ổ cứng SSD 1TB siêu tốc, lý tưởng cho lập trình viên, nhà phân tích dữ liệu và người dùng sáng tạo chuyên nghiệp.",
    category: "laptops",
    price: 17990000,
    stock: 8,
    tags: ["acer", "oled"],
    brand: "Acer",
    sku: "LAP-ACE-003",
    thumbnail: "https://anphat.com.vn/media/product/50928_swift_ai_sf14_51.jpg",
  },
  {
    id: 4,
    title: "MacBook Pro 14 M4 (2024)",
    description:
      "MacBook Pro thế hệ mới với sức mạnh đột phá từ chip Apple M4. Máy được trang bị RAM 16GB thống nhất, ổ cứng SSD 512GB tốc độ cao và màn hình Liquid Retina XDR 14.2 inch với công nghệ ProMotion. Hiệu năng xử lý đồ họa, render video và phát triển phần mềm vượt trội, hoàn hảo cho các chuyên gia.",
    category: "laptops",
    price: 17990000,
    stock: 6,
    tags: ["apple", "macbook"],
    brand: "Apple",
    sku: "LAP-APP-004",
    thumbnail:
      "https://lapvip.vn/upload/filters_img/thumb_350x0/1144-0-1733283419.jpg",
  },
  {
    id: 5,
    title: "Acer Aspire 7 Gaming",
    description:
      "Laptop gaming phổ thông hiệu suất ổn định, được trang bị CPU Intel Core i5-12450H và card đồ họa rời NVIDIA GeForce RTX 3050. Đi kèm màn hình 15.6 inch FHD tần số quét 144Hz mượt mà, RAM 16GB và SSD 512GB, mang đến trải nghiệm chơi game và làm việc đồ họa mượt mà ở mức giá hợp lý.",
    category: "gaming-laptops",
    price: 18690000,
    stock: 9,
    tags: ["gaming", "acer"],
    brand: "Acer",
    sku: "LAP-ACE-005",
    thumbnail:
      "https://anphat.com.vn/media/product/45836_acer_aspire_7_a715_76g_5806___nh_qmfsv_002_3s1.jpg",
  },
  {
    id: 6,
    title: "MSI Prestige 14 AI Evo",
    description:
      "Laptop doanh nhân và sáng tạo cao cấp với chứng nhận Intel Evo, đảm bảo hiệu suất nhanh, thời lượng pin lâu và khả năng thức giấc tức thì. Máy sở hữu màn hình OLED 2.8K tuyệt đẹp, chip Intel Core Ultra 5 và RAM 16GB, thiết kế mỏng nhẹ và chuyên nghiệp.",
    category: "laptops",
    price: 23990000,
    stock: 7,
    tags: ["msi", "oled"],
    brand: "MSI",
    sku: "LAP-MSI-006",
    thumbnail:
      "https://anphat.com.vn/media/product/51571_laptop_msi_prestige_14_ai_evo_c1mg_081vn__4_.jpg",
  },
  {
    id: 7,
    title: "MSI Vector 16",
    description:
      "Laptop gaming flagship với cấu hình khủng: Bộ vi xử lý Intel Core Ultra 9, card đồ họa NVIDIA GeForce RTX 5080 mạnh mẽ nhất và màn hình QHD+ 16 inch với tần số quét 240Hz siêu mượt. RAM 32GB và bộ tản nhiệt nâng cao, tối ưu cho game thủ và streamer chuyên nghiệp.",
    category: "gaming-laptops",
    price: 63990000,
    stock: 4,
    tags: ["gaming", "msi"],
    brand: "MSI",
    sku: "LAP-MSI-007",
    thumbnail:
      "https://anphat.com.vn/media/product/51440_laptop_msi_vector_16_hx_ai_a2xwig_062vn__1_.jpg",
  },
  {
    id: 8,
    title: "ASUS ROG 18",
    description:
      "Quái vật gaming ASUS ROG với màn hình 18 inch cực lớn, mang trải nghiệm sống động nhất. Cấu hình đỉnh với CPU Intel Core Ultra 9 và GPU NVIDIA GeForce RTX 5070 Ti, kết hợp RAM 32GB, đảm bảo hiệu năng vượt trội ở mọi tựa game AAA hay tác vụ render 3D nặng.",
    category: "gaming-laptops",
    price: 62990000,
    stock: 3,
    tags: ["asus", "gaming"],
    brand: "ASUS",
    sku: "LAP-ASU-008",
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRHi4vrIdNAOdjO2HRhEhoqTUe_cuVf1NtcbHvVuPBkafAm2PFwmPtsQQBot6CEwvy5aHQ8phmZYx2Mbp7q-xDEJOdVZXSEyGMX0cWSwpUPSAvuaDSf5BZQfA",
  },
  {
    id: 9,
    title: "Lenovo ThinkPad X13 Gen 6",
    description:
      "Laptop doanh nhân kinh điển với độ bền và bảo mật hàng đầu, đạt chuẩn quân đội MIL-STD. Phiên bản Gen 6 được nâng cấp với chip Intel Core Ultra 5, RAM 32GB, ổ lưu trữ tốc độ cao và màn hình 13.3 inch WUXGA sắc nét, hoàn hảo cho các chuyên gia thường xuyên di chuyển.",
    category: "laptops",
    price: 32590000,
    stock: 5,
    tags: ["lenovo", "business"],
    brand: "Lenovo",
    sku: "LAP-LEN-009",
    thumbnail:
      "https://anphat.com.vn/media/product/53629_laptop_lenovo_thinkpad_x13_gen_6_21rk00alva__2_.jpg",
  },
  {
    id: 10,
    title: "ASUS Vivobook S14",
    description:
      "Laptop mỏng nhẹ và thanh lịch dành cho học sinh, sinh viên. Trang bị CPU Intel Core i5-13420H vừa phải, RAM 16GB và SSD 512GB, cân bằng tốt giữa hiệu năng và thời lượng pin. Thiết kế trẻ trung, gọn nhẹ, phù hợp với nhu cầu học tập và giải trí hàng ngày.",
    category: "laptops",
    price: 16999000,
    stock: 14,
    tags: ["asus", "student"],
    brand: "ASUS",
    sku: "LAP-ASU-010",
    thumbnail:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcT-yMv95vd5stiFcXaGrm92MjFMZsrSk85LBW7OdAFrJ8xBSMQ6rTraeGA8_oN36Iims9_1vZlR6veAi7n0xHlqb31VGB9mMQ",
  },
  {
    id: 10865,
    title: "Samsung Galaxy Book3 360 15 (2023)",
    description:
      "Máy tính xách tay 2-trong-1 cao cấp từ Samsung với màn hình cảm ứng Full HD 15.6 inch, độ sáng cao và góc nhìn rộng. Được trang bị vi xử lý Intel Core i7-1360P thế hệ 13, kết hợp với RAM 16GB và ổ cứng SSD 512GB NVMe, mang lại hiệu suất ấn tượng cho công việc sáng tạo, học tập và giải trí. Thiết kế bản lề xoay 360 độ linh hoạt.",
    category: "laptops",
    price: 17990000,
    stock: 10,
    brand: "Samsung",
    thumbnail:
      "https://mac24h.vn/images/detailed/93/samsung-galaxy-book3-pro-14-inch-1-600x600_f3ge-yp.png",
    sku: "LAP-SAM-001",
  },
  {
    id: 2,
    title: "Samsung Galaxy Book3 360 13 (2023)",
    description:
      "Phiên bản nhỏ gọn hơn với màn hình AMOLED 13.3 inch, cho màu đen sâu, độ tương phản cực cao và tiết kiệm năng lượng. Vẫn giữ nguyên sức mạnh từ chip Intel Core i7-1360P, RAM 16GB và SSD 512GB. Lựa chọn hoàn hảo cho người dùng ưu tiên khả năng di động và chất lượng hiển thị hình ảnh xuất sắc.",
    category: "laptops",
    price: 17990000,
    stock: 8,
    brand: "Samsung",
    thumbnail:
      "https://lapvip.vn/upload/products/thumb_350x0/samsung-galaxy-book3-360-13-2023-1695457355.jpg",
    sku: "LAP-SAM-002",
  },
  {
    id: 3,
    title: "Laptop ACER Swift AI",
    description:
      "Laptop sáng tạo và xử lý AI chuyên dụng với bộ vi xử lý Intel Core Ultra 7 258V tiên tiến. Máy có cấu hình mạnh mẽ với RAM 32GB và ổ cứng SSD 1TB, kết hợp màn hình OLED 14 inch độ phân giải 3K tuyệt đẹp, phù hợp cho các tác vụ chỉnh sửa ảnh/video, lập trình phức tạp và nghiên cứu dữ liệu.",
    category: "laptops",
    price: 17990000,
    stock: 6,
    brand: "Acer",
    thumbnail: "https://anphat.com.vn/media/product/50928_swift_ai_sf14_51.jpg",
    sku: "LAP-ACE-003",
  },
  {
    id: 4,
    title: "Macbook Pro 14 M4 2024",
    description:
      "Laptop chuyên nghiệp đỉnh cao của Apple với chip M4 tùy chỉnh, mang lại hiệu năng CPU và GPU vượt bậc. Máy được trang bị RAM 16GB thống nhất, SSD 512GB siêu nhanh và màn hình Liquid Retina XDR 14.2 inch với công nghệ ProMotion 120Hz. Tối ưu cho các ứng dụng sáng tạo chuyên nghiệp như Final Cut Pro, Xcode và Adobe Creative Suite.",
    category: "laptops",
    price: 17990000,
    stock: 12,
    brand: "Apple",
    thumbnail:
      "https://lapvip.vn/upload/filters_img/thumb_350x0/1144-0-1733283419.jpg",
    sku: "LAP-APP-004",
  },
  {
    id: 5,
    title: "Laptop Gaming Acer Aspire 7",
    description:
      "Lựa chọn gaming tầm trung đáng giá với cấu hình cân bằng: CPU Intel Core i5-12450H và GPU NVIDIA GeForce RTX 3050. Điểm nhấn là màn hình 15.6 inch Full HD với tần số quét 144Hz cho chuyển động mượt mà, kết hợp RAM 16GB và SSD 512GB. Thiết kế mang phong cách gaming nhưng vẫn tinh tế, phù hợp với cả chơi game và làm việc.",
    category: "laptops",
    price: 18690000,
    stock: 7,
    brand: "Acer",
    thumbnail:
      "https://anphat.com.vn/media/product/45836_acer_aspire_7_a715_76g_5806___nh_qmfsv_002_3s1.jpg",
    sku: "LAP-ACE-005",
  },
  {
    id: 78,
    title: "Apple MacBook Pro 14 Inch Space Grey",
    description:
      "MacBook Pro 14 inch phiên bản Space Grey sang trọng, trang bị chip Apple M1 Pro với CPU 8 lõi và GPU 14 lõi mang lại hiệu năng đột phá. Màn hình Liquid Retina XDR với công nghệ mini-LED cho độ sáng và độ tương phản siêu việt. Thiết kế nguyên khối bằng nhôm, hoàn hảo cho các chuyên gia sáng tạo, lập trình viên và doanh nhân.",
    category: "laptops",
    price: 49990000,
    stock: 24,
    tags: ["laptops", "apple"],
    brand: "Apple",
    sku: "LAP-APP-APP-078",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQObRX60-qe_s8P8qRGx-WCk5RBp9CE-f3bPFpo3qF9XoGDe_B6ihoZbgHMoVk-ip2aXZ8HpN8w05mHMIb4hjjogA2Y_5G2",
  },
  {
    id: 79,
    title: "Asus Zenbook Pro Dual Screen Laptop",
    description:
      "Laptop sáng tạo đột phá với màn hình phụ ScreenPad Plus 14 inch, mở rộng không gian làm việc và tăng cường hiệu suất đa nhiệm. Được trang bị cấu hình phần cứng mạnh mẽ (thông tin cụ thể cần bổ sung), phù hợp với các editor video, nhà thiết kế đồ họa và nhạc sĩ cần nhiều không gian hiển thị và điều khiển ứng dụng cùng lúc.",
    category: "laptops",
    price: 44990000,
    discountPercentage: 11.14,
    rating: 3.95,
    stock: 45,
    tags: ["laptops"],
    brand: "Asus",
    thumbnail:
      "https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/thumbnail.webp",
  },
  {
    id: 80,
    title: "Huawei Matebook X Pro",
    description:
      "The Huawei Matebook X Pro is a slim and stylish laptop with a high-resolution touchscreen display, offering a premium experience for users on the go.",
    category: "laptops",
    price: 34990000,
    discountPercentage: 9.38,
    rating: 4.98,
    stock: 75,
    tags: ["laptops"],
    brand: "Huawei",
    sku: "LAP-HUA-HUA-080",
    weight: 9,
    dimensions: { width: 18.21, height: 22.83, depth: 17.26 },
    warrantyInformation: "No warranty",
    shippingInformation: "Ships overnight",
    availabilityStatus: "In Stock",
    reviews: [
      {
        rating: 4,
        comment: "Very satisfied!",
        date: "2025-04-30T09:41:02.053Z",
        reviewerName: "Evan Wright",
        reviewerEmail: "evan.wright@x.dummyjson.com",
      },
      {
        rating: 4,
        comment: "Very happy with my purchase!",
        date: "2025-04-30T09:41:02.053Z",
        reviewerName: "Hunter Gordon",
        reviewerEmail: "hunter.gordon@x.dummyjson.com",
      },
      {
        rating: 1,
        comment: "Not worth the price!",
        date: "2025-04-30T09:41:02.053Z",
        reviewerName: "William Gonzalez",
        reviewerEmail: "william.gonzalez@x.dummyjson.com",
      },
    ],
    returnPolicy: "60 days return policy",
    minimumOrderQuantity: 1,
    meta: {
      createdAt: "2025-04-30T09:41:02.053Z",
      updatedAt: "2025-04-30T09:41:02.053Z",
      barcode: "0592296671061",
      qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
    },
    images: [
      "https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/1.webp",
      "https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/2.webp",
      "https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/3.webp",
    ],
    thumbnail:
      "https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/thumbnail.webp",
  },
  {
    id: 81,
    title: "Lenovo Yoga 920",
    description:
      "The Lenovo Yoga 920 is a 2-in-1 convertible laptop with a flexible hinge, allowing you to use it as a laptop or tablet, offering versatility and portability.",
    category: "laptops",
    price: 1099.99,
    discountPercentage: 6.55,
    rating: 2.86,
    stock: 40,
    tags: ["laptops"],
    brand: "Lenovo",
    sku: "LAP-LEN-LEN-081",
    weight: 9,
    dimensions: { width: 20.84, height: 22.68, depth: 17.39 },
    warrantyInformation: "6 months warranty",
    shippingInformation: "Ships in 2 weeks",
    availabilityStatus: "In Stock",
    reviews: [
      {
        rating: 4,
        comment: "Would buy again!",
        date: "2025-04-30T09:41:02.053Z",
        reviewerName: "Bella Gonzalez",
        reviewerEmail: "bella.gonzalez@x.dummyjson.com",
      },
      {
        rating: 5,
        comment: "Great value for money!",
        date: "2025-04-30T09:41:02.053Z",
        reviewerName: "Nathan Reed",
        reviewerEmail: "nathan.reed@x.dummyjson.com",
      },
      {
        rating: 4,
        comment: "Great value for money!",
        date: "2025-04-30T09:41:02.053Z",
        reviewerName: "Hazel Gardner",
        reviewerEmail: "hazel.gardner@x.dummyjson.com",
      },
    ],
    returnPolicy: "No return policy",
    minimumOrderQuantity: 1,
    meta: {
      createdAt: "2025-04-30T09:41:02.053Z",
      updatedAt: "2025-04-30T09:41:02.053Z",
      barcode: "5506742916764",
      qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
    },
    images: [
      "https://cdn.dummyjson.com/product-images/laptops/lenovo-yoga-920/1.webp",
      "https://cdn.dummyjson.com/product-images/laptops/lenovo-yoga-920/2.webp",
      "https://cdn.dummyjson.com/product-images/laptops/lenovo-yoga-920/3.webp",
    ],
    thumbnail:
      "https://cdn.dummyjson.com/product-images/laptops/lenovo-yoga-920/thumbnail.webp",
  },
  {
    id: 82,
    title: "New DELL XPS 13 9300 Laptop",
    description:
      "Dell XPS 13 9300 - biểu tượng của laptop siêu di động với màn hình InfinityEdge viền cực mỏng, tối đa hóa diện tích hiển thị. Được chế tác từ nhôm và sợi carbon cao cấp, vừa bền bỉ vừa nhẹ. Trang bị bộ vi xử lý Intel thế hệ mới (thông tin cụ thể cần bổ sung) và màn hình cảm ứng tùy chọn, là người bạn đồng hành lý tưởng cho giới doanh nhân và người dùng cao cấp.",
    category: "laptops",
    price: 37490000,
    discountPercentage: 11.89,
    rating: 2.67,
    stock: 74,
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQRaU7D2u7jAE6t_V6DRIrcQHibOYIkj5PlKRkDMoe_wci2UMnurosGlnFLsa6vbwJ3j1ByddXrsvi8goMsHynXdo2sySx_pA",
  },
  {
    id: 1,
    title: "Samsung Galaxy Book3 360 15",
    description:
      "Laptop 2-trong-1 đa năng với màn hình cảm ứng 15.6 inch FHD xoay gập 360 độ linh hoạt. Trang bị chip Intel Core™ i7-1360P thế hệ 13 mạnh mẽ, RAM 16GB và SSD 512GB cho hiệu suất đa nhiệm vượt trội. Thiết kế mỏng nhẹ, thời thượng với khung máy chắc chắn, pin bền bỉ, phù hợp cho cả công việc văn phòng, học tập và giải trí.",
    category: "laptops",
    price: 17990000,
    thumbnail:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQYGmz26TN9ygBdQRBzYgmEqMX-5QDx6-fJ8Qm2aQqHgkFDqv9zj08827BgLDIuClqMh8Drm5a-qVYsogFoknytuYwkqqUZCcgpXeVq5Rb-hCSVdJ0p00AWfg",
    stock: 15,
    tags: ["laptops", "samsung", "2-in-1"],
    brand: "Samsung",
    sku: "SAM-GB3-360",
  },
  {
    id: 2,
    title: "Macbook Pro 14 M4 2024",
    description:
      "MacBook Pro 14 inch thế hệ mới với chip Apple M4 (10 lõi CPU, 10 lõi GPU) mang lại hiệu năng đồ họa đỉnh cao cho người dùng chuyên nghiệp. Máy được trang bị RAM 16GB thống nhất, SSD 512GB tốc độ cao và màn hình Liquid Retina XDR với công nghệ ProMotion. Tối ưu cho các tác vụ nặng như render video 4K/8K, phát triển ứng dụng và thiết kế đồ họa 3D.",
    category: "laptops",
    price: 39990000,
    thumbnail:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRxx67rVAKim7wk_1A3n5rvSqNKGKU3QgZGpxPxGSG01zB-1YJYDiR9HboxYjUn3dtW_prh26-SKkkxHoExAE_SRBAHAMBQ",
    stock: 20,
    tags: ["laptops", "apple", "macbook", "m4"],
    brand: "Apple",
    sku: "APP-MBP-14-M4",
  },
  {
    id: 3,
    title: "Asus ROG Strix G18 2025",
    description:
      "Quái vật gaming với màn hình 18 inch 240Hz cực đại, mang lại trải nghiệm chơi game sống động và mượt mà tuyệt đối. Cấu hình khủng với CPU Intel Core Ultra 9, GPU NVIDIA GeForce RTX 5070 Ti, RAM 32GB và SSD 1TB. Hệ thống tản nhiệt mới với công nghệ kim loại lỏng, đảm bảo hiệu năng ổn định ngay cả trong những phiên gaming marathon.",
    category: "laptops",
    price: 62990000,
    thumbnail:
      "https://macmall.vn/uploads/asus_rog_strix_g18_macmallvn_(5)_1767080238.png",
    stock: 5,
    tags: ["laptops", "gaming", "asus", "rog"],
    brand: "ASUS",
    sku: "ASU-ROG-G18",
  },
  {
    id: 4,
    title: "Dell XPS 13 9340",
    description:
      "Laptop ultrabook sang trọng hàng đầu với thiết kế viền vô cực siêu mỏng, định nghĩa lại sự tinh tế. Trang bị bộ vi xử lý Intel Ultra 7 155H mạnh mẽ, RAM 16GB LPDDR5x và SSD 1TB PCIe Gen4. Màn hình InfinityEdge 13.4 inch với tùy chọn OLED 3.5K, hoàn hảo cho doanh nhân và người dùng sáng tạo coi trọng thiết kế và hiệu suất.",
    category: "laptops",
    price: 42500000,
    thumbnail:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ0a3jen4dkyDdmeWSm7hSdoDg2V8f7Cd1r3xrIHOYUsg8S3nOWizijyMnQm808ISQF9Pv7g8hmw4OzZXvCJFKgkG8wD1DshZ8b8D5K2H7mJVCPiB0gnZ7wu9M",
    stock: 8,
    tags: ["laptops", "dell", "xps", "ultrabook"],
    brand: "Dell",
    sku: "DEL-XPS-13",
  },
  {
    id: 5,
    title: "HP Spectre x360 14",
    description:
      "Laptop văn phòng cao cấp nhất của HP với thiết kế 2-trong-1 tinh xảo. Trang bị chip Intel Core Ultra 7 mới nhất, RAM 32GB và SSD 1TB tốc độ cao. Màn hình OLED 2.8K 14 inch với tỷ lệ 16:10, độ sáng cao và màu sắc chính xác, hỗ trợ bút cảm ứng HP Pen. Hoàn hảo cho các chuyên gia cần sự linh hoạt và hiệu suất đỉnh cao.",
    category: "laptops",
    price: 38500000,
    thumbnail:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSR41ljV9lI7VXca6Dhahcq9xDZYhTsYsa79ix4EaFf2OTlB_LMZyn2Ra5PCpiVSUI0dk55Uld0GG8rDpGHxwmnweUv9ly7qA",
    stock: 10,
    tags: ["laptops", "hp", "spectre", "oled"],
    brand: "HP",
    sku: "HP-SPEC-14",
  },
  {
    id: 6,
    title: "Lenovo Legion Pro 7i",
    description:
      "Laptop gaming hiệu năng đỉnh với khả năng tản nhiệt vượt trội, cân mọi tựa game AAA. Trang bị CPU Intel Core i9-14900HX, GPU NVIDIA GeForce RTX 4080 mạnh mẽ, RAM 32GB DDR5 và SSD 1TB. Màn hình 16 inch WQXGA với tần số quét 240Hz và độ phủ màu 100% sRGB. Thiết kế hầm hố với đèn LED RGB Legion Spectrum.",
    category: "laptops",
    price: 55900000,
    thumbnail: "https://sazo.vn/storage/products/y9000p-2025/1-1.png",
    stock: 4,
    tags: ["laptops", "gaming", "lenovo", "legion"],
    brand: "Lenovo",
    sku: "LEN-LEG-P7",
  },
  {
    id: 7,
    title: "Microsoft Surface Pro 11 AI",
    description:
      "Thế hệ Surface Pro mới tích hợp chip Qualcomm Snapdragon X Elite chuyên dụng cho xử lý AI, mang lại hiệu suất vượt trội và thời lượng pin cực dài lên tới 20 giờ. Thiết kế 2-trong-1 với bàn phím tháo rời và bút Surface Pen, màn hình 13 inch PixelSense Flow với tần số quét 120Hz. Hoàn hảo cho người dùng di động cần sức mạnh AI và tính linh hoạt.",
    category: "laptops",
    price: 34900000,
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTX9GioV6VrGPLyPYZ25-G45m1A7-Keke2SucikcFw6nuhP0TjN0G64wVyfjJmXS9Q206vD_pmNwXebKxVzgQpIbCZXfK38NznxG4rVIfYrPRk5vmgLO2mw",
    stock: 12,
    tags: ["laptops", "surface", "microsoft", "ai"],
    brand: "Microsoft",
    sku: "MS-SUR-P11",
  },
  {
    id: 8,
    title: "Acer Predator Helios Neo 16",
    description:
      "Laptop gaming với thiết kế đậm chất gaming với các ký tự ẩn hiện độc đáo trên nắp máy. Trang bị CPU Intel Core i7-13700HX, GPU NVIDIA GeForce RTX 4060, RAM 16GB DDR5 và SSD 1TB. Màn hình 16 inch WQXGA 165Hz với công nghệ Acer ComfyView, hệ thống tản nhiệt Predator FrostBlade 4.0 giữ cho máy luôn mát mẻ khi gaming cường độ cao.",
    category: "laptops",
    price: 29990000,
    thumbnail:
      "https://huynhlongstore.com/wp-content/uploads/2024/04/Acer-Predator-Helios-Neo-16.png",
    stock: 15,
    tags: ["laptops", "gaming", "acer", "predator"],
    brand: "Acer",
    sku: "ACE-PRED-NEO",
  },
  {
    id: 9,
    title: "MSI Stealth 14 Studio",
    description:
      "Laptop gaming nhưng mỏng nhẹ như văn phòng với vỏ nhôm magie cao cấp. Trang bị CPU Intel Core i7-13620H và GPU NVIDIA GeForce RTX 4060, cân bằng giữa hiệu năng và tính di động. Màn hình 14 inch QHD+ 240Hz với độ chính xác màu sắc cao, phù hợp cho cả chơi game và làm việc sáng tạo. Thiết kế tối giản, chuyên nghiệp.",
    category: "laptops",
    price: 32900000,
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRAbVy0iwnXa85uaCv_Z15k7hrGvF2LwDytpcuD4YnGeM06nJ31ZuuUxj3NpiQsmGt9oy8RYOugxXgtZo4Y8efdXnD4JkczeVB7IBbLzbXqR_TkIpHEvhbPSQ",
    stock: 6,
    tags: ["laptops", "gaming", "msi", "stealth"],
    brand: "MSI",
    sku: "MSI-STE-14",
  },
  {
    id: 10,
    title: "LG Gram Pro 17 2024",
    description:
      "Laptop siêu nhẹ 17 inch với trọng lượng chỉ 1.2kg, phá vỡ mọi giới hạn về tính di động. Trang bị chip Intel Core Ultra 7, RAM 16GB LPDDR5X và SSD 1TB. Màn hình IPS 17 inch WQXGA với độ sáng cao và độ phủ màu DCI-P3 99%, hoàn hảo cho các chuyên gia cần màn hình lớn nhưng phải cực kỳ nhẹ để mang theo.",
    category: "laptops",
    price: 36500000,
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTOfBW6Ymnjl9IARYwMGAL-aCUDSlH_o-IIT2BpG0P31cAeafxEkMMVBYYB93wsOUWcg8GXsm0yxt53rVJziFqTVfQuWgZCJph1lglQfAzH8HMdXkSScGtS",
    stock: 7,
    tags: ["laptops", "lg", "gram", "lightweight"],
    brand: "LG",
    sku: "LG-GR-PRO17",
  },
  {
    id: 11,
    title: "Razer Blade 16",
    description:
      "Đỉnh cao của giới laptop Windows với hoàn thiện cực kỳ tinh xảo từ khối nhôm nguyên khối CNC. Trang bị cấu hình tối thượng: CPU Intel Core i9-14900HX, GPU NVIDIA GeForce RTX 4090 và RAM 32GB. Màn hình Dual Mode 16 inch có thể chuyển đổi giữa UHD+ 120Hz và FHD+ 240Hz. Lựa chọn hàng đầu cho game thủ và creator đòi hỏi sự hoàn hảo.",
    category: "laptops",
    price: 95000000,
    thumbnail:
      "https://lapvip.vn/upload/products/thumb_350x0/razer-blade-16-2025-1743059447.png",
    stock: 2,
    tags: ["laptops", "gaming", "razer", "luxury"],
    brand: "Razer",
    sku: "RAZ-BL-16",
  },
  {
    id: 12,
    title: "Gigabyte Aorus 15 2024",
    description:
      "Laptop gaming với màn hình QHD 165Hz màu sắc cực chuẩn, phù hợp cho cả gaming và đồ họa. Trang bị CPU Intel Core i7-13700H, GPU NVIDIA GeForce RTX 4070 và RAM 16GB DDR5. Công nghệ tản nhiệt Windforce Infinity với 2 quạt 5 ống nhiệt, đảm bảo hiệu năng ổn định. Bàn phím AORUS RGB với switch cơ học tùy chọn.",
    category: "laptops",
    price: 35900000,
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQmj3IJBjB13GJt9B7k-0Md4mzLE2-PzC_zcg8yrAWRFbMQR2nBBV3pl_8gT9uX6cPZJ3Lp-OuPemxu1Oyr-lfsM-Dk43EM",
    stock: 9,
    tags: ["laptops", "gaming", "gigabyte", "aorus"],
    brand: "Gigabyte",
    sku: "GIG-AOR-15",
  },
  {
    id: 13,
    title: "Samsung Galaxy Book4 Ultra",
    description:
      "Sự kết hợp hoàn hảo giữa hiệu năng của máy gaming và sự mỏng nhẹ của ultrabook. Trang bị CPU Intel Core Ultra 9, GPU NVIDIA GeForce RTX 4070, RAM 32GB và SSD 1TB. Màn hình Dynamic AMOLED 2X 16 inch với độ sáng cao và công nghệ Vision Booster. Thiết kế sang trọng từ hợp kim nhôm, phù hợp với mọi môi trường làm việc.",
    category: "laptops",
    price: 49900000,
    thumbnail:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQiYZRAZfyPnzPICY6uHYLTsOambl33QE5YaGwoVnYbs7TS7R4vWa389Zc4wC66Rgt8X4r3g2a_GsyT6z0h3gBqLxKErRVf4Y7U2f-BhEJYRA3SF1Ta5mgpcA",
    stock: 5,
    tags: ["laptops", "samsung", "ultra"],
    brand: "Samsung",
    sku: "SAM-GB4-ULT",
  },
  {
    id: 14,
    title: "Macbook Air 13 M3 2024",
    description:
      "MacBook Air siêu mỏng nhẹ với chip Apple M3 mạnh mẽ, không quạt tản nhiệt nên hoàn toàn không tiếng ồn. RAM 8GB thống nhất và SSD 256GB, màn hình Retina 13.6 inch Liquid với notch chứa camera 1080p. Thời lượng pin lên đến 18 giờ, thiết kế nguyên khối nhôm tái chế. Lựa chọn hoàn hảo cho sinh viên và người dùng phổ thông.",
    category: "laptops",
    price: 26990000,
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR6b-z611dXXCAOzssRtPDMAlA3JJDTZDY-c5zvgXK2JOnKVKLHww5ofUch66OKj3dtLGlCBxkwVmBGIl-Qg0dwlZ5M4qSiJsZmnVyt9ikfRYcQHaycLkakKQ",
    stock: 25,
    tags: ["laptops", "apple", "air", "m3"],
    brand: "Apple",
    sku: "APP-MBA-13-M3",
  },
  {
    id: 15,
    title: "Dell Inspiron 14 7430",
    description:
      "Laptop văn phòng 2-trong-1 giá tốt với độ bền bỉ cao. Trang bị CPU Intel Core i5-1335U, RAM 16GB và SSD 512GB, cân bằng giữa hiệu năng và giá thành. Màn hình cảm ứng 14 inch FHD với bản lề xoay 360 độ linh hoạt. Thiết kế nhôm sang trọng, bàn phím ComfortView giảm ánh sáng xanh, phù hợp cho học tập và làm việc văn phòng cơ bản.",
    category: "laptops",
    price: 16900000,
    thumbnail:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSfGdwlq6ZB__7fj0ElANbW0-cwTLgjC2LeQXMxhjvnmjDHyFDaVcCQNpGJD-zbN5wBFTmETBMjTxoZSvsyCTNGBi7Th0Xo85TK3R9dA4cFYyZbPvHsssm2Xg",
    stock: 18,
    tags: ["laptops", "dell", "inspiron"],
    brand: "Dell",
    sku: "DEL-INS-14",
  },
  {
    id: 16,
    title: "Asus Zenbook S 13 OLED",
    description:
      "Laptop OLED 13 inch mỏng nhất thế giới, làm từ vật liệu bền vững. Trang bị CPU Intel Core i7-1355U, RAM 16GB LPDDR5 và SSD 1TB PCIe 4.0. Màn hình OLED 2.8K 13.3 inch với độ sáng 550 nits và chứng nhận DisplayHDR True Black 500. Thiết kế siêu mỏng chỉ 1cm, trọng lượng 1kg, hoàn hảo cho người dùng di động cao cấp.",
    category: "laptops",
    price: 31900000,
    thumbnail:
      "https://mac24h.vn/images/detailed/94/asus_zenbook_s_13_oled_mac24h_1.jpeg",
    stock: 11,
    tags: ["laptops", "asus", "zenbook", "oled"],
    brand: "ASUS",
    sku: "ASU-ZEN-S13",
  },
  {
    id: 17,
    title: "Lenovo Yoga Slim 7i Pro",
    description:
      "Laptop cao cấp với màn hình 2.8K 90Hz cực mượt và độ chuẩn màu cao. Trang bị CPU Intel Core i7 thế hệ 13, RAM 16GB và SSD 512GB. Màn hình 14.5 inch IPS với độ phủ màu 100% sRGB và chứng nhận TÜV Rheinland Eye Comfort. Thiết kế kim loại nguyên khối, trọng lượng nhẹ, pin lên đến 15 giờ, lý tưởng cho người dùng sáng tạo và doanh nhân.",
    category: "laptops",
    price: 24500000,
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQc4RD8DMWkYHVm5a-46_OG4Ff3F9f_mEjZiHWRw_Af96EvpnhJYc4ttu-8wlR9YJKlVsPCRfzgTNqnWbaAA9_rY4XpZuGtPat5OwvVKB2Ask3wUEp_-lTuKA",
    stock: 14,
    tags: ["laptops", "lenovo", "yoga", "pro"],
    brand: "Lenovo",
    sku: "LEN-YOG-7I",
  },
  {
    id: 18,
    title: "HP Victus 16 2024",
    description:
      "Lựa chọn gaming quốc dân cho sinh viên với giá cả phải chăng. Trang bị CPU Intel Core i5-13500H, GPU NVIDIA GeForce RTX 4050, RAM 16GB DDR5 và SSD 512GB. Màn hình 16.1 inch FHD 144Hz với công nghệ chống xanh mắt. Thiết kế gaming với logo Victus tối giản, hệ thống tản nhiệt mới giúp máy chạy mát hơn khi gaming.",
    category: "laptops",
    price: 20900000,
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSLznlIf_KPad6onXV0jewItcaOkT2V2-n5qMlgf5zrK_BvtdYHkdCDcrkbyGZugUY8zVUY63cc3-3rubj82ceZM3tvd34SgEaxPFE-0khrQaiIp6tpWytJ",
    stock: 20,
    tags: ["laptops", "gaming", "hp", "victus"],
    brand: "HP",
    sku: "HP-VIC-16",
  },
  {
    id: 19,
    title: "Acer Swift Go 14 AI",
    description:
      "Laptop tích hợp phím tắt Copilot chuyên dụng cho AI, tối ưu hóa trải nghiệm làm việc thông minh. Trang bị CPU Intel Core Ultra 5 125H với NPU AI chuyên dụng, RAM 16GB và SSD 512GB. Màn hình OLED 14 inch 90Hz với độ sáng 500 nits. Webcam 1440p với công nghệ Temporal Noise Reduction, hoàn hảo cho họp trực tuyến và sáng tạo nội dung.",
    category: "laptops",
    price: 18990000,
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRKwsnUbdj9CJMRj9N-FvwxEyRIYIgc9iJwUSPgKK8I1oAvA4m_EpliREMicy70BkjNkoxvJEhdolP6EBIXnVHVo_J9miZH",
    stock: 16,
    tags: ["laptops", "acer", "swift", "ai"],
    brand: "Acer",
    sku: "ACE-SWI-GO",
  },
  {
    id: 20,
    title: "MSI Katana 17",
    description:
      "Laptop gaming với không gian hiển thị rộng rãi nhờ màn hình 17.3 inch 144Hz. Trang bị CPU Intel Core i7-13620H, GPU NVIDIA GeForce RTX 4060 và RAM 16GB DDR5. Thiết kế lấy cảm hứng từ thanh katana với các đường cắt sắc nét, đèn LED RGB trên bàn phím. Hệ thống tản nhiệt Cooler Boost 5 với 2 quạt 6 ống nhiệt, đảm bảo hiệu năng ổn định.",
    category: "laptops",
    price: 28500000,
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSnCPSEIRrB_kkcSDR3eD1j1Q7FdULHyD7RnfY83pIAPAroDuo_gfK9aByddriuYROl5s4Btghxlc1kR0y6QfpKN6Nv0j9Ezf1RMk2VeMDiNhW22bCUSsIbOA",
    stock: 8,
    tags: ["laptops", "gaming", "msi", "katana"],
    brand: "MSI",
    sku: "MSI-KAT-17",
  },
  {
    id: 21,
    title: "Lenovo ThinkPad X1 Carbon Gen 12",
    description:
      "Laptop flagship cho doanh nhân với độ bền đạt chuẩn quân đội MIL-STD-810H, cực nhẹ chỉ từ 1.09kg. Trang bị chip Intel Core Ultra mới nhất, RAM đến 64GB và SSD đến 2TB. Màn hình 14 inch 2.8K OLED với chứng nhận Eyesafe. Bàn phím ThinkPad huyền thoại, bảo mật vân tay và nhận diện khuôn mặt. Hoàn hảo cho giám đốc điều hành và chuyên gia công nghệ.",
    category: "laptops",
    price: 45000000,
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcR9BSSOA44ynzqBIwwvPyvGQwRySTVIVnBvorl97M0AEFWaA-ktVxONCvhCEF9Cjnh7PA1lySO5LjPbcyhCo-s-RfAr6X9cW1tw5qGtUlC0DapgNlxFWkzx",
    stock: 5,
    tags: ["business"],
    brand: "Lenovo",
    sku: "TP-X1-C12",
  },
  {
    id: 22,
    title: "Asus Vivobook S 15 AI",
    description:
      "Laptop AI với chip Snapdragon X series mang lại hiệu suất mạnh mẽ và thời lượng pin lên tới 18 tiếng. Trang bị RAM 16GB và SSD 1TB, màn hình OLED 15.6 inch 120Hz. Tích hợp phím chuyên dụng Copilot, webcam AI 1080p với tính năng xóa phông và ánh sáng tự động. Chạy Windows on ARM, hoàn hảo cho người dùng cần di động lâu dài và tính năng AI hiện đại.",
    category: "laptops",
    price: 27990000,
    thumbnail:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTTpAijxY650R_IY7i6zQ-nXkTuktSssU6r-wb1M8m70sU6b7LuRtCtqk-GBY_F5HRdUb5liqMvWd3FCCSSslCRbrhlVSA7yUqYPDi40TQTgh20qhHsNt4MQ",
    stock: 10,
    tags: ["ai", "long-battery"],
    brand: "ASUS",
    sku: "ASU-VV-S15",
  },
  {
    id: 23,
    title: "Dell Latitude 5440",
    description:
      "Laptop bền bỉ cho doanh nghiệp với bảo mật cao cấp: TPM 2.0, bảo mật vân tay, nhận diện khuôn mặt và khóa Kensington. Trang bị CPU Intel Core i5/i7 thế hệ 13, RAM đến 64GB và SSD đến 2TB. Màn hình 14 inch FHD với tùy chọn chống chói. Vỏ nhôm và nhựa bền bỉ, bàn phím chống tràn nước, đạt chuẩn MIL-STD-810H. Dịch vụ hỗ trợ doanh nghiệp Dell Premium.",
    category: "laptops",
    price: 19500000,
    thumbnail:
      "https://mac24h.vn/images/detailed/93/Dell_Latitude_5440_2023_mac24h.png",
    stock: 30,
    tags: ["business"],
    brand: "Dell",
    sku: "DEL-LAT-5440",
  },
  {
    id: 24,
    title: "HP Envy 16 2024",
    description:
      "Laptop sáng tạo cao cấp với sức mạnh trong thiết kế tối giản. Trang bị CPU Intel Core i9 thế hệ 14, GPU NVIDIA GeForce RTX 4060, RAM 32GB và SSD 2TB. Màn hình 16 inch 2.5K 120Hz với độ phủ màu 100% DCI-P3. Âm thanh Bang & Olufsen, webcam 5MP với tính năng theo dõi chủ thể. Thiết kế nhôm nguyên khối với bản lề nâng cơ học, sang trọng và hiện đại.",
    category: "laptops",
    price: 34900000,
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ3uTe4hm35hFMcNfSeMCcLRLcmMsgf-jMdjEsd9wlTIGj4yFiBWTNqj2NPRrk4hI2uu9FXqSua_tsNFwZWBD8zH7cTaQMpjA",
    stock: 6,
    tags: ["creative"],
    brand: "HP",
    sku: "HP-ENVY-16",
  },
  {
    id: 25,
    title: "Macbook Pro 16 M3 Max",
    description:
      "Khủng long hiệu năng cho editor phim chuyên nghiệp và kỹ sư AI. Trang bị chip Apple M3 Max với CPU 16 lõi và GPU 40 lõi, RAM đến 128GB, SSD đến 8TB. Màn hình Liquid Retina XDR 16.2 inch với ProMotion 120Hz và độ sáng cực đại 1600 nits. Kết nối đầy đủ: 3 cổng Thunderbolt 4, HDMI, SDXC. Hiệu năng render video 8K và train AI model vượt trội.",
    category: "laptops",
    price: 85000000,
    thumbnail:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQZoe2RsGbalMgpr18ZJxnacc3i_t6mjPeY0E863JuCynogM57oqWlGxNJhize-NoJjxmryi_rXVObT2HLVyEZAduU8cWqHWrBV9vdTQ3fkbXe8uNXHOfHMzPc",
    stock: 3,
    tags: ["m3max", "apple"],
    brand: "Apple",
    sku: "APP-MBP-16",
  },
  {
    id: 26,
    title: "Acer Nitro V 15",
    description:
      "Laptop gaming giá rẻ hiệu năng cao cho người mới bắt đầu. Trang bị CPU Intel Core i5 thế hệ 13, GPU NVIDIA GeForce RTX 4050, RAM 16GB DDR5 và SSD 512GB. Màn hình 15.6 inch FHD 144Hz với thời gian phản hồi 3ms. Thiết kế gaming với đèn LED RGB 4 vùng, hệ thống tản nhiệt NitroSense với 2 quạt và ống nhiệt kép. Giá cả cực kỳ cạnh tranh trong phân khúc.",
    category: "laptops",
    price: 18500000,
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSKh25rfzlWAzfM42R1Ge3eGFW7_6uIPv0aTCnR2e8QwqJrKCQcZYN2cWhBCHly5Pzi0htfsWM5rAxS8NiiPvOmCnx9rBnsdXXX7ePz0fNAmgPJcn15rDONHw",
    stock: 25,
    tags: ["gaming-budget"],
    brand: "Acer",
    sku: "ACE-NIT-V",
  },
  {
    id: 27,
    title: "MSI Prestige 16 AI",
    description:
      "Laptop cao cấp dành cho creator với màn hình 4K OLED siêu nét và chip Intel Core Ultra 7 cực mạnh. Trang bị RAM 32GB LPDDR5X và SSD 2TB PCIe 4.0. Màn hình 16 inch 4K+ OLED 60Hz với độ phủ 100% DCI-P3 và chứng nhận Calman Verified. Thiết kế từ hợp kim magie, siêu nhẹ. Webcam 1080p AI với tính năng hậu cảnh ảo, hoàn hảo cho streamer và content creator.",
    category: "laptops",
    price: 39900000,
    thumbnail:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSRqmLRaHTTkJHDwJq-2BZNP_HmWw4RxFhqazkxPrpfi47ZvRLX2NECnavFuq-dn4TpZLos19x0i2TD-CjPlK_3C3PDdiD6",
    stock: 4,
    tags: ["luxury", "msi"],
    brand: "MSI",
    sku: "MSI-PRE-16",
  },
  {
    id: 28,
    title: "Lenovo Yoga Book 9i",
    description:
      "Laptop đột phá với hai màn hình OLED 13.3 inch xếp chồng lên nhau, mở ra không gian làm việc vô hạn. Trang bị CPU Intel Core i7-1355U, RAM 16GB và SSD 1TB. Đi kèm bàn phím Bluetooth và bút cảm ứng Lenovo Precision Pen 2. Có thể sử dụng ở nhiều chế độ: Dual Screen, Laptop, Tablet, Book. Trải nghiệm đa nhiệm và sáng tạo chưa từng có.",
    category: "laptops",
    price: 48000000,
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTGynRQe-uuTu2kJA6viN7xajki8xMvlVhfXENDjrXuPd-WZMLAtQT_Yblac3EIrFmowfODwmJS-wjrP1v18CPOFF9LF_GpuA",
    stock: 2,
    tags: ["innovation"],
    brand: "Lenovo",
    sku: "LEN-YOGA-DUAL",
  },
  {
    id: 29,
    title: "Asus TUF Gaming F15",
    description:
      "Laptop gaming siêu bền chuẩn quân đội MIL-STD-810H, được thiết kế để chịu được các điều kiện khắc nghiệt. Trang bị CPU Intel Core i7-12700H, GPU NVIDIA GeForce RTX 4060, RAM 16GB DDR5 và SSD 1TB. Màn hình 15.6 inch FHD 144Hz với công nghệ Adaptive-Sync. Hệ thống tản nhiệt mới với 4 ống nhiệt, bản lề được thử nghiệm 20,000 lần mở/đóng.",
    category: "laptops",
    price: 25900000,
    thumbnail:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQp-YWV6gMOu_kMaS99f0lMn7_dz4JOJy34d10Z8_IyQH0xt9XBDrri1_LY_K3tSj1KytpUFQVhLopxEKSG5ZADHk_JWsXGrw",
    stock: 15,
    tags: ["gaming", "tuf"],
    brand: "ASUS",
    sku: "ASU-TUF-F15",
  },
  {
    id: 30,
    title: "Microsoft Surface Laptop 6",
    description:
      "Laptop cao cấp từ Microsoft với thiết kế nhôm nguyên khối sang trọng và trackpad haptic mới mẻ cung cấp phản hồi xúc giác. Trang bị chip Intel Core Ultra thế hệ mới, RAM đến 64GB và SSD đến 1TB. Màn hình PixelSense 13.5 hoặc 15 inch với tỷ lệ 3:2. Webcam 1080p với Windows Studio Effects, loa Omnisonic. Hoàn hảo cho người dùng Windows thuần túy.",
    category: "laptops",
    price: 31000000,
    thumbnail:
      "https://surfaceviet.vn/wp-content/uploads/2024/03/Surface-Laptop-6-Platinum.png",
    stock: 9,
    tags: ["surface"],
    brand: "Microsoft",
    sku: "MS-SL-6",
  },
  {
    id: 31,
    title: "Gigabyte G6 Gaming",
    description:
      "Laptop gaming với màn hình 16 inch 165Hz mượt mà cho trải nghiệm gaming sống động. Trang bị CPU Intel Core i7 thế hệ 13, GPU NVIDIA GeForce RTX 4060 và RAM 16GB DDR5. Thiết kế mỏng nhẹ với trọng lượng 2.1kg, bàn phím RGB per-key. Hệ thống tản nhiệt WINDFORCE với 2 quạt 59 cánh và 4 ống nhiệt. Giá cả hợp lý cho hiệu năng gaming ổn định.",
    category: "laptops",
    price: 24500000,
    thumbnail:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQMtrlmgxPWoC0nf-auGogLb8VltfM49wy4tPvPLU556PyCAJdf5dsEQVp9mXH7Y79iiftq2bhvQEUk7SvIEbD6PNWBF8CU",
    stock: 10,
    tags: ["gaming"],
    brand: "Gigabyte",
    sku: "GIG-G6",
  },
  {
    id: 32,
    title: "Razer Blade 14 Pink",
    description:
      "Phiên bản màu hồng Quartz cực hiếm dành riêng cho nữ streamer và creator. Trang bị cấu hình mạnh mẽ tương đương Razer Blade 14 tiêu chuẩn (thông tin cụ thể cần bổ sung). Hoàn thiện từ khối nhôm nguyên khối phủ màu hồng pastel sang trọng. Đèn Chroma RGB trên bàn phím và logo. Lựa chọn thể hiện cá tính và phong cách gaming độc đáo.",
    category: "laptops",
    price: 55000000,
    thumbnail:
      "https://press.razer.com/wp-content/uploads/2019/01/Quartz-Laptop.png",
    stock: 1,
    tags: ["pink", "razer"],
    brand: "Razer",
    sku: "RAZ-BL-14-P",
  },
  {
    id: 33,
    title: "Samsung Galaxy Book 2 Pro",
    description:
      "Laptop siêu mỏng chỉ 0.8cm với màn hình AMOLED 13.3 inch sống động. Trang bị CPU Intel Core i5/i7 thế hệ 12, RAM 8/16GB LPDDR5 và SSD đến 1TB. Thiết kế từ hợp kim nhôm magie siêu nhẹ, pin 63Wh cho thời lượng sử dụng lâu dài. Webcam 1080p, âm thanh AKG với công nghệ Dolby Atmos. Lựa chọn hoàn hảo cho người dùng coi trọng thiết kế và hiển thị.",
    category: "laptops",
    price: 15900000,
    thumbnail:
      "https://mac24h.vn/images/detailed/94/samsung_galaxy_Book2_Pro_13_inch_2022_1_06nh-rn.png",
    stock: 12,
    tags: ["amoled"],
    brand: "Samsung",
    sku: "SAM-GB-P2",
  },
  {
    id: 34,
    title: "HP Pavilion Aero 13",
    description:
      "Laptop siêu nhẹ dưới 1kg với hiệu năng mạnh mẽ từ chip AMD Ryzen 7. Trang bị RAM 16GB LPDDR4X và SSD 512GB PCIe NVMe. Màn hình 13.3 inch WUXGA với độ sáng 400 nits và độ phủ màu 100% sRGB. Vỏ nhựa tái chế bền bỉ, bàn phím backlit. Thời lượng pin lên đến 10.5 giờ, sạc nhanh 50% trong 45 phút. Lý tưởng cho sinh viên và người dùng di động.",
    category: "laptops",
    price: 14900000,
    thumbnail:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTa9ocTMSaZ9yfa8p0yQpWp8bLwFkTW3JfFpYBNc3OZxib-AxD_CV3AtSYO9pqDSxDgHTDZSRcicb58-fZtc7FHw2Iy7cv7PijMuq04RakjR18DQQJ5GYtVG6w",
    stock: 20,
    tags: ["lightweight"],
    brand: "HP",
    sku: "HP-AERO-13",
  },
  {
    id: 35,
    title: "Dell G15 5530",
    description:
      "Laptop gaming đậm chất hầm hố với thiết kế góc cạnh và đèn LED xanh đặc trưng. Trang bị CPU Intel Core i7-13650HX, GPU NVIDIA GeForce RTX 4060, RAM 16GB DDR5 và SSD 1TB. Màn hình 15.6 inch FHD 165Hz với công nghệ ComfortView Plus. Bàn phím Alienware-inspired với RGB 4-zone, hệ thống tản nhiệt Dual Air-cooling với 4 ống nhiệt. Hiệu năng giá tốt.",
    category: "laptops",
    price: 27500000,
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSZ3x30QLq0UKrs6FHGhwIdrAHiDcG1L5b8KAMP1D5B_fD5wKZxCHufCVsUceEoeYOvlp8CDPA2nQYjYiPtayKuPgyPCdZT",
    stock: 15,
    tags: ["gaming"],
    brand: "Dell",
    sku: "DEL-G15",
  },
  {
    id: 36,
    title: "Asus ROG Flow Z13",
    description:
      "Laptop gaming dạng tablet tháo rời phím - máy tính bảng mạnh nhất thế giới. Trang bị CPU Intel Core i9-13900H và GPU NVIDIA GeForce RTX 4060, RAM 16GB LPDDR5. Màn hình cảm ứng 13.4 inch 165Hz với hỗ trợ bút. Có thể kết nối với eGPU ROG XG Mobile để nâng cấp sức mạnh đồ họa. Linh hoạt giữa chế độ tablet, laptop và gaming station.",
    category: "laptops",
    price: 42000000,
    thumbnail:
      "https://dlcdnwebimgs.asus.com/gain/D200E0EB-C3A4-468A-894C-EB812056B6ED",
    stock: 4,
    tags: ["tablet-gaming"],
    brand: "ASUS",
    sku: "ASU-FLOW-Z13",
  },
  {
    id: 37,
    title: "MSI Pulse 15",
    description:
      "Laptop gaming với thiết kế lấy cảm hứng từ phim viễn tưởng với các đường nét góc cạnh và đèn LED RGB. Trang bị CPU Intel Core i7 thế hệ 13, GPU NVIDIA GeForce RTX 4060 và RAM 16GB DDR5. Màn hình 15.6 inch QHD 165Hz với độ phủ 100% DCI-P3. Hệ thống tản nhiệt Cooler Boost 5 với 2 quạt và 6 ống nhiệt. Phong cách gaming đậm chất tương lai.",
    category: "laptops",
    price: 30500000,
    thumbnail:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSx5_Oq7unCBLrvVLOGeQAb-pKgWb5_YcwLrGgERQ-pguTmlTR5IA2zUFmB5gU_6ACxHJLb7G7T5xhpQobpWjqHIo1lkdQJowqaHSWCYV3jCCEvgvoryfQU9g",
    stock: 7,
    tags: ["gaming"],
    brand: "MSI",
    sku: "MSI-PUL-15",
  },
  {
    id: 38,
    title: "Acer Swift Edge 16",
    description:
      "Laptop mỏng nhẹ bậc nhất cho màn hình 16 inch với thiết kế chỉ 12.95mm và nặng 1.23kg. Trang bị CPU AMD Ryzen 7 7840U, RAM 16GB LPDDR5 và SSD 1TB. Màn hình OLED 16 inch 3.2K 120Hz với chứng nhận VESA DisplayHDR True Black 500. Webcam 1440p với công nghệ Temporal Noise Reduction. Sự kết hợp hoàn hảo giữa kích thước màn hình lớn và tính di động.",
    category: "laptops",
    price: 26900000,
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSWbeFdmHT0l8iYLGW3Hv0eEC5A73O3mBt961ZuoVnWENt3eWvqVjcFWAIxEQjvfZX4s-4Qg1c_z3PHY4Z4lXWXpNdEVBo4",
    stock: 5,
    tags: ["oled", "lightweight"],
    brand: "Acer",
    sku: "ACE-SWI-E16",
  },
  {
    id: 39,
    title: "Lenovo LOQ 15",
    description:
      "Dòng gaming giá rẻ mới từ Lenovo thay thế IdeaPad Gaming, cung cấp hiệu năng gaming cơ bản ở mức giá tiếp cận. Trang bị CPU Intel Core i5 hoặc AMD Ryzen 5, GPU NVIDIA GeForce RTX 3050 hoặc 4050, RAM 8/16GB và SSD 512GB. Màn hình 15.6 inch FHD 144Hz. Thiết kế gaming tối giản với logo LOQ phát sáng. Lựa chọn đầu vào cho game thủ ngân sách thấp.",
    category: "laptops",
    price: 19500000,
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQat_SttKCG_UWVDNlbb-RE0sqtCbcV2eahpu1HY7eVkA5fj0RQxFr3MdU6mQ6hmG8pCmaDnZR3XzDX2I0bBg43kccTXI-YUQ",
    stock: 18,
    tags: ["gaming"],
    brand: "Lenovo",
    sku: "LEN-LOQ-15",
  },
  {
    id: 40,
    title: "LG Gram Pro 16 2-in-1",
    description:
      "Laptop 2-trong-1 cao cấp với màn hình 16 inch xoay gập 360 độ và hỗ trợ bút cảm ứng Wacom AES 2.0. Trang bị chip Intel Core Ultra 7, RAM 16/32GB LPDDR5X và SSD 1TB. Màn hình OLED 16 inch 3K 120Hz với chứng nhận VESA DisplayHDR True Black 500. Trọng lượng siêu nhẹ 1.39kg cho kích thước 16 inch. Hoàn hảo cho nghệ sĩ kỹ thuật số và người dùng sáng tạo.",
    category: "laptops",
    price: 38900000,
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcR9BClcR7wsuuE0NwxQbNdu7Qn6NvKArOvz7gNt7XlNoCcUBTxybggfboe-PUW7DN7LJ9DXQTVuUuwKeKdKouVR8M7d1uppTU14g6O-Bp3frFCK8EsnGzK-iVY",
    stock: 3,
    tags: ["2-in-1"],
    brand: "LG",
    sku: "LG-GR-16F",
  },
  {
    id: 41,
    title: "Samsung Galaxy Book 3 Ultra",
    description:
      "Laptop ultrabook mạnh mẽ với màn hình Dynamic AMOLED 2X 16 inch sống động, CPU Intel Core i9 thế hệ 13 và GPU NVIDIA GeForce RTX 4070. RAM 32GB LPDDR5 và SSD 1TB. Thiết kế siêu mỏng từ hợp kim nhôm, pin 76Wh. Webcam 1080p với AI Noise Cancelling, âm thanh AKG với Dolby Atmos. Sự kết hợp hoàn hảo giữa hiệu năng workstation và thiết kế ultrabook.",
    category: "laptops",
    price: 52000000,
    thumbnail:
      "https://thegioiso365.vn/wp-content/uploads/2024/01/samsung-galaxy-book3-360-13-5-1695457294.jpg",
    stock: 2,
    tags: ["ultra"],
    brand: "Samsung",
    sku: "SAM-GB-U3",
  },
  {
    id: 42,
    title: "Dell Precision 5480",
    description:
      "Máy trạm Workstation di động nhỏ nhất thế giới với chứng nhận ISV cho các ứng dụng chuyên ngành. Trang bị CPU Intel Core i9-13900H, GPU NVIDIA RTX 2000 Ada Generation, RAM đến 64GB và SSD đến 4TB. Màn hình 14 inch OLED 3.5K với độ chính xác màu Delta-E < 1. Bảo mật vân tay, nhận diện khuôn mặt, TPM 2.0. Dành cho kỹ sư, kiến trúc sư và nhà khoa học dữ liệu.",
    category: "laptops",
    price: 59000000,
    thumbnail:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTnjP3zxRokyYPh_4zWbyFBQ9MKxlsz4CgBfMnmUpl-ZbIxx4monSro5uAyU3UVYzhzNm0EAEMskcej80LeCdfMDnAqYhRpVyB2Gd0tJ--yOpTjuE6R0N-7gw",
    stock: 4,
    tags: ["workstation"],
    brand: "Dell",
    sku: "DEL-PRE-5480",
  },
  {
    id: 43,
    title: "Apple MacBook Pro 14 M3",
    description:
      "MacBook Pro 14 inch với chip Apple M3 mới, mang lại hiệu năng CPU nhanh hơn 20% và GPU nhanh hơn 40% so với M1. RAM 8/16/24GB thống nhất, SSD 512GB/1TB. Màn hình Liquid Retina XDR với ProMotion và độ sáng 1000 nits. Thời lượng pin lên đến 22 giờ xem video. Màu Space Grey cổ điển. Nâng cấp đáng kể cho người dùng MacBook Pro cũ.",
    category: "laptops",
    price: 36500000,
    thumbnail:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRqRR4c6Jh9tbUTX8ClS-TpaMsi5FTST3MrvhuulnZCWyEpUgcIYtVlWGr2tE4orUwPzJCMNNDBXuKu41QC-ZTPF_ctqQ0EVMWkLw6qnnmdO-QcBwbff98R",
    stock: 15,
    tags: ["apple", "m3"],
    brand: "Apple",
    sku: "APP-MBP-14",
  },
  {
    id: 44,
    title: "HP Victus 15 2023",
    description:
      "Laptop gaming rẻ nhất thị trường với giá thành cực kỳ cạnh tranh. Trang bị CPU Intel Core i5-12450H, GPU NVIDIA GeForce RTX 3050 4GB, RAM 8GB DDR4 và SSD 512GB. Màn hình 15.6 inch FHD 144Hz với chống chói. Thiết kế tối giản với logo Victus, bàn phím backlit màu trắng. Hệ thống tản nhiệt với 2 quạt. Lựa chọn lý tưởng cho người mới bắt đầu chơi game với ngân sách hạn chế.",
    category: "laptops",
    price: 14500000,
    thumbnail:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcST2xq-_HASgBYLqppker2PdzQBaU1sV41tOhMkzPxA8QjWXxFDsTBiIKqyey1443GBtbC-52kP4bgje1dRps4JMsxtaed-kxK0i7eUGQiaVH3RKjk5c9vWng",
    stock: 20,
    tags: ["budget"],
    brand: "HP",
    sku: "HP-VIC-15",
  },
  {
    id: 45,
    title: "MSI Vector GP68",
    description:
      "Laptop gaming sức mạnh thuần túy không giới hạn với cấu hình đỉnh cao. Trang bị CPU Intel Core i9-13980HX, GPU NVIDIA GeForce RTX 4080 12GB, RAM 32GB DDR5 và SSD 1TB. Màn hình 16 inch QHD+ 240Hz với Mini-LED và độ phủ 100% DCI-P3. Hệ thống tản nhiệt mới với công nghệ kim loại lỏng. Bàn phím mechanical per-key RGB. Dành cho game thủ đua top và streamer chuyên nghiệp.",
    category: "laptops",
    price: 54000000,
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTPSirfFRrDy0_M_E5SGsaPNn9SRsep-9atSGE5gUk0LT5w_1I2HtWyb9uMLRKswAUqdmgXf-vmHCoOZ9RChTl7LPSO3rMw",
    stock: 5,
    tags: ["gaming"],
    brand: "MSI",
    sku: "MSI-VEC-68",
  },
  {
    id: 46,
    title: "Asus Zenbook 14 OLED 2024",
    description:
      "Laptop ultrabook với màn hình OLED 14 inch 120Hz mượt mà và chip Intel Core Ultra 5 mới nhất. RAM 16GB LPDDR5X và SSD 512GB. Thiết kế mỏng nhẹ từ hợp kim nhôm, trọng lượng 1.2kg. Webcam 1080p với công nghệ ASUS 3D Noise Reduction, bàn phím ErgoSense với hành trình phím 1.4mm. Thời lượng pin lên đến 15 giờ. Cân bằng hoàn hảo giữa hiệu suất và di động.",
    category: "laptops",
    price: 22900000,
    thumbnail:
      "https://dlcdnwebimgs.asus.com/gain/1f86f60b-8048-4e95-bf22-2853d1ffc744/",
    stock: 12,
    tags: ["oled"],
    brand: "ASUS",
    sku: "ASU-ZEN-14",
  },
  {
    id: 47,
    title: "Lenovo Slim 7i AI",
    description:
      "Laptop AI cao cấp với thiết kế nhôm nguyên khối màu xám thanh lịch. Trang bị chip Intel Core Ultra với NPU AI chuyên dụng, RAM 16/32GB LPDDR5X và SSD 1TB. Màn hình 14.5 inch 3K 120Hz với Dolby Vision. Webcam 1080p với công nghệ Computer Vision AI. Bàn phím backlit với công tắc camera điện tử. Hoàn hảo cho người dùng doanh nghiệp và sáng tạo cần tính năng AI tích hợp.",
    category: "laptops",
    price: 26000000,
    thumbnail:
      "https://mac24h.vn/images/detailed/95/Yoga_Slim_7_14IMH9_CT1_01.jpeg",
    stock: 8,
    tags: ["ai"],
    brand: "Lenovo",
    sku: "LEN-SLIM-7",
  },
  {
    id: 48,
    title: "Acer Nitro 16 Phoenix",
    description:
      "Laptop gaming với sức mạnh từ bộ đôi AMD Ryzen 7 và NVIDIA GeForce RTX 4060. RAM 16GB DDR5 và SSD 1TB. Màn hình 16 inch WQXGA 165Hz với độ phủ 100% sRGB. Hệ thống tản nhiệt NitroSense với 2 quạt 89 cánh, ống nhiệt kép và 4 lỗ thông hơi. Bàn phím RGB 4-zone với phím WASD nổi bật. Hiệu năng gaming ổn định ở phân khúc tầm trung.",
    category: "laptops",
    price: 29500000,
    thumbnail:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTYBJMYMy868mm6Y5vPZUAoPSmGdKa1v0O7N6io1wM6g0CkHYozi_KmsdtxnEDTtoc_8ZSUCq3McqGgQLVf_DLxQtDFkkmLSmf0cPLmAwb4tg0H9KduZM5wbg",
    stock: 10,
    tags: ["gaming"],
    brand: "Acer",
    sku: "ACE-NIT-16",
  },
  {
    id: 49,
    title: "Microsoft Surface Laptop Go 3",
    description:
      "Laptop nhỏ gọn 12.4 inch dành cho sinh viên và người dùng cơ bản với giá cả phải chăng. Trang bị CPU Intel Core i5 thế hệ 12, RAM 8GB và SSD 256GB. Màn hình PixelSense 1536 x 1024 với cảm ứng 10 điểm. Thiết kế nhôm và nhựa tái chế, bàn phím backlit, trackpad lớn. Thời lượng pin lên đến 15 giờ. Lựa chọn nhập môn hoàn hảo cho hệ sinh thái Surface.",
    category: "laptops",
    price: 17500000,
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcS4AkPFmXMXsCOqUOd1B38R888W3Rc6UNYIj8Bt35oS9Kdx8JsifEOqu9ViY1AdvAmFaLNdurjUj4Ge2SEA5McwzSPX12uZ",
    stock: 20,
    tags: ["surface"],
    brand: "Microsoft",
    sku: "MS-SL-GO3",
  },
  {
    id: 50,
    title: "Razer Blade 18",
    description:
      "Thế thân cho máy tính để bàn mạnh nhất trong thế giới laptop với màn hình 18 inch QHD+ 300Hz. Trang bị cấu hình tối thượng: Intel Core i9-14900HX, NVIDIA GeForce RTX 4090, RAM 64GB DDR5 và SSD 4TB NVMe. Hệ thống tản nhiệt vapor chamber kép với 44 lưỡi cắt. Bàn phím mechanical per-key RGB Chroma. Dành cho game thủ và creator đòi hỏi hiệu năng không thỏa hiệp.",
    category: "laptops",
    price: 110000000,
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTK8k53EJP4HW8hivPbv8mY1ks60OaK1qyFUkHv4KwefegiMa48vhZ3O0EOybUgxQ6gl14NdleyqZS_I3K3XsicZYijXwMThLFdnA9uGHcy53vYt8sa2SL90w",
    stock: 1,
    tags: ["god-tier", "razer"],
    brand: "Razer",
    sku: "RAZ-BL-18",
  },
];

const getProductsFromStorage = JSON.parse(localStorage.getItem("products"));
if (getProductsFromStorage && getProductsFromStorage.length > 0) {
  productS = getProductsFromStorage;

  console.log("không chạy cau lenh duoi");
} else {
  productS = productS.map((item, index) => ({
    ...item,
    id: index + 1,
  }));
  localStorage.setItem("products", JSON.stringify(productS));
  console.log("load product tư localstorage");
}

// Render sản phẩm
function renderProducts(list) {
  productList.innerHTML = "";

  list.forEach((product) => {
    productList.innerHTML += `
      <div class="card bg-base-100 shadow hover:shadow-lg">

        <figure class="p-4 ${!isEditMode ? "cursor-pointer" : ""}"
          ${!isEditMode ? `onclick="goDetail(${product.id})"` : ""}>
          <img src="${product.thumbnail}" class="h-40 object-contain" />
        </figure>

        <div class="card-body ${!isEditMode ? "cursor-pointer" : ""}"
          ${!isEditMode ? `onclick="goDetail(${product.id})"` : ""}>
          <h2 class="card-title text-sm">${product.title}</h2>
          <p class="font-bold text-red-600">
            ${product.price.toLocaleString()} đ
          </p>
        </div>

        <div class="grid grid-cols-3  gap-2 px-4 pb-4">

          

          <button
            class="btn btn-error btn-sm ${isEditMode ? "" : "hidden"}"
            onclick="deleteProduct(${product.id})">
            Xoá
          </button>

          <button
            class="btn btn-outline btn-sm ${isEditMode ? "" : "hidden"}"
            onclick="goDetail(${product.id})">
            Chi tiết
          </button>

          <button
            class="btn btn-warning btn-sm ${isEditMode ? "" : "hidden"}"
            onclick="editProduct(${product.id})">
            Sửa
          </button>

        </div>
        <div class="flex gap-2 px-4 pb-4">
        <button
            class="btn btn-primary w-full ${isEditMode ? "hidden" : ""}"
            onclick="goDetail(${product.id})">
            Mua ngay
          </button>
      </div>
    `;
  });
}

function goDetail(id) {
  window.location.href = `detail1.html?id=${id}`;
}

function editProduct(id) {
  window.location.href = `edit.html?id=${id}`;
}

function deleteProduct(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "Bạn có chắc muốn xoá?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Xoá",
    cancelButtonText: "Huỷ",
  }).then((result) => {
    if (!result.isConfirmed) return;

    products = products.filter((item) => item.id !== id); // Xoá sản phẩm khỏi mảng, tìm id khác với id cần xoá
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts(products);

    Swal.fire("Đã xoá!", "Sản phẩm đã bị xoá.", "success");
  });
}

btnEdit.addEventListener("click", () => {
  isEditMode = !isEditMode;

  if (isEditMode) {
    btnEdit.classList.add("btn-error");
    btnEdit.textContent = "Đang chỉnh sửa...";
  } else {
    btnEdit.classList.remove("btn-error");
    btnEdit.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
  }

  renderProducts(products);
});

searchBar.addEventListener("input", () => {
  const keyword = searchBar.value.toLowerCase();
  const result = products.filter((p) =>
    p.title.toLowerCase().includes(keyword),
  );
  renderProducts(result);
});

renderProducts(products);

window.goDetail = goDetail;
window.deleteProduct = deleteProduct;
window.editProduct = editProduct;
