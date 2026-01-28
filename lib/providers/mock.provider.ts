import { MOCK_RATES, ExchangeRate } from "@/lib/rates";
import { RatesProvider } from "./provider";

export class MockRatesProvider implements RatesProvider {
  async getRates(): Promise<ExchangeRate[]> {
    return MOCK_RATES;
  }
}