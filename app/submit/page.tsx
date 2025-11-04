"use client";

import { useState } from "react";

export default function SubmitPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      let imageUrl = "";

      // Step 1: Upload image if provided
      if (image) {
        const formData = new FormData();
        formData.append("file", image);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const uploadResult = await uploadRes.json();
        if (!uploadRes.ok)
          throw new Error(uploadResult.error || "Upload failed");

        imageUrl = uploadResult.url;
      }

      // Step 2: Save story submission
      const res = await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          author,
          content,
          image: imageUrl,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("✅ Story submitted successfully!");
        setTitle("");
        setAuthor("");
        setContent("");
        setImage(null);
        setPreview(null);
      } else {
        throw new Error(data.error || "Failed to save submission");
      }
    } catch (err: any) {
      console.error("Submit error:", err);
      setStatus(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-gray-800">
      <h1 className="text-4xl font-bold text-[#47549e] mb-8 text-center">
        Share Your Story 💙
      </h1>
      <p className="text-center text-gray-600 mb-10">
        Your experiences can inspire others. Share your story to help families
        find hope, connection, and comfort.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg space-y-6"
      >
        <div>
          <label className="block text-sm font-semibold mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#82b0d5]"
            placeholder="Enter a title for your story"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Your Name</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#82b0d5]"
            placeholder="Who is sharing this story?"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Story</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={6}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#82b0d5]"
            placeholder="Share your story here..."
          />
        </div>

        <div>
          <label htmlFor="image-upload" className="block text-sm font-semibold mb-2">
            Upload an Image (optional)
          </label>
          <input
            id="image-upload"
            title="Upload an image for your story (optional)"
            placeholder="Choose an image..."
            aria-label="Upload an image (optional)"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />

          {preview && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 mb-2">Preview:</p>
              <img
                src={preview}
                alt="Preview"
                className="max-h-64 mx-auto rounded-lg shadow-md"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#47549e] text-white py-3 rounded-lg font-semibold hover:bg-[#3c4688] transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit My Story"}
        </button>

        {status && (
          <p
            className={`text-center font-medium ${
              status.startsWith("✅")
                ? "text-green-600"
                : status.startsWith("❌")
                ? "text-red-600"
                : "text-gray-700"
            }`}
          >
            {status}
          </p>
        )}
      </form>
    </main>
  );
}
