import Link from "next/link";
import { Music, Briefcase, Trophy, Mic2, PartyPopper, GraduationCap } from "lucide-react";

const categories = [
  { name: "Concert", icon: Music },
  { name: "Conference", icon: Briefcase },
  { name: "Sports", icon: Trophy },
  { name: "Festival", icon: PartyPopper },
  { name: "Workshop", icon: GraduationCap },
  { name: "Talk Show", icon: Mic2 },
];

export default function EventCategories() {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Browse by Category</h2>
        <p className="mt-2 text-slate-500 text-sm">Find events that match your interest</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map(({ name, icon: Icon }) => (
          <Link
            key={name}
            href={`/events?category=${encodeURIComponent(name)}`}
            className="flex flex-col items-center gap-2 p-5 rounded-2xl border border-slate-200 hover:border-violet-300 hover:bg-violet-50 transition-colors"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-violet-100 text-violet-700">
              <Icon size={20} />
            </div>
            <span className="text-sm font-medium text-slate-700">{name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}