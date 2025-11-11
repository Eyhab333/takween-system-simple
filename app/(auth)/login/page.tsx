"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ensureUserDocument } from "@/lib/firestoreHelpers";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      await ensureUserDocument(auth.currentUser);
      router.push("/dashboard");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("تعذر تسجيل الدخول، تأكد من البريد وكلمة المرور.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-xl font-bold text-primary mb-4 text-center">
          تسجيل الدخول
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm mb-1">البريد الإلكتروني</label>
            <input
              type="email"
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="yourmail@takween.com"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">كلمة المرور</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                className="w-full border rounded-xlg px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-2.5 text-gray-500"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-gradient2 transition"
          >
            {loading ? "جارٍ الدخول..." : "دخول"}
          </button>
        </form>
      </div>
    </div>
  );
}
