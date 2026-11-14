"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface Destination {
  city: string;
  country: string;
  coordinates: [number, number]; // [lng, lat]
  visited: string;
}

const DESTINATIONS: Destination[] = [
  { city: "Tokyo", country: "Japan", coordinates: [139.6917, 35.6895], visited: "2024" },
  { city: "Rome", country: "Italy", coordinates: [12.4964, 41.9028], visited: "2023" },
  { city: "Singapore", country: "Singapore", coordinates: [103.8198, 1.3521], visited: "2023" },
  { city: "Melbourne", country: "Australia", coordinates: [144.9631, -37.8136], visited: "2022" },
  { city: "Paris", country: "France", coordinates: [2.3522, 48.8566], visited: "2022" },
];

export function WorldMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return;

    try {
      const map = new maplibregl.Map({
        container: mapContainer.current,
        style: "https://demotiles.maplibre.org/style.json",
        center: [20, 20],
        zoom: 1.5,
        attributionControl: false,
      });

      map.addControl(new maplibregl.NavigationControl(), "top-right");

      map.on("load", () => {
        DESTINATIONS.forEach((d) => {
          const popup = new maplibregl.Popup({ offset: 25 }).setHTML(
            `<div style="color: #0A0A0A; font-family: sans-serif; padding: 4px;">
              <strong style="font-size: 14px;">${d.city}, ${d.country}</strong>
              <div style="font-size: 11px; color: #555; margin-top: 2px;">Visited: ${d.visited}</div>
            </div>`
          );

          new maplibregl.Marker({ color: "#C6A66B" })
            .setLngLat(d.coordinates)
            .setPopup(popup)
            .addTo(map);
        });
      });

      mapInstance.current = map;
    } catch (err) {
      console.error("Failed to initialize MapLibre GL map:", err);
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <div className="relative aspect-video w-full overflow-hidden border border-line bg-card">
      <div ref={mapContainer} className="h-full w-full" />
    </div>
  );
}
