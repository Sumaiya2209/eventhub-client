import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Banner() {
  return (
    <section className="relative h-[70vh] min-h-[500px] max-w-7xl mx-auto my-10 rounded-2xl flex items-center overflow-hidden bg-gradient-to-r from-indigo-950 via-violet-900 to-violet-800">
      {/* Background image bleeding in from the left */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87"
          alt="Event crowd"
          fill
          priority
          className="object-cover opacity-60"
        />
        {/* fade the image into the gradient on the right so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-900/60 to-violet-900/95" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-md text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl leading-tight">
              <span className="block font-light text-white">Discover Your</span>
              <span className="block font-bold text-white">Next Event</span>
            </h1>

            <div className="mt-4 w-14 h-[3px] bg-amber-400 mx-auto lg:mx-0" />

            <p className="mt-5 text-sm sm:text-base text-violet-100/90 max-w-sm mx-auto lg:mx-0">
              From concerts to conferences, EventHub helps you find what's
              happening near you — or post your own event and reach thousands
              of people in minutes.
            </p>

            {/* Search bar */}
            <form
              action="/events"
              className="mt-7 flex items-center bg-white rounded-xl p-1.5 shadow-lg mx-auto lg:mx-0"
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

            <div className="mt-6 flex gap-3 justify-center lg:justify-start">
              <Link href="/events">
                <Button variant="secondary" className="!rounded-full !px-6">
                  Get Started!
                </Button>
              </Link>
              <Link href="/events/add">
                <Button
                  variant="outline"
                  className="!rounded-full !px-6 !text-white !border-white/50 hover:!bg-white/10"
                >
                  Post an Event
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}