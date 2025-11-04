"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-[#82b0d5] text-white text-center py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/butterfly-bg.jpg')] bg-cover bg-center opacity-20"></div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl font-extrabold leading-tight">
            Create Memories. Inspire Hope.
          </h1>
          <p className="text-lg">
            "Little Warrior Wishes exists to assist families in creating
            lasting memories when time frames are limited."
          </p>

          <div className="flex justify-center gap-4 mt-6">
            <Link
              href="/donate"
              className="bg-white text-[#47549e] px-6 py-3 rounded font-semibold hover:bg-gray-100 transition"
            >
              Donate Now
            </Link>
            <Link
              href="/about"
              className="bg-[#47549e] text-white px-6 py-3 rounded font-semibold hover:bg-[#3a468e] transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center space-y-12">
        <h2 className="text-4xl font-bold text-[#47549e]">
          Together, We Make Every Moment Matter
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Little Warrior Wishes was founded on love, resilience, and hope.
          Through community events, adaptive programs, and personalized support,
          we empower families facing unimaginable journeys to create lasting
          memories filled with joy and connection.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="bg-[#f9fafb] p-8 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold text-[#47549e] mb-3">
              💙 Connection
            </h3>
            <p className="text-gray-700">
              Building a community where families and caregivers can find
              comfort, understanding, and friendship.
            </p>
          </div>
          <div className="bg-[#f9fafb] p-8 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold text-[#47549e] mb-3">
              🌼 Compassion
            </h3>
            <p className="text-gray-700">
              Supporting one another with empathy and kindness through shared
              experiences and meaningful activities.
            </p>
          </div>
          <div className="bg-[#f9fafb] p-8 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold text-[#47549e] mb-3">
              🦋 Memories
            </h3>
            <p className="text-gray-700">
              Creating moments that bring light and love, even in the most
              challenging times.
            </p>
          </div>
        </div>
      </section>

      {/* Recent Events / Blog Preview */}
      <section className="bg-[#f1f5f9] py-20">
        <div className="max-w-6xl mx-auto px-6 text-center space-y-10">
          <h2 className="text-4xl font-bold text-[#47549e]">
            Our Latest Stories
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Discover how Little Warrior Wishes is making a difference in our
            community — one event, one family, one smile at a time.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-10">
            {[
              {
                title: "A Garden of Hope Blooms 🌸",
                link: "/blog/butterfly-garden",
                image: "/images/butterfly-garden.jpg",
              },
              {
                title: "Memories in Motion: Summer Play Day ☀️",
                link: "/blog/summer-playday",
                image: "/images/summer-playday.jpg",
              },
              {
                title: "Thank You to Our Volunteers 💙",
                link: "/blog/volunteers",
                image: "/images/volunteers.jpg",
              },
            ].map((post, i) => (
              <Link
                href={post.link}
                key={i}
                className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden text-left"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-[#47549e] mb-2">
                    {post.title}
                  </h3>
                  <p className="text-[#82b0d5] font-medium">Read More →</p>
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/blog"
            className="inline-block mt-8 bg-[#82b0d5] text-white px-6 py-3 rounded hover:bg-[#47549e] transition"
          >
            View All Stories
          </Link>
        </div>
      </section>

      {/* Donate CTA Section */}
      <section className="bg-[#47549e] text-white text-center py-20 px-6 space-y-8">
        <h2 className="text-4xl font-bold">Your Support Makes Hope Possible</h2>
        <p className="text-lg max-w-2xl mx-auto text-gray-200">
          Every donation helps us create moments of love, joy, and connection
          for families navigating life-limiting diagnoses. Together, we can make
          a difference.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/donate"
            className="bg-white text-[#47549e] px-6 py-3 rounded font-semibold hover:bg-gray-100 transition"
          >
            Donate Now
          </Link>
          <Link
            href="/contact"
            className="border border-white text-white px-6 py-3 rounded font-semibold hover:bg-[#82b0d5] transition"
          >
            Get Involved
          </Link>
        </div>
      </section>
    </main>
  );
}
