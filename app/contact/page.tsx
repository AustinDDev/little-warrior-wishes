"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xpqqaplr";

export default function Page() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    if (params.get("sent") === "1") setStatus("success");
    if (params.get("error") === "1") setStatus("error");

    // Clean URL after showing message
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
            Please fill out the form below and we’ll respond as soon as possible.
            You can also reach us directly via our social media links or email
            listed below.
          </p>
        </div>

        <form
          action={FORMSPREE_ENDPOINT}
          method="POST"
          className="bg-[#f9fafb] p-8 rounded-lg shadow-lg space-y-6"
          aria-label="Contact form"
        >
          {/* Formspree helper fields */}
          <input type="hidden" name="_subject" value="New Contact Form Message" />
          <input type="hidden" name="_format" value="plain" />

          {/* Redirect back after success (adjust if route isn't /contact) */}
          <input type="hidden" name="_next" value="/contact?sent=1" />

          {/* Honeypot */}
          <input
            type="text"
            name="_gotcha"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <div>
            <label
              htmlFor="name"
              className="block text-left font-semibold text-[#47549e] mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your full name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#82b0d5]"
              required
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
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#82b0d5]"
              required
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
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#82b0d5]"
              required
            />
          </div>

          {/* ✅ Submit: plain button (Formspree-safe) */}
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
      {/* Alternate Contact Method */}
<div className="mt-10 pt-8 border-t border-gray-200 text-center space-y-4">
  <p className="text-gray-700 text-lg">
    Little Warrior Wishes Memory Trip Application
  </p>

  <a
    href="https://docs.google.com/forms/d/e/1FAIpQLScz7Np4_ICWar4dn23wOARkqqphtY623ses-vEtcqTeKL1mIQ/viewform?usp=sf_link"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block bg-white border-2 border-[#47549e] text-[#47549e] font-semibold px-8 py-3 rounded-lg hover:bg-[#47549e] hover:text-white transition"
  >
    Fill Out Our Google Form
  </a>
</div>
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
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-4xl font-bold">Join Our Volunteer Team</h2>
          <p className="text-lg text-gray-200 leading-relaxed">
            Volunteers are the heartbeat of Little Warrior Wishes. Whether it’s
            helping at events, organizing donations, or simply lending a hand,
            your time makes an incredible difference.
          </p>
          <Link
            href="/events"
            className="bg-white text-[#47549e] px-8 py-3 rounded font-semibold hover:bg-gray-100 transition text-lg shadow-md hover:shadow-lg"
          >
            View Upcoming Events
          </Link>
        </motion.div>
      </motion.section>

      {/* Contact Details */}
      <motion.section
        className="max-w-4xl mx-auto px-6 py-20 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h3 className="text-3xl font-bold text-[#47549e] mb-8">
          Other Ways to Reach Us
        </h3>
        <div className="space-y-4 text-lg text-gray-700">
          <p>
            📧 Email:{" "}
            <a
              href="mailto:littlewarriorwishes@gmail.com"
              className="text-[#47549e] font-semibold hover:underline"
            >
              littlewarriorwishes@gmail.com
            </a>
          </p>
          <p>
            🌐 Social Media:{" "}
            <a
              href="https://linktr.ee/littlewarriorwishes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#47549e] font-semibold hover:underline"
            >
              linktr.ee/littlewarriorwishes
            </a>
          </p>
        </div>
      </motion.section>
    </main>
  );
}
