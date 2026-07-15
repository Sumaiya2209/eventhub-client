"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { Event } from "@/types";
import EventCard from "@/components/events/EventCard";
import SkeletonCard from "@/components/events/SkeletonCard";
import Button from "@/components/ui/Button";

export default function FeaturedEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events?limit=4&sort=date");
        setEvents(res.data.events);
      } catch (error) {
        console.error("Failed to load featured events", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Featured Events</h2>
            <p className="mt-2 text-slate-500 text-sm">Don't miss what's happening soon</p>
          </div>
          <Link href="/events" className="hidden sm:block">
            <Button variant="outline">View All</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : events.map((event) => <EventCard key={event._id} event={event} />)}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/events">
            <Button variant="outline" fullWidth>View All Events</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}