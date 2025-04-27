import { cn } from '@/lib/utils';
import { Users, BarChart, Calendar, DollarSign } from 'lucide-react';

interface Tab {
  label: string;
  value: string;
  icon: string;
}

interface TabsNavProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tab: string) => void;
}

export function TabsNav({ tabs, activeTab, onChange }: TabsNavProps) {
  return (
    <div className="flex bg-white rounded-lg p-1 shadow-sm">
      {tabs.map((tab) => {
        const Icon = getIcon(tab.icon);
        return (
          <div
            key={tab.value}
            className={cn(
              "flex items-center justify-center py-2 px-6 rounded-md cursor-pointer transition-colors",
              activeTab === tab.value 
                ? "bg-amber-50 text-amber-900"
                : "text-gray-600 hover:bg-gray-50"
            )}
            onClick={() => onChange(tab.value)}
          >
            <Icon className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">{tab.label}</span>
          </div>
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