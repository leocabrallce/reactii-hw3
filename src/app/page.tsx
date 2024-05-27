import type { CountryPayload } from "@/types/CountriesPayload";
import CountrySelector from "@/components/CountrySelector";

const API_URL = process.env.API_URL as string;
const API_KEY = process.env.API_KEY as string;

async function getCountries(): Promise<CountryPayload> {
  return fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  }).then((res) => res.json());
}

export default async function Home() {
  const countriesPayload = await getCountries();
  const countries = countriesPayload.data;

  // create a select element with all countries, and a button to navigate to the selected country
  return (
    <div>
      <CountrySelector countries={countries} />
    </div>
  );
}
