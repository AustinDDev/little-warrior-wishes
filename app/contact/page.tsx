"use client";

export default function Page() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Contact</h1>

      <form action="https://formspree.io/f/xpqqaplr" method="POST">
        <p>
          <label>
            Name<br />
            <input name="name" required />
          </label>
        </p>

        <p>
          <label>
            Email<br />
            <input name="email" type="email" required />
          </label>
        </p>

        <p>
          <label>
            Message<br />
            <textarea name="message" rows={6} required />
          </label>
        </p>

        <button type="submit">Send</button>
      </form>
    </main>
  );
}
