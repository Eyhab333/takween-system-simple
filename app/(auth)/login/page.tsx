"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ensureUserDocument } from "@/lib/firestoreHelpers";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
  await signInWithEmailAndPassword(auth, email, password);
  await ensureUserDocument(auth.currentUser);
  alert("تم تسجيل الدخول بنجاح ✅");
    } catch (err: any) {
      console.error(err);
      setError("بيانات الدخول غير صحيحة ❌");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white shadow rounded p-6 w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-bold text-center">تسجيل الدخول</h1>

        {/* تسجيل بالبريد */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block mb-1">الإيميل</label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1">كلمة المرور</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "جاري الدخول..." : "تسجيل الدخول"}
          </button>
        </form>

        

        
      </div>
    </div>
  );
}
