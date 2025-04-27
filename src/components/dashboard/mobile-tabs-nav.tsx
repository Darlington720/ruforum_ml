import { cn } from '@/lib/utils';
import { Users, BarChart, Calendar, DollarSign } from 'lucide-react';

interface Tab {
  label: string;
  value: string;
  icon: string;
}

interface MobileTabsNavProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tab: string) => void;
}

export function MobileTabsNav({ tabs, activeTab, onChange }: MobileTabsNavProps) {
  return (
    <div className="grid grid-cols-4 gap-1 w-full">
      {tabs.map((tab) => {
        const Icon = getIcon(tab.icon);
        return (
          <button
            key={tab.value}
            className={cn(
              "flex flex-col items-center justify-center py-2 px-1 rounded-md transition-colors",
              activeTab === tab.value 
                ? "text-[#8b4513]"
                : "text-muted-foreground"
            )}
            onClick={() => onChange(tab.value)}
          >
            <Icon className="h-5 w-5 mb-1" />
            <span className="text-xs">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function getIcon(iconName: string) {
  const iconMap: Record<string, React.ComponentType<any>> = {
    'Users': Users,
    'BarChart': BarChart,
    'Calendar': Calendar,
    'DollarSign': DollarSign
  };
  
  return iconMap[iconName] || Users;
}