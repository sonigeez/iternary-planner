"use client";

import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface GoogleMapProps {
  center: google.maps.LatLngLiteral;
  zoom?: number;
  markers?: google.maps.LatLngLiteral[];
  route?: google.maps.LatLngLiteral[];
  onMapLoad?: (map: google.maps.Map) => void;
  onMapClick?: (e: google.maps.MapMouseEvent) => void;
  className?: string;
}

export default function GoogleMap({ 
  center, 
  zoom = 14, 
  markers = [], 
  route = [],
  onMapLoad,
  onMapClick,
  className = "h-[400px] w-full rounded-lg"
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        version: "weekly",
        libraries: ["places", "routes"]
      });

      const { Map } = await loader.importLibrary("maps");
      
      if (!mapRef.current) return;

      const mapInstance = new Map(mapRef.current, {
        center,
        zoom,
        mapTypeId: "roadmap",
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ]
      });

      if (onMapClick) {
        mapInstance.addListener("click", onMapClick);
      }

      setMap(mapInstance);
      if (onMapLoad) onMapLoad(mapInstance);
    };

    initMap();

    return () => {
      if (map && onMapClick) {
        google.maps.event.clearListeners(map, 'click');
      }
    };
  }, [center, zoom, onMapLoad, onMapClick]);

  useEffect(() => {
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Add new markers
    markers.forEach((position) => {
      const marker = new google.maps.Marker({
        position,
        map,
      });
      markersRef.current.push(marker);
    });

    // Center map on first marker
    if (markers.length > 0) {
      map.setCenter(markers[0]);
    }
  }, [map, markers]);

  useEffect(() => {
    if (!map || route.length < 2) return;

    const path = new google.maps.Polyline({
      path: route,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });
    path.setMap(map);

    return () => {
      path.setMap(null);
    };
  }, [map, route]);

  return <div ref={mapRef} className={className} />;
}