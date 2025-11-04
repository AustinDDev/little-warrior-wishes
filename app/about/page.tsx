"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export default function AboutPage() {
  return (
    <main className="bg-white text-gray-800">
      {/* HERO SECTION */}
      <section className="relative bg-[#82b0d5] text-white text-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/family-bg.jpg"
            alt="Families creating memories together"
            fill
            className="object-cover object-center opacity-25"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#47549e]/40 to-[#82b0d5]/40"></div>
        <div className="relative z-10 py-28 px-6 max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl font-extrabold">About Little Warrior Wishes</h1>
          <p className="text-lg leading-relaxed text-gray-100">
            A community built on love, hope, and the power of shared memories.
          </p>
        </div>
      </section>

      {/* OUR INSPIRATION SECTION */}
      <motion.section
        {...fadeIn}
        className="max-w-6xl mx-auto px-6 py-20 text-center space-y-10"
      >
        <h2 className="text-4xl font-bold text-[#47549e]">Our Inspiration</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Little Warrior Wishes was inspired by our own family's journey with our beloved
          daughter, <strong>Tala</strong>. Her strength, light, and spirit continue to guide
          everything we do. Through her story, we found a deeper understanding of love,
          resilience, and the importance of creating moments that matter.
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-10 mt-10">
          <div className="flex justify-center">
            <Image
              src="/images/heropicture.jpg"
              alt="Tala – the inspiration behind Little Warrior Wishes"
              width={400}
              height={400}
              className="rounded-xl shadow-lg object-cover"
              priority
            />
          </div>
          <div className="max-w-lg text-left">
            <p className="text-gray-700 leading-relaxed">
              Tala’s journey taught us that even in the most uncertain times, there is beauty,
              hope, and connection. Every smile, every memory, every small act of kindness
              carries her spirit forward. Her life is a reminder that love’s impact never fades.
            </p>
            <p className="text-gray-700 mt-4 leading-relaxed">
              Through Little Warrior Wishes, we honor her story by helping other families create
              those same lasting memories and connections — no matter where their journey leads.
            </p>
          </div>
        </div>
      </motion.section>

      {/* OUR MISSION */}
      <motion.section
        {...fadeIn}
        className="max-w-6xl mx-auto px-6 py-20 text-center space-y-10"
      >
        <h2 className="text-4xl font-bold text-[#47549e]">Our Mission</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Little Warrior Wishes was founded from a place of love, courage, and resilience.
          Our mission is to bring a sense of hope, connection, and community to families
          facing life-limiting or complex medical diagnoses.
        </p>
      </motion.section>

      {/* OUR STORY */}
      <motion.section
        {...fadeIn}
        className="bg-[#f1f5f9] py-20"
      >
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-[#47549e]">Our Story</h2>
            <p className="text-gray-700 leading-relaxed">
              Little Warrior Wishes began from our family's experience walking through
              the unknowns of a life-limiting diagnosis. Through that journey, we learned
              the importance of making memories and finding hope in every moment.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We created this nonprofit to ensure that every family navigating similar
              circumstances can find community, compassion, and the support they deserve.
            </p>
            <Link
              href="/events"
              className="inline-block bg-[#82b0d5] text-white px-6 py-3 rounded hover:bg-[#47549e] transition font-semibold"
            >
              See Our Events
            </Link>
          </div>
          <div className="flex justify-center">
            <Image
              src="/images/familypicture.jpg"
              alt="Founding family of Little Warrior Wishes"
              width={500}
              height={400}
              className="rounded-lg shadow-lg object-cover"
              priority
            />
          </div>
        </div>
      </motion.section>

      {/* VALUES SECTION */}
      <motion.section
        {...fadeIn}
        className="max-w-6xl mx-auto px-6 py-20 text-center"
      >
        <h2 className="text-4xl font-bold text-[#47549e] mb-12">What We Believe In</h2>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: "💙 Compassion",
              text: "Every family’s story matters. We approach every interaction with empathy and understanding.",
            },
            {
              title: "🦋 Connection",
              text: "Building lasting relationships between families, caregivers, and our community through shared experiences.",
            },
            {
              title: "🌼 Hope",
              text: "Inspiring families to see beauty, resilience, and strength in every season of their journey.",
            },
          ].map((value, i) => (
            <motion.div
              key={i}
              {...fadeIn}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="p-8 bg-[#f9fafb] rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-semibold text-[#47549e] mb-3">{value.title}</h3>
              <p className="text-gray-700">{value.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CLOSING CTA */}
      <motion.section
        {...fadeIn}
        className="bg-[#47549e] text-white py-20 text-center space-y-8"
      >
        <h2 className="text-4xl font-bold">Join Us in Inspiring Hope</h2>
        <p className="max-w-2xl mx-auto text-gray-200 text-lg">
          Whether through volunteering, donating, or sharing your story, your
          involvement helps us bring comfort, connection, and joy to families
          who need it most.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/donate"
            className="bg-white text-[#47549e] px-6 py-3 rounded font-semibold hover:bg-gray-100 transition"
          >
            Donate
          </Link>
          <Link
            href="/contact"
            className="border border-white px-6 py-3 rounded font-semibold hover:bg-[#82b0d5] transition"
          >
            Contact Us
          </Link>
        </div>
      </motion.section>
    </main>
  );
}
