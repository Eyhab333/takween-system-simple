"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Header from "@/components/Header";

export default function DashboardPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const ref = doc(db, "users", user.uid);
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) setUserData(snapshot.data());
      setLoading(false);
    };
    fetchUserData();
  }, []);

  if (loading) return <p className="text-center mt-20">جاري تحميل البيانات...</p>;

  return (
    <div className="min-h-screen bg-background">
      {/* الهيدر */}
      <Header />

      {/* المحتوى */}
      <main className="max-w-6xl mx-auto py-10 px-4 space-y-10">
        {/* بانر ترحيبي */}
        <div className="bg-takween-gradient p-6 rounded-takween text-white shadow-takween">
          <h1 className="text-2xl font-bold mb-1">
            مرحبًا {userData?.name || "بالزميل العزيز"} 👋
          </h1>
          <p className="opacity-90 text-sm">
            نتمنى لك يومًا مليئًا بالإبداع والإنجاز في تكوين المعرفة 💚
          </p>
        </div>

        {/* كروت الإحصاءات */}
        <section>
          <h2 className="text-takween-main text-xl font-bold mb-4">إحصاءات عامة</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card-takween text-center">
              <p className="text-takween-sub mb-1">عدد الموظفين</p>
              <h3 className="text-takween-main text-2xl font-bold">300</h3>
            </div>
            <div className="card-takween text-center">
              <p className="text-takween-sub mb-1">الدورات التدريبية</p>
              <h3 className="text-takween-main text-2xl font-bold">125</h3>
            </div>
            <div className="card-takween text-center">
              <p className="text-takween-sub mb-1">الشهادات الممنوحة</p>
              <h3 className="text-takween-main text-2xl font-bold">482</h3>
            </div>
            <div className="card-takween text-center">
              <p className="text-takween-sub mb-1">التعاميم النشطة</p>
              <h3 className="text-takween-main text-2xl font-bold">12</h3>
            </div>
          </div>
        </section>

        {/* قسم الشهادات */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-takween-main text-xl font-bold">آخر الشهادات التدريبية</h2>
            <button className="btn-takween-light">عرض الكل</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card-takween border-takween">
              <p className="text-takween-main font-semibold">دورة القيادة الفعّالة</p>
              <p className="text-takween-sub text-sm">بتاريخ: 2025-10-15</p>
            </div>
            <div className="card-takween border-takween">
              <p className="text-takween-main font-semibold">التحول الرقمي في التعليم</p>
              <p className="text-takween-sub text-sm">بتاريخ: 2025-09-10</p>
            </div>
          </div>
        </section>

        {/* قسم التعاميم */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-takween-main text-xl font-bold">التعاميم والإعلانات</h2>
            <button className="btn-takween-light">عرض الكل</button>
          </div>
          <div className="card-takween space-y-3">
            <div className="border-b pb-2">
              <p className="font-semibold text-takween-main">
                تحديث لوائح الحضور والانصراف
              </p>
              <p className="text-takween-sub text-sm">بتاريخ: 2025-11-05</p>
            </div>
            <div>
              <p className="font-semibold text-takween-main">
                بدء التسجيل في البرامج التدريبية الجديدة
              </p>
              <p className="text-takween-sub text-sm">بتاريخ: 2025-11-01</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
