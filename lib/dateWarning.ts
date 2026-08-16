import { DATE_WARNING_DAYS } from "./constants";

function toISODate(year: number, monthIndex: number, day: number): string {
  const mm = String(monthIndex + 1).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

/**
 * Today's date as YYYY-MM-DD in local time. Deliberately avoids
 * `toISOString()` (UTC-based), which can drift a day near local midnight.
 */
export function todayLocalISODate(): string {
  const now = new Date();
  return toISODate(now.getFullYear(), now.getMonth(), now.getDate());
}

function parseLocalMidnight(isoDate: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) return null;
  const [, y, m, d] = match;
  return new Date(Number(y), Number(m) - 1, Number(d));
}

export function isWithinNextDays(
  isoDate: string,
  days: number = DATE_WARNING_DAYS
): boolean {
  const selected = parseLocalMidnight(isoDate);
  if (!selected) return false;

  const today = parseLocalMidnight(todayLocalISODate());
  if (!today) return false;

  const diffDays = Math.round(
    (selected.getTime() - today.getTime()) / 86_400_000
  );

  return diffDays >= 0 && diffDays <= days;
}

export function formatDisplayDate(isoDate: string): string {
  const date = parseLocalMidnight(isoDate);
  if (!date) return isoDate;
  return date.toLocaleDateString("en-SG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
