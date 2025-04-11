"use client";

import { useQuery } from "@tanstack/react-query";
import { LatLngExpression } from "leaflet";
import {
  MapContainer,
  Marker,
  TileLayer,
  GeoJSON,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { Spinner } from "../ui/loading-spinner";
import L from "leaflet";
import { useEffect } from "react";
import * as geojson from "geojson";

type MapProps = {
  countryName: string;
  cca3: string;
  countryCoordinates: LatLngExpression;
  capitalCoordinates?: LatLngExpression;
  capitalName?: string;
};

const GeoJSONCenter = ({
  geoJsonData,
  countryCoordinates,
}: {
  geoJsonData: geojson.FeatureCollection;
  countryCoordinates: LatLngExpression;
}) => {
  const map = useMap();

  useEffect(() => {
    if (geoJsonData && map) {
      const geoJSONlayer = L.geoJSON(geoJsonData);

      const bounds = geoJSONlayer.getBounds();

      if (bounds.isValid()) {
        const boundsZoom = map.getBoundsZoom(bounds);
        map.flyTo(countryCoordinates, boundsZoom, {
          animate: true,
          duration: 0.5,
        });

        setTimeout(() => {
          const worldBounds = L.latLngBounds([-90, -180], [90, 180]);
          map.setMaxBounds(worldBounds);
        }, 600);
      }
    }
  }, [geoJsonData, countryCoordinates, map]);

  return null;
};

export default function MyMap({
  countryName,
  capitalName,
  cca3,
  countryCoordinates,
  capitalCoordinates,
}: MapProps) {
  const {
    data: geoJsonData,
    isLoading,
    isError,
  } = useQuery<geojson.FeatureCollection>({
    queryKey: ["geoJson", cca3],
    queryFn: async () => {
      const res = await fetch(`/api/proxy?cca3=${cca3}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch geoJSON data: ${res.status}`);
      }
      const resJson = await res.json();
      return resJson;
    },
    gcTime: 60 * 60 * 1000,
    staleTime: 60 * 60 * 1000,
    retry: 3,
  });

  if (isError) {
    return <p>Failed to load map data</p>;
  }

  const capitalPopupText = capitalName
    ? `The capital of ${countryName} is ${capitalName}`
    : `The capital of ${countryName}`;

  return (
    <>
      <MapContainer
        center={[0, 0]}
        style={{ height: "100%", width: "100%", borderRadius: "10px" }}
        worldCopyJump={false}
        maxBoundsViscosity={1}
        zoom={1}
        minZoom={1}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {capitalCoordinates && (
          <Marker position={capitalCoordinates}>
            <Popup>
              <p>{capitalPopupText}</p>
            </Popup>
          </Marker>
        )}
        {isLoading && (
          <div className="w-full h-full flex items-center justify-center bg-[#000000aa] z-[100000] absolute">
            <Spinner>
              <p>Loading location data...</p>
            </Spinner>
          </div>
        )}
        {geoJsonData && (
          <>
            <GeoJSON data={geoJsonData} style={{ color: "#155dfc" }} />
            <GeoJSONCenter
              geoJsonData={geoJsonData}
              countryCoordinates={countryCoordinates}
            />
          </>
        )}
      </MapContainer>
    </>
  );
}
