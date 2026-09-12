export const generateSKU = (prefix: string = "PROD"): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const randomPart = Array.from({ length: 5 }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length)),
  ).join("");

  const timestampPart = Date.now().toString(36).toUpperCase().slice(-4);

  return `${prefix.toUpperCase()}-${randomPart}-${timestampPart}`;
};
