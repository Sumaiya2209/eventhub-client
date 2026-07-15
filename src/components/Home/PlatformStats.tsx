"use client";

import { useEffect, useState } from "react";
import { Calendar, MapPin, MessageCircle, Star } from "lucide-react";
import api from "@/lib/api";

interface Stats {
  totalEvents: number;
  totalCities: number;
  totalReviews: number;
  avgRating: string;
}

export default function PlatformStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/events/stats");
        setStats(res.data.stats);
      } catch (error) {
        console.error("Failed to fetch platform stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const displayStats = [
    { icon: Calendar, value: stats?.totalEvents ?? 0, label: "Events Hosted" },
    { icon: MapPin, value: stats?.totalCities ?? 0, label: "Cities Covered" },
    { icon: MessageCircle, value: stats?.totalReviews ?? 0, label: "Community Reviews" },
    { icon: Star, value: stats?.avgRating ?? "0.0", label: "Average Rating" },
  ];

  return (
    <section className="py-16 bg-gradient-to-br max-w-7xl mx-auto rounded-2xl from-violet-700 via-violet-600 to-indigo-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {displayStats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center text-white">
              <Icon className="mx-auto mb-2 text-amber-400" size={26} />
              <p className="text-3xl font-bold">
                {loading ? (
                  <span className="inline-block w-10 h-7 bg-white/20 rounded animate-pulse" />
                ) : (
                  value
                )}
              </p>
              <p className="mt-1 text-sm text-violet-100">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}