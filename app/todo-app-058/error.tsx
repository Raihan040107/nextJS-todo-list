"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <p className="text-red-500 font-semibold mb-2">Terjadi kesalahan saat memuat data.</p>
      <button onClick={() => reset()} className="bg-black text-white px-4 py-2 rounded-lg">
        Coba lagi
      </button>
    </div>
  );
}
