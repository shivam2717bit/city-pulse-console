import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { TrendingUp, Clock, MapPin, Car } from "lucide-react";

const Analytics = () => {
  const [selectedZone, setSelectedZone] = useState("all");
  const [selectedDate, setSelectedDate] = useState("today");

  // Mock data
  const trafficFlowData = [
    { hour: '06:00', vehicles: 1200 },
    { hour: '07:00', vehicles: 2800 },
    { hour: '08:00', vehicles: 4200 },
    { hour: '09:00', vehicles: 3800 },
    { hour: '10:00', vehicles: 2400 },
    { hour: '11:00', vehicles: 2800 },
    { hour: '12:00', vehicles: 3200 },
    { hour: '13:00', vehicles: 3600 },
    { hour: '14:00', vehicles: 3000 },
    { hour: '15:00', vehicles: 2600 },
    { hour: '16:00', vehicles: 3400 },
    { hour: '17:00', vehicles: 4800 },
    { hour: '18:00', vehicles: 5200 },
    { hour: '19:00', vehicles: 4600 },
    { hour: '20:00', vehicles: 3200 },
    { hour: '21:00', vehicles: 2400 },
    { hour: '22:00', vehicles: 1800 },
    { hour: '23:00', vehicles: 1200 },
  ];

  const congestionData = [
    { zone: 'CBD', congestion: 85 },
    { zone: 'Airport Rd', congestion: 65 },
    { zone: 'Industrial', congestion: 35 },
    { zone: 'Residential A', congestion: 45 },
    { zone: 'Highway', congestion: 70 },
  ];

  const vehicleTypeData = [
    { name: 'Cars', value: 45, color: '#0A3D62' },
    { name: 'Buses', value: 15, color: '#1E90FF' },
    { name: 'Trucks', value: 20, color: '#FFB74D' },
    { name: 'Motorcycles', value: 20, color: '#81C784' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Traffic Analytics</h1>
          <p className="text-muted-foreground">Comprehensive traffic data analysis and insights</p>
        </div>
        
        {/* Filters */}
        <div className="flex space-x-4">
          <Select value={selectedDate} onValueChange={setSelectedDate}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedZone} onValueChange={setSelectedZone}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select zone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Zones</SelectItem>
              <SelectItem value="cbd">CBD</SelectItem>
              <SelectItem value="airport">Airport Road</SelectItem>
              <SelectItem value="industrial">Industrial</SelectItem>
              <SelectItem value="residential">Residential</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peak Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">17:00 - 19:00</div>
            <p className="text-xs text-muted-foreground">Highest traffic volume</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Waiting Time</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2 min</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">↓ 12%</span> from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Busy Zone</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">CBD</div>
            <Badge variant="destructive" className="mt-1">High Congestion</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47,832</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">↑ 8%</span> from last week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Flow Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic Flow by Hour</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trafficFlowData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="vehicles" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Congestion by Zone */}
        <Card>
          <CardHeader>
            <CardTitle>Congestion by Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={congestionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="zone" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="congestion" fill="hsl(var(--secondary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Vehicle Types Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Vehicle Types Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={vehicleTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {vehicleTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Traffic Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Traffic Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { day: 'Monday', vehicles: 45000, change: '+2%' },
                { day: 'Tuesday', vehicles: 47000, change: '+5%' },
                { day: 'Wednesday', vehicles: 48500, change: '+8%' },
                { day: 'Thursday', vehicles: 46000, change: '+3%' },
                { day: 'Friday', vehicles: 52000, change: '+15%' },
                { day: 'Saturday', vehicles: 38000, change: '-12%' },
                { day: 'Sunday', vehicles: 32000, change: '-18%' },
              ].map((item) => (
                <div key={item.day} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 text-sm font-medium">{item.day}</div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold">{item.vehicles.toLocaleString()}</div>
                    </div>
                  </div>
                  <Badge variant={item.change.startsWith('+') ? 'success' : 'destructive'}>
                    {item.change}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;