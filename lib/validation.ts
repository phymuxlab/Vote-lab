export function cleanText(value: unknown, maxLength: number) {
  return String(value ?? "").replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, maxLength);
}

export function requiredText(value: unknown, label: string, maxLength: number) {
  const cleaned = cleanText(value, maxLength);
  if (!cleaned) throw new Error(`${label} is required.`);
  return cleaned;
}

export function optionalText(value: unknown, maxLength: number) {
  const cleaned = cleanText(value, maxLength);
  return cleaned || null;
}

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function normaliseEmail(value: unknown) {
  const email = cleanText(value, 254).toLowerCase();
  if (!isEmail(email)) throw new Error("Enter a valid email address.");
  return email;
}

export function safeUrl(value: unknown) {
  const input = cleanText(value, 2048);
  if (!input) return null;
  try {
    const url = new URL(input);
    if (!['http:', 'https:'].includes(url.protocol)) throw new Error();
    return url.toString();
  } catch {
    throw new Error("Enter a valid website URL.");
  }
}

export function safeHexColour(value: unknown) {
  const colour = cleanText(value, 7);
  if (!/^#[0-9A-Fa-f]{6}$/.test(colour)) throw new Error("Invalid theme colour.");
  return colour.toUpperCase();
}

export function safeDate(value: unknown, label: string) {
  const date = new Date(String(value ?? ""));
  if (Number.isNaN(date.getTime())) throw new Error(`Invalid ${label.toLowerCase()}.`);
  return date.toISOString();
}

export function safeFile(file: File | null, label: string) {
  if (!file || file.size === 0) return null;
  const allowed = new Set(["image/jpeg", "image/png", "image/webp"]);
  if (!allowed.has(file.type)) throw new Error(`${label} must be a JPG, PNG or WebP image.`);
  if (file.size > 5 * 1024 * 1024) throw new Error(`${label} must be 5 MB or smaller.`);
  return file;
}
