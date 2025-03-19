export function formatDatetime(dateStr: string | null): string {
    if (!dateStr) return "";
    const [day, month, year, hours, minutes] = dateStr.split("-");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
  