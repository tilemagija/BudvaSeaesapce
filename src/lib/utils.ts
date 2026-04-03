import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function getLocalizedValue(
  obj: Record<string, string | undefined> | null | undefined,
  locale: string
): string {
  if (!obj) return "";
  return obj[locale] ?? obj["en"] ?? obj["me"] ?? "";
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  const clean = phone.replace(/\D/g, "");
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${clean}?text=${encoded}`;
}
