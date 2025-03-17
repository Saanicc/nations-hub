import Countries from "@/components/Countries/Countries";
import Header from "@/components/Header/Header";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Countries />
      </main>
    </div>
  );
}
