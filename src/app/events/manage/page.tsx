"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Eye, Plus } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import api from "@/lib/api";
import { Event } from "@/types";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function ManageEventsPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/signin");
    }
  }, [isPending, session, router]);

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const res = await api.get("/events/my-events");
        setEvents(res.data.events);
      } catch (error) {
        console.error("Failed to fetch your events", error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user) fetchMyEvents();
  }, [session]);

  const confirmDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await api.delete(`/events/${deleteId}`);
      setEvents((prev) => prev.filter((e) => e._id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      console.error("Failed to delete event", error);
    } finally {
      setDeleting(false);
    }
  };

  if (isPending || !session?.user) {
    return <div className="min-h-screen bg-slate-50" />;
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Manage Events</h1>
            <p className="mt-1 text-sm text-slate-500">Events you've posted on EventHub</p>
          </div>
          <Link href="/events/add">
            <Button className="!flex !items-center !gap-1.5">
              <Plus size={16} /> Add Event
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-20 bg-white rounded-xl animate-pulse" />
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl py-16 text-center">
            <p className="text-slate-500">You haven't posted any events yet.</p>
            <Link href="/events/add" className="inline-block mt-4">
              <Button>Post Your First Event</Button>
            </Link>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            {/* Table header — desktop only */}
            <div className="hidden sm:grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-5 py-3 bg-slate-50 text-xs font-medium text-slate-500 uppercase">
              <span>Image</span>
              <span>Title</span>
              <span>Date</span>
              <span>Category</span>
              <span>Actions</span>
            </div>

            <div className="divide-y divide-slate-100">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="flex flex-col sm:grid sm:grid-cols-[auto_1fr_auto_auto_auto] sm:items-center gap-3 sm:gap-4 px-5 py-4"
                >
                  <div className="relative w-full sm:w-14 h-32 sm:h-14 rounded-lg overflow-hidden shrink-0">
                    <Image src={event.imageUrl} alt={event.title} fill className="object-cover" />
                  </div>

                  <div>
                    <p className="font-medium text-slate-900 text-sm">{event.title}</p>
                    <p className="text-xs text-slate-500 sm:hidden mt-0.5">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                  </div>

                  <span className="hidden sm:block text-sm text-slate-500">
                    {new Date(event.date).toLocaleDateString()}
                  </span>

                  <span className="hidden sm:block">
                    <Badge text={event.category} variant="category" />
                  </span>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/events/${event._id}`}
                      className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
                    >
                      <Eye size={15} />
                    </Link>
                    <button
                      onClick={() => setDeleteId(event._id)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg border border-red-200 text-red-500 hover:bg-red-50"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Delete confirm modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="font-semibold text-slate-900">Delete this event?</h3>
            <p className="mt-2 text-sm text-slate-500">
              This action cannot be undone. The event will be permanently removed.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}