import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuth } from "firebase/auth";
import { auth } from "@/lib/firebase";

export function middleware(request: NextRequest) {
  // لاحقاً سنربطها بـ Auth
  // حالياً مجرد placeholder
  return NextResponse.next();
}

// هنفعلها لاحقاً في المرحلة 5 بعد ما نربط حالة المستخدم فعليًا
