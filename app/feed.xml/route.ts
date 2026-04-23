import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET() {
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const { data: posts } = await supabase
    .from("posts")
    .select("title, slug, excerpt, created_at, body")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(20);

  const buildDate = new Date().toUTCString();

  const items =
    (posts ?? []).map((post) => {
      const pubDate = new Date(post.created_at).toUTCString();
      const link = `https://seenadvocacy.com/blog/${post.slug}`;
      const excerpt = post.excerpt || "";
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(excerpt)}</description>
    </item>`;
    }).join("\n") || "";

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Seen — Mental Health Advocacy Blog</title>
    <link>https://seenadvocacy.com/blog</link>
    <description>Honest writing about the real experience of mental health recovery.</description>
    <language>en</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="https://seenadvocacy.com/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
