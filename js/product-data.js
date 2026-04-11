// js/product-data.js
const db = firebase.firestore();
const collectionName = "products";

// Lấy tất cả sản phẩm
async function getProductsFromFirebase() {
  try {
    const snapshot = await db
      .collection(collectionName)
      .orderBy("createdAt", "desc")
      .get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Lỗi lấy danh sách:", error);
    return [];
  }
}

// Lấy 1 sản phẩm theo ID
async function getProductByIdFromFirebase(docId) {
  try {
    const doc = await db.collection(collectionName).doc(docId).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  } catch (error) {
    console.error("Lỗi lấy chi tiết:", error);
    return null;
  }
}

// Thêm sản phẩm
async function addProductToFirebase(productData) {
  try {
    await db.collection(collectionName).add({
      ...productData,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error("Lỗi thêm sản phẩm:", error);
    return false;
  }
}

// Cập nhật sản phẩm
async function updateProductInFirebase(docId, updatedData) {
  try {
    await db.collection(collectionName).doc(docId).update(updatedData);
    return true;
  } catch (error) {
    console.error("Lỗi cập nhật:", error);
    return false;
  }
}

// Xóa sản phẩm
async function deleteProductFromFirebase(docId) {
  try {
    await db.collection(collectionName).doc(docId).delete();
    return true;
  } catch (error) {
    console.error("Lỗi xóa:", error);
    return false;
  }
}
// Thêm vào js/product-data.js
async function getProductByIdFromFirebase(docId) {
  try {
    const doc = await db.collection("products").doc(docId).get();
    if (doc.exists) {
      return { id: doc.id, ...doc.data() };
    }
    return null;
  } catch (error) {
    console.error("Lỗi lấy chi tiết sản phẩm:", error);
    return null;
  }
}
