"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xpqqaplr";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Formspree can redirect back with ?sent=1 or ?error=1
    const params = new URLSearchParams(window.location.search);
    if (params.get("sent") === "1") setStatus("success");
    if (params.get("error") === "1") setStatus("error");

    // optional: clean URL
    if (params.get("sent") === "1" || params.get("error") === "1") {
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  return (
    <main className="bg-white text-gray-800">
      {/* Header Section */}
      <section className="relative bg-[#82b0d5] text-white py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/contact-bg.jpg')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl font-extrabold">Get in Touch</h1>
          <p className="text-lg leading-relaxed">
            Whether you’d like to volunteer, share your story, or simply learn
            more, we’d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <motion.section
        className="max-w-4xl mx-auto px-6 py-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl font-bold text-[#47549e]">Contact Us</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Fill out the form below and we’ll respond as soon as possible.
          </p>
        </div>

        {/* ✅ Native POST to Formspree (most reliable on Vercel) */}
        <form
          action={FORMSPREE_ENDPOINT}
          method="POST"
          className="bg-[#f9fafb] p-8 rounded-lg shadow-lg space-y-6"
          aria-label="Contact form"
        >
          {/* Helpful metadata */}
          <input type="hidden" name="_subject" value="New Contact Form Message" />
          <input type="hidden" name="_format" value="plain" />

          {/* Redirect back to your page (adjust if your route is not /contact) */}
          <input type="hidden" name="_next" value="/contact?sent=1" />

          {/* Optional: honeypot to reduce spam */}
          <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

          <div>
            <label
              htmlFor="name"
              className="block text-left font-semibold text-[#47549e] mb-2"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your full name"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#82b0d5]"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-left font-semibold text-[#47549e] mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#82b0d5]"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-left font-semibold text-[#47549e] mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Write your message here..."
              rows={6}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#82b0d5]"
            />
          </div>

          {/* ✅ Submit button: plain HTML button for maximum reliability */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <button
              type="submit"
              className="w-full bg-[#82b0d5] text-white font-semibold py-3 rounded-lg hover:bg-[#47549e] transition"
            >
              Send Message
            </button>
          </motion.div>

          {status === "success" && (
            <p className="text-center text-green-700 font-medium">
              ✅ Your message has been sent successfully!
            </p>
          )}

          {status === "error" && (
            <p className="text-center text-red-700 font-medium">
              ❌ Something went wrong. Please try again.
            </p>
          )}
        </form>
      </motion.section>

      {/* Volunteer CTA Section */}
      <motion.section
        className="bg-[#47549e] text-white text-center py-24 px-6"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="max-w-3xl mx-auto flex flex-col items-center space-y-6"
          initial={{ opacity: 0, y: 30 }}
