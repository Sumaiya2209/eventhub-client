import Link from "next/link";
import { Search, Calendar as CalendarIcon } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Banner() {
  return (
    <section className="relative h-[65vh] min-h-[420px] flex items-center bg-gradient-to-br from-violet-700 via-violet-600 to-indigo-700 overflow-hidden">
      {/* decorative shapes */}
      <div className="absolute top-10 right-20 w-24 h-24 rounded-3xl bg-amber-400/20 rotate-12" />
      <div className="absolute bottom-16 left-16 w-16 h-16 rounded-full border border-white/10" />
      <div className="absolute top-1/3 left-1/4 w-10 h-10 rounded-xl bg-white/10 -rotate-6" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-300 bg-white/10 px-3 py-1 rounded-full">
            <CalendarIcon size={13} /> Discover events near you
          </span>

          <h1 className="mt-5 text-4xl sm:text-5xl font-bold text-white leading-tight">
            Find your next
            <span className="text-amber-400"> unforgettable </span>
            experience
          </h1>

          <p className="mt-4 text-violet-100 text-base sm:text-lg max-w-lg">
            Browse concerts, workshops, and meetups — or post your own event
            and reach thousands of people.
          </p>

          {/* Search bar */}
          <form
            action="/events"
            className="mt-8 flex items-center bg-white rounded-xl p-1.5 max-w-md shadow-lg"
          >
            <Search size={18} className="ml-3 text-slate-400 shrink-0" />
            <input
              type="text"
              name="search"
              placeholder="Search events by name or city..."
              className="flex-1 px-3 py-2 text-sm text-slate-700 focus:outline-none min-w-0"
            />
            <Button type="submit" className="!px-5 !py-2 shrink-0">
              Search
            </Button>
          </form>

          <div className="mt-6 flex gap-3">
            <Link href="/events">
              <Button variant="secondary">Explore Events</Button>
            </Link>
            <Link href="/events/add">
              <Button variant="outline" className="!text-white !border-white/40 hover:!bg-white/10">
                Post an Event
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}