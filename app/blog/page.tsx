"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/posts");
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Error loading posts:", err);
      }
    }
    fetchPosts();
  }, []);

  return (
    <main className="bg-white text-gray-800 overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-[#82b0d5] text-white py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/blog-bg.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl font-extrabold">Stories of Hope & Resilience</h1>
          <p className="text-lg leading-relaxed">
            Read heartfelt stories from families, volunteers, and our community — and share your own.
          </p>

          {/* CTA Button */}
          <Link
            href="/submit"
            className="inline-block bg-white text-[#47549e] px-6 py-3 rounded font-semibold hover:bg-gray-100 transition shadow"
          >
            ✨ Share Your Story
          </Link>
        </div>
      </section>

      {/* Posts Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-[#47549e] text-center mb-12">
          Community Stories
        </h2>

        {posts.length === 0 ? (
          <p className="text-center text-gray-600">
            No stories have been published yet. Check back soon or share yours above!
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-10">
            {posts.map((post, i) => (
              <motion.div
                key={i}
                className="bg-[#f9fafb] rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                {post.image && (
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-2xl font-semibold text-[#47549e] mb-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">{post.date}</p>
                    <p className="text-gray-700 mb-4 line-clamp-3">
                      {post.content.substring(0, 120)}...
                    </p>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-block mt-auto text-[#82b0d5] font-semibold hover:text-[#47549e] transition"
                  >
                    Read More →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
