import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Settings as SettingsIcon, 
  Users, 
  Save, 
  Clock,
  MapPin,
  User
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Settings = () => {
  const [selectedIntersection, setSelectedIntersection] = useState("intersection-1");
  const [greenDuration, setGreenDuration] = useState([45]);
  const [redDuration, setRedDuration] = useState([30]);
  
  // Mock data for signal settings
  const intersections = [
    { id: "intersection-1", name: "CBD Main Junction", status: "Active" },
    { id: "intersection-2", name: "Airport Road Cross", status: "Active" },
    { id: "intersection-3", name: "Industrial Gate", status: "Maintenance" },
    { id: "intersection-4", name: "Highway Entry", status: "Active" },
  ];

  // Mock user data
  const operators = [
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh.kumar@traffic.gov.in",
      role: "Senior Controller",
      zone: "CBD",
      status: "Active",
      lastLogin: "2024-01-15 14:30"
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.sharma@traffic.gov.in", 
      role: "Traffic Controller",
      zone: "Airport Road",
      status: "Active",
      lastLogin: "2024-01-15 13:45"
    },
    {
      id: 3,
      name: "Amit Singh",
      email: "amit.singh@traffic.gov.in",
      role: "Emergency Coordinator",
      zone: "Industrial",
      status: "Offline",
      lastLogin: "2024-01-14 18:20"
    },
  ];

  const handleSaveSignalSettings = () => {
    toast({
      title: "Settings Saved",
      description: `Signal timing updated for ${intersections.find(i => i.id === selectedIntersection)?.name}`,
      variant: "default",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">System Settings</h1>
        <p className="text-muted-foreground">Configure traffic signals and manage user accounts</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Signal Timing Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Signal Timing Configuration</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="intersection">Select Intersection</Label>
              <Select value={selectedIntersection} onValueChange={setSelectedIntersection}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose intersection" />
                </SelectTrigger>
                <SelectContent>
                  {intersections.map((intersection) => (
                    <SelectItem key={intersection.id} value={intersection.id}>
                      <div className="flex items-center space-x-2">
                        <span>{intersection.name}</span>
                        <Badge 
                          variant={intersection.status === "Active" ? "success" : "warning"}
                          className="ml-auto"
                        >
                          {intersection.status}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="space-y-3">
                <Label>Green Light Duration: {greenDuration[0]} seconds</Label>
                <Slider
                  value={greenDuration}
                  onValueChange={setGreenDuration}
                  max={120}
                  min={20}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>20s</span>
                  <span>120s</span>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Red Light Duration: {redDuration[0]} seconds</Label>
                <Slider
                  value={redDuration}
                  onValueChange={setRedDuration}
                  max={90}
                  min={15}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>15s</span>
                  <span>90s</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
              <div>
                <Label className="text-sm text-muted-foreground">Total Cycle Time</Label>
                <div className="text-lg font-semibold">{greenDuration[0] + redDuration[0] + 5}s</div>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Yellow Duration</Label>
                <div className="text-lg font-semibold">5s</div>
              </div>
            </div>

            <Button onClick={handleSaveSignalSettings} className="w-full">
              <Save className="mr-2 h-4 w-4" />
              Save Configuration
            </Button>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <SettingsIcon className="h-5 w-5" />
              <span>System Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">System Health</Label>
                <Badge variant="success" className="w-full justify-center">Operational</Badge>
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Database Status</Label>
                <Badge variant="success" className="w-full justify-center">Connected</Badge>
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Active Signals</Label>
                <div className="text-2xl font-bold text-center">142/145</div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Network Status</Label>
                <Badge variant="success" className="w-full justify-center">Online</Badge>
              </div>
            </div>

            <div className="space-y-3">
              <Label>System Performance</Label>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>CPU Usage</span>
                  <span>34%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: '34%' }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Memory Usage</span>
                  <span>67%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-warning h-2 rounded-full" style={{ width: '67%' }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Network Load</span>
                  <span>23%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: '23%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Traffic Control Operators</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Zone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {operators.map((operator) => (
                <TableRow key={operator.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{operator.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{operator.email}</TableCell>
                  <TableCell>{operator.role}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span>{operator.zone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={operator.status === "Active" ? "success" : "secondary"}>
                      {operator.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{operator.lastLogin}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;