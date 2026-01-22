"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const FACEBOOK_PAGE_URL =
  process.env.NEXT_PUBLIC_FACEBOOK_PAGE_URL ||
  "https://www.facebook.com/p/Little-Warrior-Wishes-100082898754331/";

export default function NewsPage() {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const pluginSrc = useMemo(() => {
    const encoded = encodeURIComponent(FACEBOOK_PAGE_URL);
    // Responsive embed settings for desktop/tablet
    return `https://www.facebook.com/plugins/page.php?href=${encoded}&tabs=timeline&width=500&height=975&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`;
  }, []);

  // If the iframe never loads on desktop/tablet, show a fallback message
  useEffect(() => {
    const t = setTimeout(() => {
      // if it hasn't loaded in ~4s, we leave iframeLoaded false and show fallback text
    }, 4000);

    return () => clearTimeout(t);
  }, []);

  return (
    <div>
      {/* HERO HEADER */}
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

        {/* MOBILE: CTA INSTEAD OF EMBED */}
        <section className="rounded-2xl border p-6 bg-white/70 shadow-sm space-y-3 md:hidden">
          <h2 className="text-xl font-semibold text-center">Facebook timeline</h2>
          <p className="text-sm opacity-70 text-center">
            On iPhone, Facebook embeds can be blocked or disappear. Tap below to view the
            timeline directly on Facebook.
          </p>

          <div className="flex justify-center pt-2">
            <Link
              href={FACEBOOK_PAGE_URL}
              target="_blank"
              className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold bg-[#47549e] text-white hover:opacity-90"
            >
              View Timeline on Facebook
            </Link>
          </div>
        </section>

        {/* DESKTOP/TABLET: EMBED */}
        <section className="hidden md:block rounded-2xl border p-6 bg-white/70 shadow-sm space-y-3">
          <h2 className="text-xl font-semibold text-center">Facebook timeline</h2>
          <p className="text-sm opacity-70 text-center">
            If the embed does not load, use the button above to open Facebook directly.
          </p>

          <div className="flex justify-center pt-2">
            <div className="w-full max-w-[500px] rounded-xl overflow-hidden">
              {/* Give it real space so it can’t “collapse” */}
              <div className="min-h-[975px]">
                <iframe
                  title="Little Warrior Wishes Facebook Page"
                  src={pluginSrc}
                  className="block w-full"
                  style={{ border: "none", height: "975px" }}
                  scrolling="no"
                  frameBorder="0"
                  allow="encrypted-media; picture-in-picture; clipboard-write"
                  loading="lazy"
                  onLoad={() => setIframeLoaded(true)}
                />
              </div>
            </div>
          </div>

          {!iframeLoaded && (
            <p className="text-sm opacity-70 text-center pt-2">
              Having trouble loading the embed? Use the “Open Facebook Updates” button above.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
