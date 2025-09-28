import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Ambulance, 
  Truck, 
  Shield, 
  Plus, 
  Search,
  MapPin,
  Clock
} from "lucide-react";

const Emergency = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock emergency data
  const [emergencies] = useState([
    {
      id: "EMG-001",
      type: "Ambulance",
      location: "CBD Intersection A",
      route: "Hospital Route 1",
      status: "Active",
      priority: "High",
      time: "14:25",
      eta: "3 min"
    },
    {
      id: "EMG-002", 
      type: "Fire",
      location: "Industrial Zone B",
      route: "Fire Station Route 2",
      status: "En Route",
      priority: "Critical",
      time: "14:15",
      eta: "8 min"
    },
    {
      id: "EMG-003",
      type: "Police",
      location: "Highway Junction",
      route: "Police Route 3",
      status: "Resolved",
      priority: "Medium",
      time: "13:45",
      eta: "Completed"
    },
    {
      id: "EMG-004",
      type: "Ambulance",
      location: "Residential Area C",
      route: "Hospital Route 2",
      status: "Active",
      priority: "High",
      time: "14:30",
      eta: "5 min"
    }
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Ambulance":
        return <Ambulance className="h-4 w-4" />;
      case "Fire":
        return <Truck className="h-4 w-4" />;
      case "Police":
        return <Shield className="h-4 w-4" />;
      default:
        return <Ambulance className="h-4 w-4" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "destructive";
      case "En Route":
        return "warning";
      case "Resolved":
        return "success";
      default:
        return "secondary";
    }
  };

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "destructive";
      case "High":
        return "warning";
      case "Medium":
        return "secondary";
      default:
        return "secondary";
    }
  };

  const filteredEmergencies = emergencies.filter(emergency =>
    emergency.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emergency.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emergency.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeEmergencies = emergencies.filter(e => e.status === "Active").length;
  const criticalEmergencies = emergencies.filter(e => e.priority === "Critical").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Emergency Response</h1>
          <p className="text-muted-foreground">Emergency vehicle route management and coordination</p>
        </div>
        
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>New Emergency Route</span>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Emergencies</CardTitle>
            <div className="status-indicator bg-destructive animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{activeEmergencies}</div>
            <p className="text-xs text-muted-foreground">Currently in progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Priority</CardTitle>
            <Shield className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{criticalEmergencies}</div>
            <p className="text-xs text-muted-foreground">Requires immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2 min</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">↓ 0.8 min</span> from average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Routes Cleared</CardTitle>
            <MapPin className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">12</div>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Events Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <CardTitle>Emergency Events</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search emergencies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Route Assigned</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>ETA</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmergencies.map((emergency) => (
                <TableRow 
                  key={emergency.id}
                  className={emergency.status === "Active" ? "emergency-pulse" : ""}
                >
                  <TableCell className="font-medium">{emergency.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(emergency.type)}
                      <span>{emergency.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>{emergency.location}</TableCell>
                  <TableCell>{emergency.route}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(emergency.status) as any}>
                      {emergency.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPriorityVariant(emergency.priority) as any}>
                      {emergency.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{emergency.time}</TableCell>
                  <TableCell>
                    <span className={emergency.status === "Active" ? "text-destructive font-medium" : ""}>
                      {emergency.eta}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Emergency Route Simulation */}
      <Card>
        <CardHeader>
          <CardTitle>Emergency Route Simulation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Test emergency route clearance and traffic signal coordination
            </p>
            <div className="flex space-x-4">
              <Button variant="outline" className="flex items-center space-x-2">
                <Ambulance className="h-4 w-4" />
                <span>Simulate Ambulance Route</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Truck className="h-4 w-4" />
                <span>Simulate Fire Truck Route</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Simulate Police Route</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Emergency;