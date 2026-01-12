"use client";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xpqqaplr";

export default function Page() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Contact</h1>

      <form action={FORMSPREE_ENDPOINT} method="POST">
        <input type="hidden" name="_subject" value="New Contact Form Message" />

        <div style={{ marginTop: 12 }}>
          <label>
            Name
            <br />
            <input name="name" required />
          </label>
        </div>

        <div style={{ marginTop: 12 }}>
          <label>
            Email
            <br />
            <input name="email" type="email" required />
          </label>
        </div>

        <div style={{ marginTop: 12 }}>
          <label>
            Message
            <br />
            <textarea name="message" rows={6} required />
          </label>
        </div>

        <button style={{ marginTop: 12 }} type="submit">
          Send
        </button>
      </form>
    </main>
  );
}
