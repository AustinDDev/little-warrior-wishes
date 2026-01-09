"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export default function DonatePage() {
  return (
    <main className="bg-white text-gray-800 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative bg-[#82b0d5] text-white text-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/donate-hero.jpg"
            alt=""
            fill
            className="object-cover object-center opacity-25"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#47549e]/40 to-[#82b0d5]/40"></div>

        <div className="relative z-10 py-28 px-6 max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl font-extrabold">Donate & Make a Difference</h1>
          <p className="text-lg leading-relaxed text-gray-100">
            Every donation helps bring hope, connection, and joy to families of children with complex medical needs.
          </p>
        </div>
      </section>

      {/* WHY DONATIONS MATTER */}
      <motion.section {...fadeIn} className="max-w-6xl mx-auto px-6 py-20 text-center space-y-10">
        <h2 className="text-4xl font-bold text-[#47549e]">Your Generosity Creates Hope</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          When you give to Little Warrior Wishes, you help us organize inclusive events, support families, and create lasting memories.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {[
            { icon: "🌸", title: "Family Events", text: "Your donations fund adaptive family events, giving children and caregivers a place to laugh and connect." },
            { icon: "💙", title: "Memory Creation", text: "Help families make unforgettable memories during challenging seasons." },
            { icon: "🕊️", title: "Community Support", text: "Every gift strengthens our community, bringing hope and belonging." },
          ].map((item, i) => (
            <motion.div
              key={i}
              {...fadeIn}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-[#f9fafb] p-8 rounded-lg shadow hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-semibold text-[#47549e] mb-3">
                  {item.icon} {item.title}
                </h3>
                <p className="text-gray-700">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* WAYS TO GIVE */}
      <motion.section {...fadeIn} className="bg-[#f1f5f9] py-20">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-10">
          <h2 className="text-4xl font-bold text-[#47549e]">Ways to Give</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Choose the option that works best for you — every dollar helps make memories that matter.
          </p>

          <div className="grid md:grid-cols-3 gap-10 mt-12">
            {[
              {
                logo: "/images/paypal.jpg",
                title: "PayPal",
                link: "https://www.paypal.com/donate",
                text: "Make a one-time or recurring donation through PayPal — quick, secure, and trusted worldwide.",
              },
              {
                logo: "/images/venmologo.jpg",
                title: "Venmo",
                link: "https://venmo.com",
                text: "Prefer Venmo? You can send donations directly to @LittleWarriorWishes.",
              },
              {
                logo: "/images/donorbox.jpg",
                title: "Donorbox",
                link: "https://donorbox.org",
                text: "Use Donorbox to set up automated recurring donations and manage giving securely.",
              },
            ].map((opt, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition transform hover:scale-105 flex flex-col justify-between h-full"
              >
                <div>
                  <Image
                    src={opt.logo}
                    alt={opt.title}
                    width={100}
                    height={50}
                    className="mx-auto mb-6"
                  />
                  <p className="text-gray-700 mb-4">{opt.text}</p>
                </div>
                <a
                  href={opt.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#82b0d5] text-white px-6 py-3 rounded hover:bg-[#47549e] transition font-semibold mt-auto"
                >
                  Donate via {opt.title}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FINAL CTA */}
<motion.section
  {...fadeIn}
  className="bg-[#47549e] text-white py-24 text-center px-6"
>
  <div className="max-w-3xl mx-auto flex flex-col items-center justify-center space-y-6">
    <h2 className="text-4xl font-bold leading-snug">
      Join Our Mission of Hope
    </h2>
    <p className="text-lg max-w-2xl mx-auto text-gray-200 leading-relaxed">
      Your support fuels our ability to bring comfort, joy, and connection
      to families who need it most. <br className="hidden sm:block" />
      Every gift matters.
    </p>
    <Link
      href="/contact"
      className="bg-white text-[#47549e] px-8 py-3 rounded font-semibold hover:bg-gray-100 transition text-lg shadow-md hover:shadow-lg"
    >
      Contact Us to Get Involved
    </Link>
  </div>
</motion.section>
</main>
);
}
