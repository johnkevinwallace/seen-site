const TRIGGER_WARNING_RULES: Array<{ label: string; pattern: RegExp }> = [
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
