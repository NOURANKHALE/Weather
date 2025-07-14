"use client";
import { useEffect, useState, useRef } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { usePieChartData } from '@/features/map/hooks/usePieChartData';

const RADIAN = Math.PI / 180;

interface PieChartWithNeedleProps {
  data: Array<{ wind?: number; windDir?: number }>;
  t: (key: string) => string;
  direction: 'ltr' | 'rtl';
  locale: string;
}

const NEEDLE_LENGTH_RATIO = 0.25;
const NEEDLE_BASE_RADIUS_RATIO = 0.02;
const CHART_HEIGHT_RATIO = 0.8;
const MAX_CHART_WIDTH = 400;

export default function PieChartWithNeedle({ data, t }: PieChartWithNeedleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 300, height: 250 });

  const { pieData, avgWind, maxWind, validDirs, colorMap } = usePieChartData(data);

  // Use ResizeObserver for more robust resizing
  useEffect(() => {
    if (!containerRef.current) return;
    const handleResize = () => {
      const width = Math.min(containerRef.current!.offsetWidth, MAX_CHART_WIDTH);
      setDimensions({
        width,
        height: width * CHART_HEIGHT_RATIO,
      });
    };
    handleResize();
    const observer = new ResizeObserver(handleResize);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const renderNeedle = () => {
    if (avgWind <= 0) return null;

    const centerX = dimensions.width / 2;
    const centerY = dimensions.height * 0.5;
    const needleLength = dimensions.width * NEEDLE_LENGTH_RATIO;
    const needleBaseRadius = dimensions.width * NEEDLE_BASE_RADIUS_RATIO;
    const angle = 180 * (1 - avgWind / maxWind);

    const radians = -angle * RADIAN;
    const baseX1 = centerX + needleBaseRadius * Math.sin(radians);
    const baseY1 = centerY - needleBaseRadius * Math.cos(radians);
    const baseX2 = centerX - needleBaseRadius * Math.sin(radians);
    const baseY2 = centerY + needleBaseRadius * Math.cos(radians);
    const tipX = centerX + needleLength * Math.cos(radians);
    const tipY = centerY + needleLength * Math.sin(radians);

    return (
      <g key="needle">
        <circle
          cx={centerX}
          cy={centerY}
          r={needleBaseRadius}
          className="fill-primary stroke-primary-700"
          strokeWidth={1.5}
        />
        <path
          d={`M${baseX1} ${baseY1} L${baseX2} ${baseY2} L${tipX} ${tipY} Z`}
          className="fill-primary stroke-primary-700"
          strokeWidth={1.5}
        />
      </g>
    );
  };

  const hasData = pieData.length > 0 && pieData.some(d => d.value > 0);

  if (!hasData) {
    return (
      <div className="flex items-center justify-center h-64 bg-white/80 dark:bg-gray-800/70 rounded-lg">
        <span className="text-gray-600 dark:text-gray-300">
          {t('noWindData')}
        </span>
      </div>
    );
  }

  return (
    <div className="PieChartNeedle w-full h-full flex flex-col items-center justify-center">
      <div 
        ref={containerRef} 
        className="w-full h-full mx-auto flex flex-col items-center justify-center"
      >
        <div className="w-full flex-1" style={{ height: dimensions.height }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="70%"
                innerRadius={dimensions.width * 0.15}
                outerRadius={dimensions.width * 0.3}
                startAngle={180}
                endAngle={0}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry: { color: string }, index: number) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    stroke="currentColor"
                    className="text-gray-200"
                  />
                ))}
              </Pie>
              {renderNeedle()}
              <text
                x="50%"
                y="4%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-bold fill-gray-900 dark:fill-gray-100"
                style={{ fontSize: dimensions.width * 0.045 }}
              >
                {avgWind.toFixed(1)} {t('windSpeedUnit')}
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full grid grid-cols-4 gap-2 mt-0">
          {validDirs.map((dir: string) => (
            <div key={dir} className="flex items-center justify-center gap-1">
              <div 
                className="w-3 h-3 rounded-full border border-gray-300 dark:border-gray-600" 
                style={{ 
                  backgroundColor: colorMap[dir as keyof typeof colorMap]
                }} 
              />
              <span className="text-xs text-gray-700 dark:text-gray-300">
                {t(`windDirections.${dir.toLowerCase()}`)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}