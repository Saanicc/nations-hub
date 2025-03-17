import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Country } from "@/types/country";

const Geography = ({ country }: { country: Country }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Location</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2">
            Latitude/Longitude: [{country.latlng.join(", ")}]
          </p>
          <p className="mb-2">
            Capital Location: [{country.capitalInfo.latlng.join(", ")}]
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
