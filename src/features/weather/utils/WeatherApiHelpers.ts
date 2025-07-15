import { API_CONFIG } from '@/constants/Constants';

export function buildUrl(endpoint: string, params: Record<string, string | number>, apiKey?: string): string {
  const searchParams = new URLSearchParams({
    ...params,
    units: 'metric',
    appid: apiKey || '',
  });
  return `${API_CONFIG.baseUrl}${endpoint}?${searchParams.toString()}`;
}

export function getCacheKey(type: 'weather' | 'forecast', params: Record<string, string | number>): string {
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${key}:${params[key]}`)
    .join('|');
  return `${type}_${sortedParams}`;
} 