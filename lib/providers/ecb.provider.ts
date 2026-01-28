import { RatesProvider } from "./provider";

type ECBRate = {
  currency: string;
  rate: number;
  base: "EUR";
  source: "ECB";
  date: string;
};

export class ECBRatesProvider implements RatesProvider<ECBRate> {
  async getRates(): Promise<ECBRate[]> {
    const res = await fetch(
      "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml",
      {
        next: { revalidate: 3600 }, // ISR: обновление раз в час
      }
    );

    if (!res.ok) {
      throw new Error("ECB fetch failed");
    }

    const xml = await res.text();

    const dateMatch = xml.match(/time=['"]([^'"]+)['"]/);
    const date = dateMatch?.[1] ?? "unknown";

    const rateMatches = [
      ...xml.matchAll(
        /currency=['"]([A-Z]{3})['"] rate=['"]([\d.]+)['"]/g
      ),
    ];

    return rateMatches.map((m) => ({
      currency: m[1],
      rate: Number(m[2]),
      base: "EUR",
      source: "ECB",
      date,
    }));
  }
}