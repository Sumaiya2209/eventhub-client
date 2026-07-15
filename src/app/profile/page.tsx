"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Calendar, LogOut, PartyPopper, ArrowRight } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";
import api from "@/lib/api";
import Button from "@/components/ui/Button";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [eventCount, setEventCount] = useState<number | null>(null);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/signin");
    }
  }, [isPending, session, router]);

  useEffect(() => {
    const fetchMyEventCount = async () => {
      try {
        const res = await api.get("/events/my-events");
        setEventCount(res.data.events.length);
      } catch (error) {
        setEventCount(0);
      }
    };
    if (session?.user) fetchMyEventCount();
  }, [session]);

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  if (isPending || !session?.user) {
    return <div className="min-h-screen bg-slate-50" />;
  }

  const user = session.user;
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  const joinDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile header card */}
        <div className="bg-gradient-to-br from-violet-700 via-violet-600 to-indigo-700 rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-6 right-8 w-16 h-16 rounded-2xl bg-amber-400/20 rotate-12" />
          <div className="absolute bottom-6 left-10 w-10 h-10 rounded-full bg-white/10" />

          <div className="relative z-10 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/15 border-2 border-white/30 flex items-center justify-center text-xl font-bold">
              {initials}
            </div>
            <div>
              <h1 className="text-xl font-bold">{user.name}</h1>
              <p className="text-sm text-violet-100 flex items-center gap-1.5 mt-1">
                <Mail size={13} /> {user.email}
              </p>
              {joinDate && (
                <p className="text-xs text-violet-200 flex items-center gap-1.5 mt-1">
                  <Calendar size={12} /> Joined {joinDate}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Stats + quick actions */}
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-violet-100 text-violet-700 mb-3">
              <PartyPopper size={18} />
            </div>
            <p className="text-2xl font-bold text-slate-900">
              {eventCount === null ? "—" : eventCount}
            </p>
            <p className="text-sm text-slate-500 mt-1">Events Posted</p>
          </div>

          <Link
            href="/events/manage"
            className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:border-violet-300 hover:shadow-sm transition-all"
          >
            <div>
              <p className="font-medium text-slate-900">Manage Your Events</p>
              <p className="text-sm text-slate-500 mt-1">
                View, edit, or delete events you've posted
              </p>
            </div>
            <span className="flex items-center gap-1 text-sm text-violet-600 font-medium mt-3">
              Go to Manage Events <ArrowRight size={14} />
            </span>
          </Link>
        </div>

        {/* Actions */}
        <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Account</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/events/add" className="flex-1">
              <Button fullWidth variant="outline">
                Post a New Event
              </Button>
            </Link>
            <button
              onClick={handleLogout}
              className="flex-1 flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-medium text-red-600 border border-red-200 hover:bg-red-50 transition-colors"
            >
              <LogOut size={15} /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}