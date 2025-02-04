const toSnakeCase = (str: string) => {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
};

export const transformToSnakeCase = (filters: Record<string, unknown>) => {
  return Object.fromEntries(
    Object.entries(filters)
      .map(([key, value]) => {
        if (value && typeof value === "object" && "id" in value) {
          value = value.id;
        }
        return [toSnakeCase(key), value];
      })
      .filter(([, value]) => value !== null && value !== undefined)
  );
};
