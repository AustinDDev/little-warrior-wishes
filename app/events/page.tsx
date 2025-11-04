"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export default function EventsPage() {
  // You can add more events here later
  const upcomingEvents = [
    {
      title: "Halloween Party 2025 🎃",
      date: "October 25, 2025",
      image: "/images/halloween2025.jpg",
      description:
        "Join us for our 4th Annual Halloween Party! Costumes, crafts, and community fun await families of all ages.",
    },
  ];

  const pastEvents = [
    {
      title: "Playground Groundbreaking",
      image: "/images/playgroundgroundbreaking.jpg",
    },
    {
      title: "Memorial Butterfly Release",
      image: "/images/bluecarriage.jpeg",
    },
    {
      title: "Book Drive",
      image: "/images/bookdrive.jpg",
    },
    {
      title: "Community Butterfly Release",
      image: "/images/butterflyevent2025.jpg",
    },
    {
      title: "Holiday Celebration",
      image: "/images/bluebuggy.jpeg",
    },
    {
      title: "Boat Race Fundraiser",
      image: "/images/boatracefundraiser.jpg",
    },
  ];

  return (
    <main className="bg-white text-gray-800 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative bg-[#82b0d5] text-white text-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/events-hero.jpg"
            alt="Little Warrior Wishes community event"
            fill
            className="object-cover object-center opacity-25"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#47549e]/40 to-[#82b0d5]/40"></div>

        <div className="relative z-10 py-28 px-6 max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl font-extrabold">Our Events</h1>
          <p className="text-lg leading-relaxed text-gray-100">
            Bringing families together through connection, joy, and shared
            memories.
          </p>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <motion.section
        {...fadeIn}
        initial="initial"
        animate="animate"
        className="max-w-6xl mx-auto px-6 py-20 text-center"
      >
        <h2 className="text-4xl font-bold text-[#47549e] mb-12">
          Upcoming Events
        </h2>

        <div
          className={
            upcomingEvents.length === 1
              ? "flex justify-center flex-wrap gap-10"
              : "grid md:grid-cols-3 gap-10"
          }
        >
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-[#f9fafb] rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col justify-between max-w-md mx-auto"
            >
              <Image
                src={event.image}
                alt={event.title}
                width={600}
                height={400}
                className="w-full h-52 object-cover"
              />
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-2xl font-semibold text-[#47549e] mb-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">{event.date}</p>
                  <p className="text-gray-700 mb-6">{event.description}</p>
                </div>
                <Link
                  href="/contact"
                  className="inline-block bg-[#82b0d5] text-white px-5 py-2 rounded hover:bg-[#47549e] transition font-semibold self-center mt-auto"
                >
                  RSVP / Volunteer
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* PAST EVENTS */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-[#f1f5f9] py-20"
      >
        <div className="max-w-6xl mx-auto px-6 text-center space-y-10">
          <h2 className="text-4xl font-bold text-[#47549e]">
            Past Events & Highlights
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Every event is an opportunity to make memories that inspire and
            connect. Here’s a glimpse of our recent gatherings filled with
            laughter, love, and light.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {pastEvents.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="rounded-lg shadow hover:shadow-xl overflow-hidden bg-white transition"
              >
                <Image
                  src={event.image}
                  alt={event.title}
                  width={500}
                  height={400}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-[#47549e]">
                    {event.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FINAL CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-[#47549e] text-white text-center py-24 px-6"
      >
        <div className="max-w-3xl mx-auto flex flex-col items-center justify-center space-y-6">
          <h2 className="text-4xl font-bold leading-snug">
            Be Part of the Next Memory
          </h2>
          <p className="text-lg text-gray-200 leading-relaxed">
            Every event helps us bring connection and comfort to families in
            need. Join us, volunteer, or simply come share a smile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link
              href="/contact"
              className="bg-white text-[#47549e] px-6 py-3 rounded font-semibold hover:bg-gray-100 transition"
            >
              Volunteer with Us
            </Link>
            <Link
              href="/donate"
              className="border border-white px-6 py-3 rounded font-semibold hover:bg-[#82b0d5] transition"
            >
              Support an Event
            </Link>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
