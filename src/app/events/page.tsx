"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, SearchX } from "lucide-react";
import api from "@/lib/api";
import { Event } from "@/types";
import EventCard from "@/components/events/EventCard";
import SkeletonCard from "@/components/events/SkeletonCard";
import EventFilters from "@/components/events/EventFilters";

function ExploreContent() {
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [priceType, setPriceType] = useState("");
  const [sort, setSort] = useState("date");
  const [page, setPage] = useState(1);

  const [events, setEvents] = useState<Event[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await api.get("/events", {
        params: { search, category, priceType, sort, page, limit: 8 },
      });
      setEvents(res.data.events);
      setTotalPages(res.data.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch events", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, priceType, sort, page]);

  const handleSearchSubmit = () => {
    setPage(1);
    fetchEvents();
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Explore Events</h1>
          <p className="mt-1 text-slate-500 text-sm">
            Find concerts, workshops, and meetups happening around you
          </p>
        </div>

        <EventFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={(v) => {
            setCategory(v);
            setPage(1);
          }}
          priceType={priceType}
          setPriceType={(v) => {
            setPriceType(v);
            setPage(1);
          }}
          sort={sort}
          setSort={setSort}
          onSubmit={handleSearchSubmit}
        />

        {/* Results grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          ) : events.length > 0 ? (
            events.map((event) => <EventCard key={event._id} event={event} />)
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
              <SearchX size={40} className="text-slate-300 mb-3" />
              <p className="text-slate-500 font-medium">No events found</p>
              <p className="text-sm text-slate-400 mt-1">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 disabled:opacity-40 hover:bg-slate-50"
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium ${
                  p === page
                    ? "bg-violet-600 text-white"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 disabled:opacity-40 hover:bg-slate-50"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <ExploreContent />
    </Suspense>
  );
}