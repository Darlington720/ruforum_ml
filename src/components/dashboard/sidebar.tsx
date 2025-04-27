import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  User,
  LayoutDashboard,
  Briefcase,
  Database,
  LineChart,
  FileText,
  Menu,
  ChevronLeft,
} from "lucide-react";
import { NAVIGATION_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface SidebarProps {
  onLogout: () => void;
}

export function Sidebar({ onLogout }: SidebarProps) {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  return (
    <div className={cn("sidebar", isExpanded && "expanded")}>
      <div className="flex justify-between items-center mb-6 px-2">
        {isExpanded ? (
          <>
            <h1 className="text-center text-white/90 flex-1">Ruforum Mel</h1>
            <Button
              variant="ghost"
              size="icon"
              className="text-white/90 hover:bg-white/10 h-8 w-8"
              onClick={toggleSidebar}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="text-white/90 hover:bg-white/10 h-8 w-8 mx-auto"
            onClick={toggleSidebar}
          >
            <Menu className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex flex-col h-[calc(100vh-120px)]">
        <nav className="space-y-1 px-2 flex-1">
          {NAVIGATION_ITEMS.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <div
                key={item.label}
                className={cn(
                  "nav-item",
                  activeItem === item.label && "active"
                )}
                onClick={() => setActiveItem(item.label)}
              >
                <Icon className="h-4 w-4" />
                <span className="nav-item-text text-sm">{item.label}</span>
              </div>
            );
          })}
        </nav>

        <div className="px-2 py-3 border-t border-white/10">
          <div
            className={cn(
              "flex items-center",
              isExpanded ? "justify-between" : "flex-col gap-3"
            )}
          >
            <div className="bg-white/10 rounded-full p-1.5">
              <User className="h-4 w-4 text-white/90" />
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="text-white/90 hover:bg-white/10 h-8 w-8"
              onClick={onLogout}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function getIcon(iconName: string) {
  const iconMap: Record<string, React.ComponentType<any>> = {
    LayoutDashboard: LayoutDashboard,
    Briefcase: Briefcase,
    Database: Database,
    LineChart: LineChart,
    FileText: FileText,
    User: User,
  };

  return iconMap[iconName] || User;
}
