"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Is Vote Lab secure?",
    answer:
      "Yes. Every vote is securely recorded and designed to help prevent duplicate voting.",
  },
  {
    question: "Can one university host multiple events?",
    answer:
      "Absolutely. Universities can create elections, awards, talent shows, and any other voting event.",
  },
  {
    question: "Can students vote on their phones?",
    answer:
      "Yes. Vote Lab is fully responsive and works on phones, tablets, and desktops.",
  },
  {
    question: "Can results be viewed live?",
    answer:
      "Yes. Organizers can enable live results or choose to reveal them after voting ends.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section 
    id="faq" 
    className="max-w-5xl mx-auto px-6 py-24"
    >
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold">
          Frequently Asked Questions
        </h2>

        <p className="text-slate-400 mt-4">
          Everything you need to know about Vote Lab.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={faq.question}
            className="rounded-xl border border-slate-800 bg-slate-900"
          >
            <button
              onClick={() =>
                setOpen(open === index ? null : index)
              }
              className="w-full text-left p-6 flex justify-between items-center"
            >
              <span className="font-semibold">
                {faq.question}
              </span>

              <span className="text-cyan-400 text-xl">
                {open === index ? "−" : "+"}
              </span>
            </button>

            {open === index && (
              <div className="px-6 pb-6 text-slate-400">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}