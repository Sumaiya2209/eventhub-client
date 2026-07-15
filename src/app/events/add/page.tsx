"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import AddEventForm from "@/components/events/AddEventForm";

export default function AddEventPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/signin");
    }
  }, [isPending, session, router]);

  if (isPending || !session?.user) {
    return <div className="min-h-screen bg-slate-50" />;
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Add New Event</h1>
        <p className="mt-1 text-sm text-slate-500 mb-8">
          Fill in the details below to publish your event
        </p>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
          <AddEventForm />
        </div>
      </div>
    </div>
  );
}