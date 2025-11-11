// lib/firestoreHelpers.ts
import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function ensureUserDocument(user: any) {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      name: user.displayName || "",
      email: user.email,
      department: "",
      position: "",
      role: "employee",
      createdAt: new Date().toISOString(),
    });
    console.log("✅ تم إنشاء حساب المستخدم في Firestore");
  } else {
    console.log("🔁 المستخدم موجود مسبقًا في Firestore");
  }
}
