const UNAVAILABLE_LABEL = "غير متوفر";

export function formatPhoneNumber(phone: string) {
  const trimmedPhone = phone.trim();

  if (!trimmedPhone || trimmedPhone === UNAVAILABLE_LABEL) return phone;
  if (trimmedPhone.startsWith("+")) return trimmedPhone;

  return `+${trimmedPhone}`;
}
