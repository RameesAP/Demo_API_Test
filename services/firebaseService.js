import admin from "firebase-admin";
import { createRequire } from "module";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Decode Firebase credentials from Base64
const firebaseConfig = JSON.parse(Buffer.from(process.env.FIREBASE_CREDENTIALS, "base64").toString("utf8"));

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});




// const require = createRequire(import.meta.url);

// // Load Firebase credentials
// const serviceAccount = require("../firebase-adminsdk.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://for-node-backend.firebaseio.com", // Optional for Realtime Database
// });

const db = admin.firestore();

// Function to store sale data in Firestore
export const pushSaleToFirestore = async (saleData) => {
  try {
    const docRef = await db.collection("sales").add(saleData);
    console.log("✅ Sale stored in Firestore with ID:", docRef.id);
  } catch (error) {
    console.error("❌ Error pushing sale to Firestore:", error);
  }
};

export { db };
