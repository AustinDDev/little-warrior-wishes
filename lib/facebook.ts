// lib/facebook.ts

export type FbPost = {
  id: string;
  message?: string;
  created_time: string;
  permalink_url?: string;
  full_picture?: string;
};

const RAW_GRAPH = process.env.FB_GRAPH_VERSION || "v24.0";
const GRAPH = RAW_GRAPH.startsWith("v") ? RAW_GRAPH : `v${RAW_GRAPH}.0`;

const PAGE_ID = process.env.FB_PAGE_ID;
const TOKEN = process.env.FB_PAGE_TOKEN;

const POST_FIELDS = "message,created_time,permalink_url,full_picture";

async function callFacebook<T>(
  edge: string,
  params: Record<string, string>
): Promise<T | null> {
  if (!PAGE_ID || !TOKEN) {
    console.error("Missing FB_PAGE_ID or FB_PAGE_TOKEN in environment");
    return null;
  }

  const search = new URLSearchParams({
    access_token: TOKEN,
    ...params,
  });

  // NOTE: using /feed here instead of /posts
  const url = `https://graph.facebook.com/${GRAPH}/${PAGE_ID}/${edge}?${search.toString()}`;
  console.log("Fetching from Facebook:", url);

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    console.error("Facebook error:", res.status, await res.text());
    return null;
  }

  const json = (await res.json()) as any;
  return json as T;
}

export async function fetchFacebookPosts(limit = 10): Promise<FbPost[]> {
  const json = await callFacebook<{ data?: FbPost[] }>("feed", {
    fields: POST_FIELDS,
    limit: String(limit),
  });

  return json?.data ?? [];
}
