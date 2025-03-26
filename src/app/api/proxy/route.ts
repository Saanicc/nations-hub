export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cca3 = searchParams.get("cca3");

  if (!cca3) {
    return new Response(JSON.stringify({ error: "Missing country code" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const response = await fetch(
      `https://www.geoboundaries.org/api/current/gbOpen/${cca3}/ADM0`
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }

    const data = await response.json();

    const geoJsonResponse = await fetch(data.simplifiedGeometryGeoJSON);

    if (!geoJsonResponse.ok) {
      throw new Error(`Error fetching geoJSON data: ${geoJsonResponse.status}`);
    }

    const geoJsonData = await geoJsonResponse.json();

    return new Response(JSON.stringify(geoJsonData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : "Unknown error occurred";
    return new Response(JSON.stringify({ error: errorMsg }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
