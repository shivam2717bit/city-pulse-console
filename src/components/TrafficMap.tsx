import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation, Plus, Minus } from "lucide-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const TrafficMap = () => {
  const [zoom, setZoom] = useState(12);
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize Mapbox
    mapboxgl.accessToken = "pk.eyJ1Ijoic2hpdmFtMjcxNyIsImEiOiJjbWczYmw5dmcwZHd4MmtzOXVwdWNmNmdtIn0.QO7tYVbk7PwFEVA0yy_iNg";
    
    map.current = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [88.3639, 22.5726], // Kolkata coordinates
      zoom: zoom,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, []);

  // Update zoom when state changes
  useEffect(() => {
    if (map.current) {
      map.current.setZoom(zoom);
    }
  }, [zoom]);

  
  // Mock traffic zones data
  const trafficZones = [
    { id: 1, name: "CBD Central", x: 45, y: 30, status: "congested", vehicles: 234 },
    { id: 2, name: "Airport Road", x: 70, y: 50, status: "moderate", vehicles: 156 },
    { id: 3, name: "Industrial Zone", x: 25, y: 70, status: "clear", vehicles: 89 },
    { id: 4, name: "Highway Junction", x: 60, y: 20, status: "moderate", vehicles: 178 },
    { id: 5, name: "Residential Area", x: 80, y: 75, status: "clear", vehicles: 67 },
  ];

  // Mock traffic signals
  const trafficSignals = [
    { id: 1, x: 35, y: 40, status: "green", intersection: "Main & 1st" },
    { id: 2, x: 55, y: 35, status: "red", intersection: "Main & 2nd" },
    { id: 3, x: 65, y: 60, status: "green", intersection: "Airport & Central" },
    { id: 4, x: 40, y: 65, status: "yellow", intersection: "Industrial Gate" },
  ];

  const getZoneColor = (status: string) => {
    switch (status) {
      case "congested": return "bg-destructive/20 border-destructive";
      case "moderate": return "bg-warning/20 border-warning";
      case "clear": return "bg-success/20 border-success";
      default: return "bg-muted/20 border-muted";
    }
  };

  const getSignalColor = (status: string) => {
    switch (status) {
      case "green": return "bg-success";
      case "red": return "bg-destructive";
      case "yellow": return "bg-warning";
      default: return "bg-muted";
    }
  };

  return (
    <div className="relative w-full h-96 bg-muted/10 rounded-lg border overflow-hidden">
      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-10 space-y-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 bg-background"
          onClick={() => setZoom(Math.min(18, zoom + 1))}
        >
          <Plus className="h-3 w-3" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 bg-background"
          onClick={() => setZoom(Math.max(8, zoom - 1))}
        >
          <Minus className="h-3 w-3" />
        </Button>
      </div>

      {/* Mapbox Container */}
      <div ref={mapRef} className="w-full h-full relative">
        {/* Overlay for traffic zones and signals */}
        <div className="absolute inset-0 z-10">
        {/* Traffic Zones */}
        {trafficZones.map((zone) => (
          <div
            key={zone.id}
            className={`absolute rounded-full border-2 ${getZoneColor(zone.status)} transition-all duration-300 hover:scale-110 pointer-events-auto`}
            style={{
              left: `${zone.x}%`,
              top: `${zone.y}%`,
              width: '80px',
              height: '80px',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-xs font-medium text-center">{zone.name}</div>
              <div className="text-xs text-muted-foreground">{zone.vehicles} vehicles</div>
            </div>
          </div>
        ))}

        {/* Traffic Signals */}
        {trafficSignals.map((signal) => (
          <div
            key={signal.id}
            className="absolute group pointer-events-auto"
            style={{
              left: `${signal.x}%`,
              top: `${signal.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className={`w-4 h-4 rounded-full ${getSignalColor(signal.status)} border-2 border-background shadow-lg`} />
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-background border rounded px-2 py-1 text-xs whitespace-nowrap shadow-lg">
                {signal.intersection}
                <div className="text-xs text-muted-foreground capitalize">{signal.status} light</div>
              </div>
            </div>
          </div>
        ))}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-background/95 border rounded-lg p-3 space-y-2 pointer-events-auto">
          <div className="text-xs font-medium">Traffic Status</div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-destructive"></div>
              <span className="text-xs">High Congestion</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-warning"></div>
              <span className="text-xs">Moderate</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-success"></div>
              <span className="text-xs">Clear</span>
            </div>
          </div>
          <div className="border-t pt-2">
            <div className="text-xs font-medium">Traffic Signals</div>
            <div className="flex items-center space-x-4 mt-1">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-success"></div>
                <span className="text-xs">Go</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-warning"></div>
                <span className="text-xs">Caution</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-destructive"></div>
                <span className="text-xs">Stop</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficMap;
