export const STORY_WARNING_OPTIONS = [
  "suicide or self-harm",
  "abuse or violence",
  "substance use",
  "eating disorder",
  "trauma or grief",
] as const;

const STORY_WARNING_SET = new Set<string>(STORY_WARNING_OPTIONS);

const TRIGGER_WARNING_RULES: Array<{ label: (typeof STORY_WARNING_OPTIONS)[number]; pattern: RegExp }> = [
  {
    label: "suicide or self-harm",
    pattern: /\b(suicid(?:e|al)|self[-\s]?harm|cut(?:ting)?\s+myself|kill(?:ed|ing)?\s+myself|ended?\s+my\s+life)\b/i,
  },
  {
    label: "abuse or violence",
    pattern: /\b(abuse|abusive|assault|rap(?:e|ed|ing)|hit me|beaten|domestic\s+violence|violent)\b/i,
  },
  {
    label: "substance use",
    pattern: /\b(overdose|addiction|addicted|alcoholism|drunk\s+every\s+day|drug\s+use|substance\s+abuse)\b/i,
  },
  {
    label: "eating disorder",
    pattern: /\b(anorexi(?:a|c)|bulimi(?:a|c)|binge\s+eat(?:ing)?|purging|eating\s+disorder)\b/i,
  },
  {
    label: "trauma or grief",
    pattern: /\b(ptsd|trauma|grief|grieving|lost\s+my\s+(?:mom|mother|dad|father|child|partner|spouse))\b/i,
  },
];

export function detectTriggerWarnings(story: string): string[] {
  return TRIGGER_WARNING_RULES.filter((rule) => rule.pattern.test(story)).map((rule) => rule.label);
}

export function normalizeTriggerWarnings(input: unknown): string[] {
  if (!Array.isArray(input)) return [];

  const normalized = input
    .map((value) => (typeof value === "string" ? value.trim().toLowerCase() : ""))
    .filter((value): value is string => value.length > 0 && STORY_WARNING_SET.has(value));

  return Array.from(new Set(normalized));
}
