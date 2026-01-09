"use client";

import { useEffect, useState } from "react";

interface Story {
  name: string;
  email: string;
  title: string;
  story: string;
  date: string;
}

export default function AdminReviewPage() {
  const [submissions, setSubmissions] = useState<Story[]>([]);
  const [approved, setApproved] = useState<Story[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subRes = await fetch("/api/get?file=submissions.json");
        const approvedRes = await fetch("/api/get?file=stories.json");

        const subs = await subRes.json();
        const appr = await approvedRes.json();

        setSubmissions(subs || []);
        setApproved(appr || []);
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };

    fetchData();
  }, []);

  const handleApprove = async (story: Story, index: number) => {
    try {
      await fetch("/api/save?file=stories.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(story),
      });

      // Remove from submissions
      const updatedSubs = submissions.filter((_, i) => i !== index);
      setSubmissions(updatedSubs);

      await fetch("/api/save?file=submissions.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedSubs),
      });

      alert("Story approved and added to the blog!");
      window.location.reload();
    } catch (error) {
      console.error("Approve error:", error);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-[#47549e] text-center mb-12">
        Admin Review Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Pending Submissions */}
        <section>
          <h2 className="text-2xl font-bold text-[#47549e] mb-4">Pending Submissions</h2>
          {submissions.length === 0 ? (
            <p className="text-gray-600">No pending stories for review.</p>
          ) : (
            submissions.map((story, index) => (
              <div key={index} className="p-6 bg-[#f9fafb] rounded-lg shadow mb-6">
                <h3 className="text-xl font-semibold text-[#47549e] mb-2">{story.title}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  {story.name} – {story.date}
                </p>
                <p className="text-gray-700 mb-4">{story.story}</p>
                <button
                  onClick={() => handleApprove(story, index)}
                  className="bg-[#82b0d5] text-white px-4 py-2 rounded hover:bg-[#47549e] transition"
                >
                  Approve
                </button>
              </div>
            ))
          )}
        </section>

        {/* Approved Stories */}
        <section>
          <h2 className="text-2xl font-bold text-[#47549e] mb-4">Approved Stories</h2>
          {approved.length === 0 ? (
            <p className="text-gray-600">No approved stories yet.</p>
          ) : (
            approved.map((story, index) => (
              <div key={index} className="p-6 bg-[#f9fafb] rounded-lg shadow mb-6">
                <h3 className="text-xl font-semibold text-[#47549e] mb-2">{story.title}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  {story.name} – {story.date}
                </p>
                <p className="text-gray-700">{story.story}</p>
              </div>
            ))
          )}
        </section>
      </div>
    </main>
  );
}
