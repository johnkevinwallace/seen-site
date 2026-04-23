import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const { data: posts } = await supabase
    .from("posts")
    .select("slug, created_at")
    .eq("published", true);

  const base: MetadataRoute.Sitemap = [
    { url: "https://seenadvocacy.com/", priority: 1 },
    { url: "https://seenadvocacy.com/blog", priority: 0.8 },
    { url: "https://seenadvocacy.com/stories", priority: 0.8 },
    { url: "https://seenadvocacy.com/share", priority: 0.7 },
    { url: "https://seenadvocacy.com/privacy", priority: 0.3 },
    { url: "https://seenadvocacy.com/terms", priority: 0.3 },
    { url: "https://seenadvocacy.com/contact", priority: 0.3 },
  ];

  const postEntries = (posts ?? []).map((post) => ({
    url: `https://seenadvocacy.com/blog/${post.slug}`,
    lastModified: new Date(post.created_at),
    priority: 0.6,
  }));

  return [...base, ...postEntries];
}
