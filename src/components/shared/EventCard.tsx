import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import { Event } from "@/types";
import Badge from "@/app/components/ui/Badge";
import Button from "@/app/components/ui/Button";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
      <div className="relative w-full h-44">
        <Image
          src={event.imageUrl || "/placeholder-event.jpg"}
          alt={event.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <Badge text={event.category} variant="category" />

        <h3 className="mt-2 font-semibold text-slate-900 text-base line-clamp-1">
          {event.title}
        </h3>
        <p className="mt-1 text-sm text-slate-500 line-clamp-2 flex-1">
          {event.shortDescription}
        </p>

        <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Calendar size={14} /> {formattedDate}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={14} /> {event.location}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          {event.isFree ? (
            <Badge text="Free" variant="free" />
          ) : (
            <span className="font-semibold text-slate-900">৳{event.price}</span>
          )}
          <Link href={`/events/${event._id}`}>
            <Button variant="outline" className="!px-4 !py-1.5 !text-xs">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}