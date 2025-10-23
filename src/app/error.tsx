"use client";
import Button from '@/components/common/button/Button';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold text-red-600">
          خطای بحرانی در سیستم
        </h1>
        <p className="mb-4 text-gray-600">اپلیکیشن نتوانست بارگذاری شود</p>
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          title="تلاش مجدد"
          variant="error"
        >
          بازیابی کامل سیستم
        </Button>
      </div>
    </div>
  );
}
