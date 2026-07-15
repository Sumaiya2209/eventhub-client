import { Search, CalendarCheck, PartyPopper } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discover",
    description: "Browse events by category, location, or date to find what excites you.",
  },
  {
    icon: CalendarCheck,
    title: "Reserve Your Spot",
    description: "View full details and secure your place at the event in a few clicks.",
  },
  {
    icon: PartyPopper,
    title: "Attend & Enjoy",
    description: "Show up, meet new people, and make the most of the experience.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">How It Works</h2>
        <p className="mt-2 text-slate-500 text-sm">Three simple steps to your next event</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {steps.map(({ icon: Icon, title, description }, i) => (
          <div key={title} className="relative text-center px-4">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-2xl bg-violet-100 text-violet-700 mb-4">
              <Icon size={26} />
            </div>
            <span className="text-xs font-semibold text-amber-500">STEP {i + 1}</span>
            <h3 className="mt-1 font-semibold text-slate-900">{title}</h3>
            <p className="mt-2 text-sm text-slate-500">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}