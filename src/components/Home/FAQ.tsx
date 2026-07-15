"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I post my own event?",
    answer:
      "Create an account, then go to 'Add Event' from the navbar. Fill in the details like title, date, location, and price, then submit.",
  },
  {
    question: "Is it free to browse events?",
    answer: "Yes, browsing and searching events is completely free for everyone.",
  },
  {
    question: "Can I edit or remove an event I posted?",
    answer:
      "Yes, go to 'Manage Events' from the navbar to view and delete events you've posted.",
  },
  {
    question: "How do I contact an event organizer?",
    answer:
      "Organizer details are visible on the event's details page once you view it.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={faq.question}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="text-sm font-medium text-slate-900">{faq.question}</span>
                <ChevronDown
                  size={18}
                  className={`text-slate-400 shrink-0 transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <p className="px-5 pb-4 text-sm text-slate-500">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}