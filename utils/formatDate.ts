export function formatDate(dateStr: string): string {
  const [day, month, year] = dateStr.split("-");
  return `${day}/${month}/${year}`;
}
