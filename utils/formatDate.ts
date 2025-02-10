export function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const [day, month, year] = dateStr.split("-");
  return `${day}/${month}/${year}`;
}
