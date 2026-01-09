"use client";

import { useState } from "react";

export default function SubmitPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    title: "",
    story: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newStory = {
      name: form.name,
      email: form.email,
      title: form.title,
      story: form.story,
      date: new Date().toLocaleDateString(),
    };

    try {
      const res = await fetch("/api/save?file=submissions.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStory),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Error submitting story. Please try again.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("There was a problem connecting to the server.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="flex flex-col items-center justify-center h-screen text-center text-[#47549e]">
        <h1 className="text-3xl font-bold mb-4">Thank you for sharing your story!</h1>
        <p className="text-lg text-gray-600 max-w-xl">
          Your submission has been received and will appear in our pending review list shortly.
        </p>
        <a
          href="/"
          className="mt-6 inline-block bg-[#82b0d5] text-white px-6 py-3 rounded hover:bg-[#47549e] transition"
        >
          Return Home
        </a>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-[#47549e] mb-8 text-center">
        Share Your Story
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-[#f9fafb] p-8 rounded-lg shadow-lg"
      >
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#82b0d5]"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#82b0d5]"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Story Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#82b0d5]"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Your Story</label>
          <textarea
            name="story"
            value={form.story}
            onChange={handleChange}
            required
            rows={6}
            className="w-full p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-[#82b0d5]"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#82b0d5] text-white hover:bg-[#47549e]"
          }`}
        >
          {loading ? "Submitting..." : "Submit Story"}
        </button>
      </form>
    </main>
  );
}
