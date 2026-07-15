"use client";

import { Search, ArrowUpDown } from "lucide-react";

interface EventFiltersProps {
  search: string;
  setSearch: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  priceType: string;
  setPriceType: (v: string) => void;
  sort: string;
  setSort: (v: string) => void;
  onSubmit: () => void;
}

const categories = ["All", "Concert", "Conference", "Sports", "Festival", "Workshop", "Talk Show"];

export default function EventFilters({
  search,
  setSearch,
  category,
  setCategory,
  priceType,
  setPriceType,
  sort,
  setSort,
  onSubmit,
}: EventFiltersProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5">
      {/* Search */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
      >
        <Search size={18} className="text-slate-400 shrink-0" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search events by name..."
          className="flex-1 bg-transparent px-2.5 py-1 text-sm focus:outline-none"
        />
        <button
          type="submit"
          className="text-sm font-medium text-violet-600 hover:text-violet-800 px-2"
        >
          Search
        </button>
      </form>

      {/* Filters row */}
      <div className="mt-4 flex flex-wrap gap-3">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-200"
        >
          {categories.map((c) => (
            <option key={c} value={c === "All" ? "" : c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={priceType}
          onChange={(e) => setPriceType(e.target.value)}
          className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-200"
        >
          <option value="">All Prices</option>
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>

        <div className="flex items-center gap-1.5 ml-auto">
          <ArrowUpDown size={14} className="text-slate-400" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-200"
          >
            <option value="date">Soonest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
}