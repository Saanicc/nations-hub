"use client";

import { useQuery } from "@tanstack/react-query";
import { LatLngExpression } from "leaflet";
import { MapContainer, Marker, TileLayer, GeoJSON, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { Spinner } from "../ui/loading-spinner";

type MapProps = {
  countryName: string;
  cca3: string;
  countryCoordinates: LatLngExpression;
  capitalCoordinates: LatLngExpression;
  zoom: number;
};

export default function MyMap({
  countryName,
  cca3,
  countryCoordinates,
  capitalCoordinates,
  zoom,
}: MapProps) {
  const { data: geoJsonData, isLoading } = useQuery({
    queryKey: ["geoJson", cca3],
    queryFn: async () => {
      const res = await fetch(`/api/proxy?cca3=${cca3}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch geoJSON data: ${res.status}`);
      }
      const resJson = await res.json();
      return resJson;
    },
    staleTime: 60 * 60 * 1000,
  });

  return (
    <>
      {isLoading ? (
        <Spinner>
          <p>Loading map...</p>
        </Spinner>
      ) : (
        <MapContainer
          center={countryCoordinates}
          zoom={zoom}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={capitalCoordinates}>
            <Popup>The capital of {countryName}.</Popup>
          </Marker>
          {geoJsonData && (
            <GeoJSON data={geoJsonData} style={{ color: "#ff9500" }} />
          )}
        </MapContainer>
      )}
    </>
  );
}
