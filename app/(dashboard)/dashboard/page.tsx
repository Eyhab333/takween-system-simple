"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function DashboardPage() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const ref = doc(db, "users", user.uid);
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        setUserData(snapshot.data());
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  if (loading) return <p className="text-center mt-20">جاري تحميل البيانات...</p>;

  if (!userData)
    return (
      <p className="text-center mt-20 text-red-500">
        لم يتم العثور على بيانات المستخدم
      </p>
    );

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4 text-center">لوحة الموظف</h1>

      <div className="bg-white shadow rounded p-4 space-y-3">
        <p><strong>الاسم:</strong> {userData.name || "—"}</p>
        <p><strong>الإيميل:</strong> {userData.email}</p>
        <p><strong>القسم:</strong> {userData.department || "غير محدد"}</p>
        <p><strong>الوظيفة:</strong> {userData.position || "غير محدد"}</p>
        <p><strong>الدور:</strong> {userData.role}</p>
      </div>
    </div>
  );
}
