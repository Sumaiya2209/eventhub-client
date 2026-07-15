"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Button from "@/components/ui/Button";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!form.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // No backend endpoint for contact messages — shown as success locally
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Get in Touch</h1>
          <p className="mt-3 text-slate-500 max-w-lg mx-auto">
            Have a question, feedback, or need help with your event? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Contact info */}
          <div className="md:col-span-2 space-y-5">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-start gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-violet-100 text-violet-700 shrink-0">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">Email</p>
                <p className="text-sm text-slate-500">support@eventhub.com</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-start gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-violet-100 text-violet-700 shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">Phone</p>
                <p className="text-sm text-slate-500">+880 1234-567890</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-start gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-violet-100 text-violet-700 shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">Address</p>
                <p className="text-sm text-slate-500">Sylhet, Bangladesh</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
            {submitted && (
              <p className="mb-4 text-sm text-green-700 bg-green-50 border border-green-100 p-2.5 rounded-lg">
                Thanks for reaching out! We'll get back to you soon.
              </p>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={`w-full px-3.5 py-2.5 border rounded-xl text-sm bg-white focus:outline-none focus:ring-2 ${
                    errors.name
                      ? "border-red-300 focus:ring-red-200"
                      : "border-slate-200 focus:ring-violet-200 focus:border-violet-400"
                  }`}
                />
                {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Email</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full px-3.5 py-2.5 border rounded-xl text-sm bg-white focus:outline-none focus:ring-2 ${
                    errors.email
                      ? "border-red-300 focus:ring-red-200"
                      : "border-slate-200 focus:ring-violet-200 focus:border-violet-400"
                  }`}
                />
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="How can we help?"
                  className={`w-full px-3.5 py-2.5 border rounded-xl text-sm bg-white focus:outline-none focus:ring-2 ${
                    errors.message
                      ? "border-red-300 focus:ring-red-200"
                      : "border-slate-200 focus:ring-violet-200 focus:border-violet-400"
                  }`}
                />
                {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
              </div>

              <Button type="submit" fullWidth className="!py-2.5 !rounded-xl flex items-center justify-center gap-2">
                <Send size={15} /> Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}