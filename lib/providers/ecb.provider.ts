import { RatesProvider } from "./provider";
import { ExchangeRate } from "@/lib/rates";

export class ECBRatesProvider implements RatesProvider {
  async getRates(): Promise<ExchangeRate[]> {
    const res = await fetch(
      "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml",
      {
        cache: "no-store",
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
        /currency=['"]([A-Z]{3})['"]\s+rate=['"]([\d.]+)['"]/g
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