import Link from "next/link";
import Header from "@/components/Header/Header";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Header />

      <main>
        <section>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
                <span className="block">Welcome to CountryInfo</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
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
