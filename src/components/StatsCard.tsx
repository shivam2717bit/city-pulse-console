import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  description?: string;
  badge?: React.ReactNode;
}

const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendUp, 
  description,
  badge 
}: StatsCardProps) => {
  return (
    <Card className="dashboard-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold">{value}</div>
          {badge && badge}
        </div>
        {trend && (
          <p className="text-xs text-muted-foreground">
            <span className={trendUp ? "text-success" : "text-destructive"}>
              {trendUp ? "↑" : "↓"} {trend}
            </span>
            {description ? ` ${description}` : " from yesterday"}
          </p>
        )}
        {description && !trend && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;