"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const originIcon = new L.DivIcon({
  html: `<div style="width:14px;height:14px;border-radius:50%;background:#00a050;border:2px solid white;box-shadow:0 2px 8px rgba(0,160,80,0.5)"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
  className: "",
});

const destinationIcon = new L.DivIcon({
  html: `<div style="width:14px;height:14px;border-radius:50%;background:#cc2020;border:2px solid white;box-shadow:0 2px 8px rgba(204,32,32,0.5)"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
  className: "",
});

const currentIcon = new L.DivIcon({
  html: `
    <div style="position:relative;width:24px;height:24px;">
      <div style="position:absolute;inset:0;border-radius:50%;background:rgba(0,85,255,0.15);border:1px solid rgba(0,85,255,0.3);animation:ping 2s cubic-bezier(0,0,0.2,1) infinite"></div>
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:12px;height:12px;border-radius:50%;background:#0055ff;border:2px solid white;box-shadow:0 2px 8px rgba(0,85,255,0.5)"></div>
    </div>
    <style>@keyframes ping{0%{transform:scale(1);opacity:.8}70%{transform:scale(2.5);opacity:0}100%{transform:scale(2.5);opacity:0}}</style>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  className: "",
});

const eventIcon = new L.DivIcon({
  html: `<div style="width:8px;height:8px;border-radius:50%;background:#b8941e;border:1.5px solid white;box-shadow:0 1px 4px rgba(184,148,30,0.4)"></div>`,
  iconSize: [8, 8],
  iconAnchor: [4, 4],
  className: "",
});

interface ShipmentEvent {
  id: string;
  location: string;
  lat: number;
  lng: number;
  description: string;
  timestamp: string;
}

interface MapViewProps {
  originLat: number;
  originLng: number;
  originName: string;
  destinationLat: number;
  destinationLng: number;
  destinationName: string;
  currentLat: number;
  currentLng: number;
  currentLocation: string;
  events: ShipmentEvent[];
}

function FitBounds({ bounds }: { bounds: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (bounds.length > 0) {
      map.fitBounds(bounds as L.LatLngBoundsExpression, { padding: [40, 40] });
    }
  }, [map, bounds]);
  return null;
}

export default function MapView({
  originLat, originLng, originName,
  destinationLat, destinationLng, destinationName,
  currentLat, currentLng, currentLocation,
  events,
}: MapViewProps) {
  const routePoints: [number, number][] = [
    [originLat, originLng],
    ...events.map((e): [number, number] => [e.lat, e.lng]),
    [currentLat, currentLng],
  ];

  const planPoints: [number, number][] = [
    [currentLat, currentLng],
    [destinationLat, destinationLng],
  ];

  const allBounds: [number, number][] = [
    [originLat, originLng],
    [destinationLat, destinationLng],
    [currentLat, currentLng],
  ];

  return (
    <MapContainer
      center={[currentLat, currentLng]}
      zoom={5}
      style={{ height: "100%", width: "100%", borderRadius: "inherit" }}
      zoomControl
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <FitBounds bounds={allBounds} />

      <Polyline positions={routePoints} pathOptions={{ color: "#0055ff", weight: 2.5, opacity: 0.8 }} />
      <Polyline positions={planPoints} pathOptions={{ color: "#a0b0c8", weight: 2, opacity: 0.6, dashArray: "8 8" }} />

      <Marker position={[originLat, originLng]} icon={originIcon}>
        <Popup>
          <div style={{ fontSize: "12px" }}>
            <strong style={{ color: "#00a050" }}>Origin</strong><br />{originName}
          </div>
        </Popup>
      </Marker>

      <Marker position={[destinationLat, destinationLng]} icon={destinationIcon}>
        <Popup>
          <div style={{ fontSize: "12px" }}>
            <strong style={{ color: "#cc2020" }}>Destination</strong><br />{destinationName}
          </div>
        </Popup>
      </Marker>

      {events.slice(1, -1).map((event) => (
        <Marker key={event.id} position={[event.lat, event.lng]} icon={eventIcon}>
          <Popup>
            <div style={{ fontSize: "12px" }}>
              <div style={{ color: "#b8941e", fontWeight: 600 }}>{event.location}</div>
              <div style={{ color: "#666", marginTop: 2 }}>{event.description}</div>
              <div style={{ color: "#999", marginTop: 2 }}>{new Date(event.timestamp).toLocaleString()}</div>
            </div>
          </Popup>
        </Marker>
      ))}

      <Marker position={[currentLat, currentLng]} icon={currentIcon}>
        <Popup>
          <div style={{ fontSize: "12px" }}>
            <div style={{ color: "#0055ff", fontWeight: 600 }}>Current Location</div>
            <div style={{ color: "#333", marginTop: 2 }}>{currentLocation}</div>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
