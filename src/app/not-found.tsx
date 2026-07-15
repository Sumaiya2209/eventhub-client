import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-violet-600">404</h1>
      <p className="mt-4 text-lg text-slate-600">Page not found</p>
      <Link
        href="/"
        className="mt-6 px-5 py-2.5 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
      >
        Go back home
      </Link>
    </div>
  );
}