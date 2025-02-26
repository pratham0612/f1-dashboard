const specialCases = {
  Alexander_Albon: "Alex_Albon",
  Melbourne_Grand_Prix_Circuit: "Albert_Park_Circuit",
  "Aut%C3%B3dromo_Jos%C3%A9_Carlos_Pace": "Interlagos_Circuit",
  Jeddah_Street_Circuit: "Jeddah_Corniche_Circuit",
  Autodromo_Nazionale_Monza: "Monza_Circuit",
  Suzuka_Circuit: "Suzuka_International_Racing_Course",
  "Las_Vegas_Grand_Prix#Circuit": "Las_Vegas_Grand_Prix",
};

// TheSportsDB API base URL (You need an API key from TheSportsDB)
const F1_API_URL = "https://www.thesportsdb.com/api/v1/json/YOUR_API_KEY/";

// Function to fetch F1 data for a specific URL (Driver or Circuit)
export default async function fetchF1Data(url) {
  try {
    let title = url.replace("http://en.wikipedia.org/wiki/", "");
    title = title.replace("https://en.wikipedia.org/wiki/", "");

    // Handle special cases (for circuits and drivers with special characters)
    title = specialCases[title] || title;

    // Fetching driver data from TheSportsDB API
    const driverResponse = await fetch(`${F1_API_URL}searchplayers.php?p=${title}`);
    if (!driverResponse.ok) return null;
    const driverData = await driverResponse.json();
    const playerData = driverData.player ? driverData.player[0] : null;

    // If driver found, get image URL
    const imageUrl = playerData ? playerData.strCutout : "/no-image.svg"; // Fallback to a default image if not found

    // Fetching circuit data from TheSportsDB API (optional, for circuit images)
    const circuitResponse = await fetch(`${F1_API_URL}searchcircuit.php?c=${title}`);
    if (!circuitResponse.ok) return { imageUrl };
    const circuitData = await circuitResponse.json();
    const circuitImageUrl = circuitData.circuit ? circuitData.circuit[0].strCircuit : "/no-circuit-image.svg";

    // Provide a summary if needed (can be customized or fetched from another source)
    const summary = `Information about ${title}. Customize as needed or fetch from another source.`;

    return { summary, imageUrl, circuitImageUrl };
  } catch (error) {
    console.error("Error fetching F1 data:", error);
    return null;
  }
}
