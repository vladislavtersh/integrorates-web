import { ExchangeRate } from "@/lib/rates";

export interface RatesProvider {
  getRates(date?: string): Promise<ExchangeRate[]>;
}