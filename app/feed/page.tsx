import Link from "next/link";

const FACEBOOK_PAGE_URL =
  process.env.NEXT_PUBLIC_FACEBOOK_PAGE_URL ||
  "https://www.facebook.com/profile.php?id=100082898754331";

export default function NewsPage() {
  const encoded = encodeURIComponent(FACEBOOK_PAGE_URL);

  const pluginSrc = `https://www.facebook.com/plugins/page.php?href=${encoded}&tabs=timeline&width=500&height=975&small_header=false&adapt_container_width=false&hide_cover=false&show_facepile=true`;

  return (
    <div>
      {/* HERO HEADER (matches About page vibe) */}
      <section className="w-full bg-[#7f97c8] text-white">
        <div className="mx-auto max-w-5xl px-4 py-14 text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#47549e]">
            News
          </h1>
          <p className="text-lg sm:text-xl opacity-95">
            For the latest updates, events, and announcements, visit our Facebook page.
          </p>
        </div>
      </section>

      {/* PAGE CONTENT */}
      <div className="mx-auto max-w-3xl px-4 py-10 space-y-8">
        {/* Link box */}
        <section className="rounded-2xl border p-6 bg-white/70 shadow-sm space-y-3">
          <h2 className="text-xl font-semibold text-center">Latest updates</h2>
          <p className="opacity-80 text-center">
            Click below to view our full timeline on Facebook.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <Link
              href={FACEBOOK_PAGE_URL}
              target="_blank"
              className="inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium bg-[#47549e] text-white hover:opacity-90"
            >
              Open Facebook Updates
            </Link>

            <p className="text-sm opacity-70 break-all text-center">
              {FACEBOOK_PAGE_URL}
            </p>
          </div>
        </section>

        {/* Facebook timeline embed */}
        <section className="rounded-2xl border p-6 bg-white/70 shadow-sm space-y-3">
          <h2 className="text-xl font-semibold text-center">Facebook timeline</h2>
          <p className="text-sm opacity-70 text-center">
            If the embed does not load, use the button above to open Facebook directly.
          </p>

          <div className="flex justify-center pt-2">
            <div className="w-full max-w-[500px] rounded-xl">
              <iframe
                title="Little Warrior Wishes Facebook Page"
                src={pluginSrc}
                width="500"
                height="975"
                className="block"
                style={{ border: "none", width: "100%" }}
                scrolling="no"
                frameBorder="0"
                allow="encrypted-media; picture-in-picture; clipboard-write"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
