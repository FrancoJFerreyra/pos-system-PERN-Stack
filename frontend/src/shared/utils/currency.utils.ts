import { EUR, dinero, toDecimal } from "dinero.js";

const DEFAULT_CURRENCY = EUR;

const CURRENCY_SYMBOLS: Record<string, string> = {
  EUR: "€",
  USD: "$",
  GBP: "£",
};

export const formatToCurrency = (value: number) => {
  const amount = value ?? 0;

  const price = dinero({
    amount: Number(amount),
    scale: 2,
    currency: DEFAULT_CURRENCY,
  });

  return toDecimal(price, ({ value, currency }) => {
    const symbol = CURRENCY_SYMBOLS[currency.code] ?? currency.code;

    return `${symbol} ${value}`;
  });
};

export const toCents = (value: string): number => {
  const normalized = value.trim().replace(",", ".");

  if (!normalized) {
    throw new Error("Price is required");
  }

  const [integerPart = "0", decimalPart = ""] = normalized.split(".");

  if (!/^\d+$/.test(integerPart) || !/^\d*$/.test(decimalPart)) {
    throw new Error("Invalid price");
  }

  const decimals = decimalPart.padEnd(2, "0").slice(0, 2);

  return Number(integerPart) * 100 + Number(decimals);
};
