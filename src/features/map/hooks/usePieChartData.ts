import { useMemo } from 'react';
import { PieChartDatum } from '@/features/map/types/PieChartDatumInterface';

const validDirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'] as const;
const colorMap: Record<typeof validDirs[number], string> = {
  N: '#4f46e5',
  NE: '#7c3aed',
  E: '#a78bfa',
  SE: '#c4b5fd',
  S: '#a5b4fc',
  SW: '#818cf8',
  W: '#6366f1',
  NW: '#4338ca'
};

/**
 * Hook to memoize pie chart data for wind direction and speed.
 * @param data - Array of PieChartDatum
 * @returns Pie chart data, average wind, max wind, and helpers
 */

export function usePieChartData(
  data: PieChartDatum[]
): {
  pieData: PieChartDatum[];
  avgWind: number;
  maxWind: number;
  validDirs: typeof validDirs;
  colorMap: typeof colorMap;
} {
  const { pieData, avgWind, maxWind } = useMemo(() => {
    const pieData = data;
    const avgWind = data.length ? data.reduce((sum, d) => sum + (d.value || 0), 0) / data.length : 0;
    const maxWind = Math.max(...pieData.map((d) => d.value), 10);
    return { pieData, avgWind, maxWind };
  }, [data]);

  return { pieData, avgWind, maxWind, validDirs, colorMap };
} 