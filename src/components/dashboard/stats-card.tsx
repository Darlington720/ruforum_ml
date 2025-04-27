import { formatNumber } from '@/lib/utils';
import { TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  count: number;
  percentage: number;
  growth: number;
  color: string;
}

export function StatsCard({ title, count, percentage, growth, color }: StatsCardProps) {
  return (
    <div className={cn("bg-white rounded-lg p-4 shadow-sm border-l-4", color)}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm text-muted-foreground">{title}</h3>
        <div className="bg-amber-50 rounded-full p-1.5">
          <Users className="h-4 w-4 text-amber-600" />
        </div>
      </div>
      
      <div className="mb-1">
        <span className="text-2xl font-bold">{formatNumber(count)}</span>
      </div>
      
      <div className="flex items-center text-xs text-green-500 mb-2">
        <TrendingUp className="h-3 w-3 mr-1" />
        <span>{growth}% vs last month</span>
      </div>
      
      <div className="relative">
        <div className="overflow-hidden h-1.5 text-xs flex rounded-full bg-gray-100">
          <div
            className={cn("shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center rounded-full", `bg-${color.split('border-')[1]}`)}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {percentage}% of total
        </div>
      </div>
    </div>
  );
}

import { Users } from 'lucide-react';