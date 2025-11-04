"use client";

import { useEffect, useState } from "react";

export default function AdminReviewPage() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [approved, setApproved] = useState<any[]>([]);
  const [password, setPassword] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Load admin password from env
  const ADMIN_PASS =
    typeof window !== "undefined"
      ? process.env.NEXT_PUBLIC_ADMIN_PASS || "LittleWarriorSecure2025"
      : "";

  // ✅ Always declare hooks first (fix for hook order issue)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const subRes = await fetch("/api/get-submissions");
        const postsRes = await fetch("/api/posts");

        const subs = await subRes.json();
        const posts = await postsRes.json();

        setSubmissions(subs);
        setApproved(posts);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    if (authorized) fetchData();
  }, [authorized]);

  // ✅ Approve a story
  const handleApprove = async (story: any) => {
    try {
      const res = await fetch("/api/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(story),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to approve story.");

      setMessage(`Approved "${story.title}"`);
      setTimeout(() => setMessage(""), 3000);
      window.location.reload();
    } catch (error) {
      console.error("Approve error:", error);
      alert("Failed to approve post.");
    }
  };

  // 🗑 Delete a story
  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch("/api/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete post.");

      alert(`Deleted "${title}" successfully.`);
      window.location.reload();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete post.");
    }
  };

  // 🧭 Login Screen or Dashboard
  return (
    <main className="max-w-6xl mx-auto px-6 py-16 text-gray-800">
      {!authorized ? (
        // 🔐 LOGIN SCREEN
        <div className="flex flex-col items-center justify-center h-screen bg-[#f1f5f9] text-center px-6">
          <h1 className="text-3xl font-bold text-[#47549e] mb-4">
            Admin Access
          </h1>

          <div className="relative w-full max-w-sm">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-400 w-full px-4 py-2 rounded text-center"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-2 text-sm text-gray-600 hover:text-gray-800"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            onClick={() => {
              if (password === ADMIN_PASS) setAuthorized(true);
              else alert("Incorrect password. Try again.");
            }}
            className="mt-4 bg-[#47549e] text-white px-6 py-2 rounded hover:bg-[#3c4789] transition"
          >
            Access Dashboard
          </button>
        </div>
      ) : (
        // ✅ ADMIN DASHBOARD
        <>
          <h1 className="text-4xl font-bold text-[#47549e] text-center mb-10">
            Admin Review Dashboard
          </h1>

          {message && (
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-8 text-center">
              {message}
            </div>
          )}

          {/* 🟡 PENDING SUBMISSIONS */}
          <section className="mb-16">
            <h2 className="text-3xl font-semibold text-[#47549e] mb-6">
              Pending Submissions
            </h2>

            {submissions.length === 0 ? (
              <p className="text-gray-600">No pending submissions to review.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {submissions.map((story, index) => (
                  <div
                    key={story.id || index}
                    className="bg-[#f9fafb] p-6 rounded-xl shadow hover:shadow-lg transition"
                  >
                    <h3 className="text-2xl font-semibold text-[#47549e] mb-2">
                      {story.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      Submitted by: {story.name || "Anonymous"}
                    </p>
                    <p className="text-gray-700 mb-4 whitespace-pre-line">
                      {story.content}
                    </p>

                    {story.imageUrl && (
                      <img
                        src={story.imageUrl}
                        alt={story.title}
                        className="rounded-lg mb-4 w-full h-56 object-cover"
                      />
                    )}

                    <div className="flex gap-4">
                      <button
                        onClick={() => handleApprove(story)}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleDelete(story.id, story.title)}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* 🟢 APPROVED STORIES */}
          <section>
            <h2 className="text-3xl font-semibold text-[#47549e] mb-6">
              Approved Stories
            </h2>

            {approved.length === 0 ? (
              <p className="text-gray-600">No approved stories yet.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {approved.map((story, index) => (
                  <div
                    key={story.id || index}
                    className="bg-[#f9fafb] p-6 rounded-xl shadow space-y-4"
                  >
                    <h3 className="text-2xl font-semibold text-[#47549e]">
                      {story.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      Approved Story by {story.name || "Anonymous"}
                    </p>

                    {story.imageUrl && (
                      <img
                        src={story.imageUrl}
                        alt={story.title}
                        className="rounded-lg w-full h-56 object-cover"
                      />
                    )}

                    <p className="text-gray-700 whitespace-pre-line">
                      {story.content}
                    </p>

                    <button
                      onClick={() => handleDelete(story.id, story.title)}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                    >
                      Delete Post
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
}
