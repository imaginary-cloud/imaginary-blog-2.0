export default function Spinner() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative">
        <div className="w-8 h-8 rounded-full absolute border-2 border-solid border-gray-200" />
        <div className="w-8 h-8 rounded-full animate-spin absolute border-2 border-solid border-primary border-t-transparent" />
      </div>
    </div>
  );
}
