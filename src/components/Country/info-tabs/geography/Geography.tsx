import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/loading-spinner";
import { Country } from "@/types/country";
import { LatLngExpression } from "leaflet";
import dynamic from "next/dynamic";
import { useMemo } from "react";

const Geography = ({ country }: { country: Country }) => {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map/Map"), {
        loading: () => (
          <Spinner>
            <p>Loading map...</p>
          </Spinner>
        ),
        ssr: false,
      }),
    []
  );

  return (
    <Card className="w-full h-[65vh]">
      <CardContent className="w-full h-full">
        <Map
          countryName={country.name.common}
          cca3={country.cca3}
          countryCoordinates={country.latlng as LatLngExpression}
          capitalCoordinates={country.capitalInfo.latlng as LatLngExpression}
          zoom={3}
        />
      </CardContent>
    </Card>
  );
};

export default Geography;
