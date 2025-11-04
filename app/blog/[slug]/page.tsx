"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Story {
  slug: string;
  title: string;
  date: string;
  image?: string;
  story: string;
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStory = async () => {
      try {
        const res = await fetch("/api/get?file=stories.json");
        const data = await res.json();
        const found = data.find((item: Story) => item.slug === slug);
        setStory(found || null);
      } catch (error) {
        console.error("Error loading story:", error);
      } finally {
        setLoading(false);
      }
    };
    loadStory();
  }, [slug]);

  if (loading) {
    return <p className="text-center py-20 text-gray-600">Loading story...</p>;
  }

  if (!story) {
    return (
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h1 className="text-3xl font-bold text-[#47549e]">Story Not Found</h1>
        <Link
          href="/blog"
          className="inline-block mt-6 bg-[#82b0d5] text-white px-6 py-3 rounded hover:bg-[#47549e] transition"
        >
          Back to Blog
        </Link>
      </section>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-16 space-y-8">
      <h1 className="text-4xl font-bold text-[#47549e]">{story.title}</h1>
      <p className="text-gray-500">{story.date}</p>

      <Image
        src={story.image || "/images/default.jpg"}
        alt={story.title}
        width={800}
        height={400}
        className="w-full h-64 object-cover rounded-lg shadow-md"
      />

      <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
        {story.story}
      </div>

      <Link
        href="/blog"
        className="inline-block mt-10 bg-[#82b0d5] text-white px-6 py-3 rounded hover:bg-[#47549e] transition"
      >
        ← Back to All Posts
      </Link>
    </article>
  );
}
