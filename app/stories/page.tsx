import { createAnonClient } from "@/lib/supabase";
import { Metadata } from "next";
import StoriesClient from "@/components/StoriesClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Stories — Seen",
  description: "Real stories from real people. No names. No judgment. Just truth.",
};

interface Story {
  id: string;
  story: string;
  created_at: string;
  trigger_warnings?: string[] | null;
}

export default async function StoriesPage() {
  const supabase = createAnonClient();
  const withWarnings = await supabase
    .from("stories")
    .select("id, story, created_at, trigger_warnings")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  let stories: Story[] = [];

  if (!withWarnings.error && withWarnings.data) {
    stories = withWarnings.data as Story[];
  } else {
    const fallback = await supabase
      .from("stories")
      .select("id, story, created_at")
      .eq("status", "published")
      .order("created_at", { ascending: false });

    stories = ((fallback.data as Story[] | null) ?? []).map((story) => ({
      ...story,
      trigger_warnings: null,
    }));
  }

  return <StoriesClient stories={stories} />;
}
