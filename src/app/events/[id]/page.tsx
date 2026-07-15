"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, User, Star, ArrowLeft } from "lucide-react";
import api from "@/lib/api";
import { Event } from "@/types";
import EventCard from "@/components/events/EventCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export default function EventDetailsPage() {
  const params = useParams();
  const eventId = params.id as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [related, setRelated] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${eventId}`);
        const fetchedEvent: Event = res.data.event;
        setEvent(fetchedEvent);

        // fetch related events from same category
        const relatedRes = await api.get("/events", {
          params: { category: fetchedEvent.category, limit: 4 },
        });
        setRelated(
          relatedRes.data.events.filter((e: Event) => e._id !== fetchedEvent._id).slice(0, 3)
        );
      } catch (error) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) fetchEvent();
  }, [eventId]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 animate-pulse">
        <div className="h-72 bg-slate-200 rounded-2xl" />
        <div className="h-6 w-2/3 bg-slate-200 rounded mt-6" />
        <div className="h-4 w-full bg-slate-200 rounded mt-4" />
      </div>
    );
  }

  if (notFound || !event) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Event not found</h1>
        <p className="mt-2 text-slate-500">This event may have been removed.</p>
        <Link href="/events" className="inline-block mt-6">
          <Button>Back to Explore</Button>
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const avgRating =
    event.reviews.length > 0
      ? (event.reviews.reduce((sum, r) => sum + r.rating, 0) / event.reviews.length).toFixed(1)
      : null;

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-violet-600 mb-6"
        >
          <ArrowLeft size={15} /> Back to Explore
        </Link>

        {/* Image gallery — banner + thumbnail (same image repeated as gallery slot since single imageUrl in schema) */}
        <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden">
          <Image src={event.imageUrl} alt={event.title} fill className="object-cover" />
        </div>

        <div className="mt-8 grid lg:grid-cols-3 gap-8">
          {/* Left — main content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <Badge text={event.category} variant="category" />
              <h1 className="mt-3 text-2xl sm:text-3xl font-bold text-slate-900">
                {event.title}
              </h1>
              <p className="mt-2 text-slate-500">{event.shortDescription}</p>
            </div>

            {/* Overview */}
            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-2">Overview</h2>
              <p className="text-sm text-slate-600 leading-relaxed">{event.fullDescription}</p>
            </section>

            {/* Reviews */}
            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">
                Reviews {avgRating && `(${avgRating} ★, ${event.reviews.length})`}
              </h2>

              {event.reviews.length === 0 ? (
                <p className="text-sm text-slate-400">No reviews yet for this event.</p>
              ) : (
                <div className="space-y-4">
                  {event.reviews.map((review, i) => (
                    <div key={i} className="bg-white border border-slate-200 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-900">{review.userName}</p>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star
                              key={j}
                              size={13}
                              className={
                                j < review.rating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-slate-200"
                              }
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mt-1.5 text-sm text-slate-500">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Right — key info sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sticky top-24">
              <h3 className="font-semibold text-slate-900 mb-4">Key Information</h3>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2.5">
                  <Calendar size={16} className="text-violet-600 mt-0.5 shrink-0" />
                  <span className="text-slate-600">{formattedDate}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin size={16} className="text-violet-600 mt-0.5 shrink-0" />
                  <span className="text-slate-600">{event.location}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <User size={16} className="text-violet-600 mt-0.5 shrink-0" />
                  <span className="text-slate-600">
                    Organized by {event.postedBy?.name || "Unknown"}
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-sm text-slate-500">Price</span>
                {event.isFree ? (
                  <Badge text="Free" variant="free" />
                ) : (
                  <span className="text-xl font-bold text-slate-900">৳{event.price}</span>
                )}
              </div>

              <Button fullWidth className="mt-5">
                Reserve Your Spot
              </Button>
            </div>
          </div>
        </div>

        {/* Related Events */}
        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="text-xl font-bold text-slate-900 mb-5">Related Events</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((e) => (
                <EventCard key={e._id} event={e} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}