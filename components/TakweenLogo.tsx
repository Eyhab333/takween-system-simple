import Image from "next/image";

interface TakweenLogoProps {
  size?: number;       // حجم الشعار بالبيكسل
  withText?: boolean;  // هل يعرض النص "تكوين المعرفة" بجانبه أم لا
  className?: string;  // تخصيص تنسيقات إضافية
}

export default function TakweenLogo({
  size = 60,
  withText = false,
  className = "",
}: TakweenLogoProps) {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <Image
        src="/logo.png"
        alt="شعار تكوين المعرفة"
        width={size}
        height={size}
        priority
        className="object-contain"
      />
      {withText && (
        <div>
          <h1 className="text-primary font-bold text-lg leading-tight">
            تكوين المعرفة
          </h1>
          <p className="text-subText text-xs">للخدمات التعليمية</p>
        </div>
      )}
    </div>
  );
}
