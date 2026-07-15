export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-pulse">
      <div className="w-full h-44 bg-slate-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-20 bg-slate-200 rounded-full" />
        <div className="h-4 w-3/4 bg-slate-200 rounded" />
        <div className="h-3 w-full bg-slate-200 rounded" />
        <div className="h-3 w-2/3 bg-slate-200 rounded" />
        <div className="h-8 w-full bg-slate-200 rounded-lg mt-4" />
      </div>
    </div>
  );
}