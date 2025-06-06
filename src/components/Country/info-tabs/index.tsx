import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import React from "react";
import { Country } from "@/types/country";
import Details from "./details/Details";
import Languages from "./languages/Languages";
import Translations from "./translations/Translations";
import Geography from "./geography/Geography";
import Additional from "./additional/Additional";

const InfoTabs = ({ country }: { country: Country }) => {
  return (
    <Tabs defaultValue="details" className="mt-6">
      <TabsList className="flex flex-wrap h-auto items-start justify-start">
        <TabsTrigger value="details">Details</TabsTrigger>
        {country.languages && (
          <TabsTrigger value="languages">Languages</TabsTrigger>
        )}
        <TabsTrigger value="translations">Translations</TabsTrigger>
        <TabsTrigger value="geography">Geography</TabsTrigger>
        <TabsTrigger value="additional">Additional</TabsTrigger>
      </TabsList>

      <TabsContent value="details">
        <Details country={country} />
      </TabsContent>

      {country.languages && (
        <TabsContent value="languages">
          <Languages languages={country.languages} />
        </TabsContent>
      )}

      <TabsContent value="translations">
        <Translations translations={country.translations} />
      </TabsContent>

      <TabsContent value="geography">
        <Geography country={country} />
      </TabsContent>

      <TabsContent value="additional">
        <Additional country={country} />
      </TabsContent>
    </Tabs>
  );
};

export default InfoTabs;
