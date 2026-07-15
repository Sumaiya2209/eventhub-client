"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Button from "@/components/ui/Button";

interface FormData {
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  date: string;
  location: string;
  price: string;
  isFree: boolean;
  imageUrl: string;
}

interface FormErrors {
  [key: string]: string;
}

const categories = ["Concert", "Conference", "Sports", "Festival", "Workshop", "Talk Show"];

export default function AddEventForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    title: "",
    shortDescription: "",
    fullDescription: "",
    category: "Concert",
    date: "",
    location: "",
    price: "",
    isFree: false,
    imageUrl: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.shortDescription.trim())
      newErrors.shortDescription = "Short description is required";
    if (!form.fullDescription.trim())
      newErrors.fullDescription = "Full description is required";
    if (!form.date) newErrors.date = "Date is required";
    if (!form.location.trim()) newErrors.location = "Location is required";
    if (!form.isFree && (!form.price || Number(form.price) <= 0))
      newErrors.price = "Enter a valid price or mark as free";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    setLoading(true);
    try {
      await api.post("/events", {
        ...form,
        price: form.isFree ? 0 : Number(form.price),
        imageUrl:
          form.imageUrl ||
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
      });
      router.push("/events/manage");
    } catch (error: any) {
      setServerError(
        error?.response?.data?.message || "Failed to create event. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full px-3.5 py-2.5 border rounded-xl text-sm bg-white transition-colors focus:outline-none focus:ring-2 ${
      errors[field]
        ? "border-red-300 focus:ring-red-200"
        : "border-slate-200 focus:ring-violet-200 focus:border-violet-400"
    }`;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {serverError && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 p-2.5 rounded-lg">
          {serverError}
        </p>
      )}

      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1.5">Event Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="e.g. Sylhet Music Festival 2026"
          className={inputClass("title")}
        />
        {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1.5">
          Short Description
        </label>
        <input
          name="shortDescription"
          value={form.shortDescription}
          onChange={handleChange}
          placeholder="A one-line summary of your event"
          className={inputClass("shortDescription")}
        />
        {errors.shortDescription && (
          <p className="mt-1 text-xs text-red-600">{errors.shortDescription}</p>
        )}
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1.5">
          Full Description
        </label>
        <textarea
          name="fullDescription"
          value={form.fullDescription}
          onChange={handleChange}
          rows={4}
          placeholder="Describe your event in detail..."
          className={inputClass("fullDescription")}
        />
        {errors.fullDescription && (
          <p className="mt-1 text-xs text-red-600">{errors.fullDescription}</p>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className={inputClass("category")}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className={inputClass("date")}
          />
          {errors.date && <p className="mt-1 text-xs text-red-600">{errors.date}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1.5">Location</label>
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="e.g. Sylhet, Bangladesh"
          className={inputClass("location")}
        />
        {errors.location && <p className="mt-1 text-xs text-red-600">{errors.location}</p>}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isFree"
          name="isFree"
          checked={form.isFree}
          onChange={handleChange}
          className="w-4 h-4 accent-violet-600"
        />
        <label htmlFor="isFree" className="text-sm text-slate-600">
          This event is free
        </label>
      </div>

      {!form.isFree && (
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5">
            Price (৳)
          </label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="e.g. 500"
            className={inputClass("price")}
          />
          {errors.price && <p className="mt-1 text-xs text-red-600">{errors.price}</p>}
        </div>
      )}

      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1.5">
          Image URL <span className="text-slate-400 font-normal">(optional)</span>
        </label>
        <input
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="https://..."
          className={inputClass("imageUrl")}
        />
      </div>

      <Button type="submit" fullWidth disabled={loading} className="!py-2.5 !rounded-xl">
        {loading ? "Publishing..." : "Publish Event"}
      </Button>
    </form>
  );
}