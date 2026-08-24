export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <div className="animate-spin h-8 w-8 border-4 border-black border-t-transparent rounded-full mb-4" />
      <p className="text-gray-500">Memuat data tugas...</p>
    </div>
  );
}
