export function getUserInitials(username: string): string {
  let initials = "";
  if (username) {
    const nameParts = username.split(" ");
    if (nameParts.length > 0) {
      initials = nameParts[0][0];
      if (nameParts.length > 1) {
        initials += nameParts[nameParts.length - 1][0];
      }
    }
  }
  return initials;
}
