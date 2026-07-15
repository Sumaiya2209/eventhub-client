import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Tanvir Ahmed",
    role: "Regular Attendee",
    quote:
      "EventHub made it so easy to find local tech meetups. I've made great connections through events I found here.",
    rating: 5,
  },
  {
    name: "Farzana Islam",
    role: "Event Organizer",
    quote:
      "Posting our workshop took less than five minutes, and we had a full house within a week.",
    rating: 5,
  },
  {
    name: "Rakib Hasan",
    role: "Music Enthusiast",
    quote:
      "The filtering options are great — I always find concerts that fit my budget and schedule.",
    rating: 4,
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">What People Say</h2>
        <p className="mt-2 text-slate-500 text-sm">Trusted by attendees and organizers alike</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map(({ name, role, quote, rating }) => (
          <div
            key={name}
            className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col h-full"
          >
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={15}
                  className={i < rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}
                />
              ))}
            </div>
            <p className="text-sm text-slate-600 flex-1">"{quote}"</p>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-sm font-semibold text-slate-900">{name}</p>
              <p className="text-xs text-slate-500">{role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}