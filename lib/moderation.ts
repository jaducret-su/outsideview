export function normalizeForModeration(text: string) {
  return text
    .toLowerCase()
    .replace(/[@$!1|]/g, (char) => {
      const map: Record<string, string> = {
        "@": "a",
        "$": "s",
        "!": "i",
        "1": "i",
        "|": "i",
      };
      return map[char] || char;
    })
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const directInsults = [
  "stupid",
  "dumb",
  "idiot",
  "moron",
  "loser",
  "pathetic",
  "worthless",
  "trash",
  "shut up",
  "go away",
  "nobody cares",
];

const harassmentPhrases = [
  "you are stupid",
  "youre stupid",
  "you are dumb",
  "youre dumb",
  "you are an idiot",
  "youre an idiot",
  "you are pathetic",
  "youre pathetic",
  "you are worthless",
  "youre worthless",
  "you sound stupid",
  "this is stupid",
  "your post is stupid",
  "your perspective is stupid",
];

const hateAndIdentityTerms = [
  "racist slur",
  "homophobic slur",
  "retard",
  "retarded",
  "fag",
  "faggot",
  "tranny",
  "nazi",
];

const threatAndSelfHarmPhrases = [
  "kill yourself",
  "kys",
  "i will kill",
  "im going to kill",
  "i'm going to kill",
  "i will hurt",
  "im going to hurt",
  "i'm going to hurt",
];

const doxxingPhrases = [
  "address is",
  "phone number is",
  "his address",
  "her address",
  "their address",
  "dox",
  "doxx",
];

const spamPhrases = [
  "free money",
  "crypto giveaway",
  "click here",
  "buy now",
  "limited time offer",
  "http://",
  "https://",
  "www.",
];

function containsAny(text: string, phrases: string[]) {
  return phrases.some((phrase) => text.includes(phrase));
}

export function moderateContent({
  title = "",
  body,
  type,
}: {
  title?: string;
  body: string;
  type: "post" | "comment" | "poll_comment";
}) {
  const rawText = `${title} ${body}`;
  const text = normalizeForModeration(rawText);

  if (!body || body.trim().length === 0) {
    return "Please write something before submitting.";
  }

  if (type === "post" && title.trim().length === 0) {
    return "Please add a title before submitting.";
  }

  if (type === "post" && title.length > 120) {
    return "Please keep the title under 120 characters.";
  }

  if (type === "post" && body.length > 2500) {
    return "Please keep your story under 2,500 characters.";
  }

  if ((type === "comment" || type === "poll_comment") && body.length > 1500) {
    return "Please keep your perspective under 1,500 characters.";
  }

  if (type === "post" && body.length < 20) {
    return "Please share a little more context so others can give a thoughtful perspective.";
  }

  if ((type === "comment" || type === "poll_comment") && body.length < 10) {
    return "Please write a more thoughtful perspective before posting.";
  }

  if (containsAny(text, threatAndSelfHarmPhrases)) {
    return "This could not be submitted because it appears to include threatening or harmful language.";
  }

  if (containsAny(text, doxxingPhrases)) {
    return "This could not be submitted because it appears to include private or identifying information.";
  }

  if (containsAny(text, spamPhrases)) {
    return "This could not be submitted because it looks like spam or promotion.";
  }

  if (containsAny(text, hateAndIdentityTerms)) {
    return "This could not be submitted because it appears to include hateful or identity-based language.";
  }

  if (containsAny(text, harassmentPhrases)) {
    return "This could not be submitted because it appears to attack another person instead of offering perspective.";
  }

  if (containsAny(text, directInsults)) {
    return "Please rephrase this without insults. OutsideView is for thoughtful perspectives, not personal attacks.";
  }

  const repeatedCharacters = /(.)\1{8,}/;
  if (repeatedCharacters.test(text)) {
    return "Please avoid spam-like repeated characters.";
  }

  const allCapsWords = rawText.match(/\b[A-Z]{5,}\b/g);
  if (allCapsWords && allCapsWords.length >= 5) {
    return "Please avoid excessive all-caps language so the conversation stays calm and readable.";
  }

  return null;
}