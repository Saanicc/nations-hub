import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Country } from "@/types/country";
import Link from "next/link";

const Geography = ({ country }: { country: Country }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Location</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2">
            Lat/Lon:{" "}
            <Link
              className="text-blue-500"
              href={`https://www.google.com/maps/place/${country.latlng.join(
                ","
              )}`}
              target="_blank"
            >
              {country.latlng.join(", ")}
            </Link>
          </p>
          <p className="mb-2">
            Capital location:{" "}
            <Link
              className="text-blue-500"
              href={`https://www.google.com/maps/place/${country.capitalInfo.latlng.join(
                ","
              )}`}
              target="_blank"
            >
              {country.capitalInfo.latlng.join(", ")}
            </Link>
          </p>
          <p>Landlocked: {country.landlocked ? "Yes" : "No"}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Maps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-2">
            <a
              href={country.maps.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Google Maps
            </a>
            <a
              href={country.maps.openStreetMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              OpenStreetMaps
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Geography;
