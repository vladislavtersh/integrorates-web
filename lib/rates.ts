export type ExchangeRate = {
  currency: string;
  rate: number;
  base: string;
  source: string;
  date: string;
};

export const MOCK_RATES: ExchangeRate[] = [
  {
    currency: "USD",
    rate: 1.0843,
    base: "EUR",
    source: "ECB",
    date: "2026-01-27",
  },
  {
    currency: "GBP",
    rate: 0.8531,
    base: "EUR",
    source: "ECB",
    date: "2026-01-27",
  },
  {
    currency: "CHF",
    rate: 0.9412,
    base: "EUR",
    source: "ECB",
    date: "2026-01-27",
  },
];