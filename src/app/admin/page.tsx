"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Trash2, ShieldCheck } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import api from "@/lib/api";
import { Event } from "@/types";
import Badge from "@/components/ui/Badge";

export default function AdminPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (!isPending) {
      if (!session?.user) {
        router.push("/signin");
      } else if ((session.user as any).role !== "admin") {
        router.push("/");
      }
    }
  }, [isPending, session, router]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await api.get("/events", { params: { limit: 100 } });
        setEvents(res.data.events);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if ((session?.user as any)?.role === "admin") fetchAll();
  }, [session]);

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await api.delete(`/events/${deleteId}`);
      setEvents((prev) => prev.filter((e) => e._id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      console.error(error);
    }
  };

  if (isPending || !session?.user || (session.user as any).role !== "admin") {
    return <div className="min-h-screen bg-slate-50" />;
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-8">
          <ShieldCheck className="text-violet-600" size={24} />
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Admin Panel</h1>
        </div>
        <p className="text-sm text-slate-500 -mt-6 mb-8">
          Manage all events across the platform ({events.length} total)
        </p>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 bg-white rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            {events.map((event) => (
              <div
                key={event._id}
                className="flex items-center gap-4 px-5 py-4 border-b last:border-b-0 border-slate-100"
              >
                <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                  <Image src={event.imageUrl} alt={event.title} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900 text-sm truncate">{event.title}</p>
                  <p className="text-xs text-slate-500">
                    by {event.postedBy?.name || "Unknown"}
                  </p>
                </div>
                <Badge text={event.category} variant="category" />
                <button
                  onClick={() => setDeleteId(event._id)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-red-200 text-red-500 hover:bg-red-50 shrink-0"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="font-semibold text-slate-900">Delete this event?</h3>
            <p className="mt-2 text-sm text-slate-500">
              This will permanently remove it from the platform.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}