import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Car, 
  TrendingUp, 
  CheckCircle, 
  AlertTriangle,
  MapPin,
  RefreshCw
} from "lucide-react";
import TrafficMap from "@/components/TrafficMap";
import StatsCard from "@/components/StatsCard";

const Dashboard = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  
  // Mock data that updates periodically
  const [trafficData, setTrafficData] = useState({
    totalVehicles: 15420,
    avgCongestion: 65,
    operatingSignals: 142,
    activeAlerts: 3
  });

  // Auto-refresh simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTrafficData(prev => ({
        totalVehicles: prev.totalVehicles + Math.floor(Math.random() * 50) - 25,
        avgCongestion: Math.max(0, Math.min(100, prev.avgCongestion + Math.floor(Math.random() * 10) - 5)),
        operatingSignals: prev.operatingSignals,
        activeAlerts: Math.max(0, prev.activeAlerts + Math.floor(Math.random() * 3) - 1)
      }));
      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdate(new Date());
    }, 1000);
  };

  const getCongestionStatus = (level: number) => {
    if (level >= 80) return { color: "traffic-congested", text: "High", variant: "destructive" as const };
    if (level >= 50) return { color: "traffic-moderate", text: "Moderate", variant: "warning" as const };
    return { color: "traffic-clear", text: "Clear", variant: "success" as const };
  };

  const congestionStatus = getCongestionStatus(trafficData.avgCongestion);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Live Traffic Dashboard</h1>
          <p className="text-muted-foreground">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </p>
        </div>
        <Button 
          onClick={handleRefresh} 
          disabled={isRefreshing}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Vehicles Today"
          value={trafficData.totalVehicles.toLocaleString()}
          icon={Car}
          trend="+5.2%"
          trendUp={true}
        />
        
        <StatsCard
          title="Average Congestion"
          value={`${trafficData.avgCongestion}%`}
          icon={TrendingUp}
          badge={
            <Badge variant={congestionStatus.variant} className="ml-2">
              {congestionStatus.text}
            </Badge>
          }
        />
        
        <StatsCard
          title="Signals Operating"
          value={trafficData.operatingSignals}
          icon={CheckCircle}
          trend="98.6%"
          description="Operational"
        />
        
        <StatsCard
          title="Active Alerts"
          value={trafficData.activeAlerts}
          icon={AlertTriangle}
          badge={trafficData.activeAlerts > 0 ? (
            <Badge variant="destructive" className="ml-2">
              Urgent
            </Badge>
          ) : undefined}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Traffic Map */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Live Traffic Map</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TrafficMap />
          </CardContent>
        </Card>

        {/* Traffic Zones Status */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic Zones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { zone: "Central Business District", status: "High", color: "bg-traffic-congested" },
              { zone: "Airport Road", status: "Moderate", color: "bg-traffic-moderate" },
              { zone: "Industrial Area", status: "Clear", color: "bg-traffic-clear" },
              { zone: "Residential Zone A", status: "Clear", color: "bg-traffic-clear" },
              { zone: "Highway Junction", status: "Moderate", color: "bg-traffic-moderate" },
            ].map((zone, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${zone.color}`} />
                  <span className="text-sm font-medium">{zone.zone}</span>
                </div>
                <Badge variant={zone.status === "High" ? "destructive" : 
                              zone.status === "Moderate" ? "warning" : "success"}>
                  {zone.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;