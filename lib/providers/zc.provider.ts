import { getZohoAccessToken } from '../zoho-auth';

export interface ZCRatesResponse {
  fx_set: string;
  fx_set_version: number;
  date: string;
  base: string;
  rates: Record<string, number>;
  source: string;
  generated_at: string;
  integrity: {
    method: string;
    hash: string;
  };
}

export interface ZCErrorResponse {
  error: string;
  message: string;
  status: number;
}

export async function fetchPublishedRates(
  fxSetCode: string,
  date: string,
  symbols?: string
): Promise<ZCRatesResponse | ZCErrorResponse> {
  const accessToken = await getZohoAccessToken();
  const owner = process.env.ZOHO_OWNER;
  const app = process.env.ZOHO_APP;
  const apiDomain = process.env.ZOHO_API_DOMAIN;

  const url = `${apiDomain}/creator/v2.1/${owner}/${app}/function/API_GetPublishedRates`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Zoho-oauthtoken ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      arguments: {
        fx_set_code: fxSetCode,
        date_str: date,
        symbols_csv: symbols || '',
      }
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return {
      error: 'ZC_API_ERROR',
      message: `Zoho Creator API error: ${response.status} - ${errorText}`,
      status: response.status >= 500 ? 502 : response.status,
    };
  }

  const data = await response.json();

  if (data.result) {
    try {
      const parsed = typeof data.result === 'string'
        ? JSON.parse(data.result)
        : data.result;

      if (parsed.error) {
        return parsed as ZCErrorResponse;
      }

      return parsed as ZCRatesResponse;
    } catch {
      return {
        error: 'PARSE_ERROR',
        message: 'Failed to parse ZC response',
        status: 500,
      };
    }
  }

  return {
    error: 'EMPTY_RESPONSE',
    message: 'No result from ZC function',
    status: 500,
  };
}