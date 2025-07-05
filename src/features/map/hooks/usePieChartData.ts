import { useMemo } from 'react';

const validDirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'] as const;
const colorMap = {
  N: '#4f46e5',
  NE: '#7c3aed',
  E: '#a78bfa',
  SE: '#c4b5fd',
  S: '#a5b4fc',
  SW: '#818cf8',
  W: '#6366f1',
  NW: '#4338ca'
};

function getWindDirection(degrees?: number): string {
  if (degrees === undefined) return 'N';
  const val = Math.floor((degrees / 45) + 0.5);
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[(val % 8)];
}

export function usePieChartData(data: Array<{ wind?: number; windDir?: number }>) {
  const { pieData, avgWind, maxWind } = useMemo(() => {
    const dirMap = data.reduce((acc: Record<string, { total: number; count: number }>, item) => {
      const dir = getWindDirection(item.windDir);
      if (!acc[dir]) acc[dir] = { total: 0, count: 0 };
      acc[dir].total += item.wind || 0;
      acc[dir].count += 1;
      return acc;
    }, {});

    const pieData = Object.entries(dirMap).map(([name, value]) => ({
      name,
      value: value.count ? value.total / value.count : 0,
      color: validDirs.includes(name as typeof validDirs[number])
        ? colorMap[name as keyof typeof colorMap]
        : '#cccccc'
    }));

    const avgWind = data.length ? data.reduce((sum: number, d: { wind?: number }) => sum + (d.wind || 0), 0) / data.length : 0;
    const maxWind = Math.max(...pieData.map((d: { value: number }) => d.value), 10);

    return { pieData, avgWind, maxWind };
  }, [data]);

  return { pieData, avgWind, maxWind, validDirs, colorMap, getWindDirection };
} 