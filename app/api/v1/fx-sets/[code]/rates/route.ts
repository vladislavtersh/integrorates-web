import { NextRequest, NextResponse } from 'next/server';
import { fetchPublishedRates, ZCErrorResponse } from '@/lib/providers/zc.provider';
import { createHash } from 'crypto';

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  const { code } = params;
  const searchParams = request.nextUrl.searchParams;
  const date = searchParams.get('date');
  const symbols = searchParams.get('symbols') || undefined;

  if (!date) {
    return NextResponse.json(
      { error: 'MISSING_DATE', message: 'date parameter is required (YYYY-MM-DD)' },
      { status: 400 }
    );
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { error: 'INVALID_DATE', message: 'date must be in YYYY-MM-DD format' },
      { status: 400 }
    );
  }

  try {
    const result = await fetchPublishedRates(code, date, symbols);

    if ('error' in result && (result as ZCErrorResponse).error) {
      const errorResult = result as ZCErrorResponse;
      return NextResponse.json(
        { error: errorResult.error, message: errorResult.message },
        { status: errorResult.status || 404 }
      );
    }

    const payload = {
      fx_set: result.fx_set,
      fx_set_version: result.fx_set_version,
      date: result.date,
      base: result.base,
      rates: result.rates,
      source: result.source,
      generated_at: result.generated_at,
    };

    const payloadJson = JSON.stringify(payload);
    const proxyHash = createHash('sha256').update(payloadJson).digest('hex');

    const response = {
      ...result,
      integrity_upstream: result.integrity,
      integrity: {
        method: 'proxy-sha256',
        hash: `sha256:${proxyHash}`,
      },
    };

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('ZC API Error:', error);
    return NextResponse.json(
      { error: 'UPSTREAM_ERROR', message: 'Failed to fetch from source' },
      { status: 502 }
    );
  }
}