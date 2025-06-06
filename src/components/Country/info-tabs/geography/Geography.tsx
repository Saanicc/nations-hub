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
    <Card className="w-full h-[65vh] p-0">
      <CardContent className="w-full h-full p-0">
        <Map
          countryName={country.name.common}
          capitalName={country.capital?.[0]}
          cca3={country.cca3}
          countryCoordinates={country.latlng as LatLngExpression}
          capitalCoordinates={country.capitalInfo.latlng as LatLngExpression}
        />
      </CardContent>
    </Card>
  );
};

export default Geography;
