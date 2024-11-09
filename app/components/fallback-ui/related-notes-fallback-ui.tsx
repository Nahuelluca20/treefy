export default function RelatedNotesFallBackUI() {
  return (
    <div className="w-full max-w-[400px] h-screen items-center animate-pulse">
      <div className="h-6 bg-gray-200 rounded-md dark:bg-gray-700 w-48 mb-4" />
      <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-full mb-4" />
      <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-full mb-4" />
      <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-full mb-4" />

      <span className="sr-only">Loading...</span>
    </div>
  );
}
