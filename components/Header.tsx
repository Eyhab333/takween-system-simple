"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import TakweenLogo from "@/components/TakweenLogo";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";

export default function Header() {
  const [userName, setUserName] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    // مستمع دائم لحالة المستخدم
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName) {
          setUserName(user.displayName);
        } else if (user.email) {
          setUserName(user.email.split("@")[0]);
        }
      } else {
        setUserName("");
      }
    });

    // إلغاء الاشتراك عند الخروج من الصفحة
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/login");
  };

  return (
    <header className="bg-primary text-white px-6 py-3 flex justify-between items-center shadow-md">
      <TakweenLogo size={45} withText={true} />

      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        {userName && <span className="text-sm opacity-90">{userName}</span>}
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 bg-gradient2 hover:bg-accent text-white px-3 py-1.5 rounded-lg transition-colors"
        >
          <LogOut size={18} />
          <span className="text-sm font-medium">تسجيل الخروج</span>
        </button>
      </div>
    </header>
  );
}
