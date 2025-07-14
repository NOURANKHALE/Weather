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
 * Get wind direction as a string from degrees.
 * @param degrees - Wind direction in degrees
 * @returns Wind direction as compass string
 */
function getWindDirection(degrees?: number): typeof validDirs[number] {
  if (degrees === undefined) return 'N';
  const val = Math.floor((degrees / 45) + 0.5);
  const directions = validDirs;
  return directions[(val % 8)];
}

/**
 * Hook to memoize pie chart data for wind direction and speed.
 * @param data - Array of wind data objects
 * @returns Pie chart data, average wind, max wind, and helpers
 */
export function usePieChartData(
  data: Array<{ wind?: number; windDir?: number }>
): {
  pieData: PieChartDatum[];
  avgWind: number;
  maxWind: number;
  validDirs: typeof validDirs;
  colorMap: typeof colorMap;
  getWindDirection: typeof getWindDirection;
} {
  const { pieData, avgWind, maxWind } = useMemo(() => {
    const dirMap = data.reduce((acc: Record<string, { total: number; count: number }>, item) => {
      const dir = getWindDirection(item.windDir);
      if (!acc[dir]) acc[dir] = { total: 0, count: 0 };
      acc[dir].total += item.wind || 0;
      acc[dir].count += 1;
      return acc;
    }, {});

    const pieData: PieChartDatum[] = Object.entries(dirMap).map(([name, value]) => ({
      name: name as typeof validDirs[number],
      value: value.count ? value.total / value.count : 0,
      color: validDirs.includes(name as typeof validDirs[number])
        ? colorMap[name as typeof validDirs[number]]
        : '#cccccc'
    }));

    const avgWind = data.length ? data.reduce((sum: number, d: { wind?: number }) => sum + (d.wind || 0), 0) / data.length : 0;
    const maxWind = Math.max(...pieData.map((d: PieChartDatum) => d.value), 10);

    return { pieData, avgWind, maxWind };
  }, [data]);

  return { pieData, avgWind, maxWind, validDirs, colorMap, getWindDirection };
} 