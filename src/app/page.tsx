import Link from "next/link";
import Header from "@/components/Header/Header";
import { Button } from "@/components/ui/button";
import WorldMap from "../../public/world-map.png";
import Image from "next/image";
import { WEBSITE_NAME } from "@/lib/constants";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Image
        src={WorldMap}
        alt="World map"
        className="absolute w-full h-full object-cover z-0"
        style={{ width: "100%", height: "100vh" }}
      />
      <Header transparent className="pt-10 px-4" />

      <main className="z-10">
        <section>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
                <span className="block">Welcome to {WEBSITE_NAME}</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-lg sm:text-xl md:mt-5 md:text-2xl md:max-w-3xl">
                Here you can find information about countries around the globe.
                <br />
                Click the button below to explore all countries.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <Link href="/countries" className="border-none">
                  <Button
                    variant="default"
                    className="w-full h-full m-0 px-8 py-4 hover:cursor-pointer"
                  >
                    Explore all countries
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
