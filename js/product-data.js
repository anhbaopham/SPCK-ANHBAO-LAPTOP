// js/product-data.js
const db = firebase.firestore();
const collectionName = "products";

// 1. Lấy toàn bộ danh sách sản phẩm
async function getProductsFromFirebase() {
  try {
    const snapshot = await db
      .collection(collectionName)
      .orderBy("createdAt", "desc")
      .get();
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu: ", error);
    return [];
  }
}

// 2. Lấy chi tiết 1 sản phẩm theo ID
async function getProductByIdFromFirebase(docId) {
  try {
    const doc = await db.collection(collectionName).doc(docId).get();
    if (doc.exists) {
      return { id: doc.id, ...doc.data() };
    }
    return null;
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết: ", error);
    return null;
  }
}

// 3. Thêm sản phẩm mới
async function addProductToFirebase(productData) {
  try {
    await db.collection(collectionName).add({
      ...productData,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error("Lỗi khi thêm: ", error);
    return false;
  }
}

// 4. Cập nhật sản phẩm
async function updateProductInFirebase(docId, updatedData) {
  try {
    await db.collection(collectionName).doc(docId).update(updatedData);
    return true;
  } catch (error) {
    console.error("Lỗi khi sửa: ", error);
    return false;
  }
}

// 5. Xoá sản phẩm
async function deleteProductFromFirebase(docId) {
  try {
    await db.collection(collectionName).doc(docId).delete();
    return true;
  } catch (error) {
    console.error("Lỗi khi xoá: ", error);
    return false;
  }
}

// Thêm hàm này vào product-data.js nếu chưa có
async function getProductByIdFromFirebase(docId) {
  try {
    const doc = await db.collection("products").doc(docId).get();
    if (doc.exists) {
      return { id: doc.id, ...doc.data() };
    }
    return null;
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết:", error);
    return null;
  }
}
