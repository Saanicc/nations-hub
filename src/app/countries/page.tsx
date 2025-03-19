import Countries from "@/components/Countries/Countries";
import Header from "@/components/Header/Header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import Search from "@/components/Countries/Search/Search";

export default function Home() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <main className="flex flex-col flex-grow container mx-auto p-4 pt-6 overflow-hidden">
        <Breadcrumb className="mt-14">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/countries">Countries</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Search />
        <div className="flex-grow overflow-hidden">
          <Countries />
        </div>
      </main>
    </div>
  );
}
