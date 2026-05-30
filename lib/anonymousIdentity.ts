export type AnonymousIdentity = {
  anon_id: string;
  anon_name: string;
  anon_avatar: string;
};

const STORAGE_KEY = "outsideview_identity";

const adjectives = ["Quiet", "Silver", "Wandering", "Bright", "Hidden", "Gentle", "Calm"];
const nouns = ["Fox", "Maple", "Owl", "River", "Wolf", "Ocean", "Sparrow"];
const avatars = ["🦊", "🦉", "🌊", "🌙", "🌲", "🕊️", "✨", "🍃"];

function createIdentity(): AnonymousIdentity {
  const anon_name = `${adjectives[Math.floor(Math.random() * adjectives.length)]}${
    nouns[Math.floor(Math.random() * nouns.length)]
  }${Math.floor(Math.random() * 900 + 100)}`;

  return {
    anon_id: crypto.randomUUID(),
    anon_name,
    anon_avatar: avatars[Math.floor(Math.random() * avatars.length)],
  };
}

export function getAnonymousIdentity(): AnonymousIdentity {
  const existing = localStorage.getItem(STORAGE_KEY);

  if (existing) {
    return JSON.parse(existing);
  }

  const identity = createIdentity();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(identity));
  return identity;
}