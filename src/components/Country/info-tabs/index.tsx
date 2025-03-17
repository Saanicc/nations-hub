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
        <TabsTrigger value="languages">Languages</TabsTrigger>
        <TabsTrigger value="translations">Translations</TabsTrigger>
        <TabsTrigger value="geography">Geography</TabsTrigger>
        <TabsTrigger value="additional">Additional</TabsTrigger>
      </TabsList>

      <TabsContent value="details">
        <Details country={country} />
      </TabsContent>

      <TabsContent value="languages">
        <Languages country={country} />
      </TabsContent>

      <TabsContent value="translations">
        <Translations country={country} />
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
