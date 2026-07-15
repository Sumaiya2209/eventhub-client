import { Target, Users, Calendar, Heart } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To make discovering and hosting events effortless — connecting organizers with the right audience, anywhere.",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "We believe great events are built by communities. EventHub gives everyone the tools to bring people together.",
  },
  {
    icon: Heart,
    title: "Built with Care",
    description:
      "Every feature is designed to be simple, fast, and accessible — from posting your first event to finding your next one.",
  },
];

const stats = [
  { value: "500+", label: "Events Hosted" },
  { value: "20K+", label: "Community Members" },
  { value: "15+", label: "Cities Covered" },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br max-w-6xl mx-auto my-10 rounded-2xl from-violet-700 via-violet-600 to-indigo-700 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
            <Calendar size={13} /> About EventHub
          </span>
          <h1 className="mt-5 text-3xl sm:text-4xl font-bold text-white">
            Bringing People Together, One Event at a Time
          </h1>
          <p className="mt-4 text-violet-100 max-w-xl mx-auto">
            EventHub started with a simple idea — finding and hosting great events
            shouldn't be complicated. Today, we help thousands of people discover
            experiences and organizers reach the right crowd.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-3 gap-6">
          {values.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="border border-slate-200 rounded-2xl p-6 hover:shadow-sm transition-shadow"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-violet-100 text-violet-700 mb-4">
                <Icon size={22} />
              </div>
              <h3 className="font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm text-slate-500">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-slate-50 py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-6 text-center">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl sm:text-4xl font-bold text-violet-700">{value}</p>
                <p className="mt-1 text-sm text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-slate-900">Our Story</h2>
        <p className="mt-4 text-slate-600 leading-relaxed">
          EventHub was built by a small team who noticed how scattered event
          discovery had become — buried in social media feeds, group chats, and
          word of mouth. We set out to build one place where anyone could post
          an event and anyone could find one, without the noise.
        </p>
        <p className="mt-4 text-slate-600 leading-relaxed">
          Since launch, we've helped local organizers, hobby communities, and
          large venues alike reach people who genuinely wanted to show up. We're
          just getting started.
        </p>
      </section>
    </div>
  );
}