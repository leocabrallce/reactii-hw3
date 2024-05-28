import { Metadata } from "next";
import type { CountryPayload } from "@/types/CountryPayload";
import type { Country } from "@/types/Country";
import Image from "next/image";

const API_URL = process.env.API_URL as string;
const API_KEY = process.env.API_KEY as string;

type PageProps = {
  params: {
    name: string;
  };
};

async function getCountry(name: string): Promise<CountryPayload> {
  return fetch(`${API_URL}/${name}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  }).then((res) => res.json());
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const countryPayload = await getCountry(params.name);
  const country = countryPayload.data;

  return {
    title: country.name,
    description: country.name,
  };
}

async function Page({ params }: PageProps) {
  const countryPayload = await getCountry(params.name);
  const country = countryPayload.data;

  // show the country name, capital, flag, population, currency, and language. add the link to the country pages
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-semibold text-gray-900">{country.name}</h1>
        <div className="flex flex-col gap-4">
          {country.capital ? (
            <div>
              <span className="font-semibold">Capital:</span> {country.capital}
            </div>
          ) : null}
          {country.population ? (
            <div>
              <span className="font-semibold">Population:</span> {country.population}
            </div>
          ) : null}
          {country.currency ? (
            <div>
              <span className="font-semibold">Currency:</span> {country.currency}
            </div>
          ) : null}
          {country.description ? (
            <div>
              <span className="font-semibold">Description:</span> {country.description}
            </div>
          ) : null}
        </div>
        {country.href?.flag ?
          (<Image src={country.href.flag} alt={country.name} width={500} height={300} />) : null
        }
      </div>
    </div>
  );
}

export default Page;