import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: LucideIcon;
  variant: "blue" | "teal" | "orange" | "green";
  isActive?: boolean;
  onClick?: () => void;
}

const variantStyles = {
  blue: "kpi-card-blue",
  teal: "kpi-card-teal",
  orange: "kpi-card-orange",
  green: "kpi-card-green",
};

const iconColors = {
  blue: "text-kpi-blue",
  teal: "text-kpi-teal",
  orange: "text-kpi-orange",
  green: "text-kpi-green",
};

export function KPICard({ title, value, subtitle, icon: Icon, variant, isActive, onClick }: KPICardProps) {
  return (
    <div
      className={cn(
        "kpi-card cursor-pointer animate-fade-in transition-all duration-200",
        variantStyles[variant],
        isActive && "ring-2 ring-primary ring-offset-2"
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground mt-1">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        <div className={cn("p-3 rounded-lg bg-muted", iconColors[variant])}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
