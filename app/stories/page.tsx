import { createAnonClient } from "@/lib/supabase";
import { Metadata } from "next";
import StoriesClient from "@/components/StoriesClient";

export const metadata: Metadata = {
  title: "Stories — Seen",
  description: "Real stories from real people. No names. No judgment. Just truth.",
};

interface Story {
  id: string;
  story: string;
  created_at: string;
}

export default async function StoriesPage() {
  const supabase = createAnonClient();
  const { data } = await supabase
    .from("stories")
    .select("id, story, created_at")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  const stories = (data as Story[]) ?? [];

  return <StoriesClient stories={stories} />;
}
