export type StoryStatus = "idle" | "loading" | "success" | "error";

export interface SubmitStoryResult {
  status: StoryStatus;
  error?: boolean;
}

export async function submitStory(
  storyText: string,
  website: string
): Promise<SubmitStoryResult> {
  const trimmed = storyText.trim();
  if (!trimmed || trimmed.length < 10) {
    return { status: "error" };
  }

  try {
    const res = await fetch("/api/story", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ story: trimmed, website }),
    });
    if (res.ok) {
      return { status: "success" };
    } else {
      return { status: "error" };
    }
  } catch {
    return { status: "error" };
  }
}
