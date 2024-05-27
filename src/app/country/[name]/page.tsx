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

  return (
    <div>
      <h1>{country.name}</h1>
      <p>{country.description}</p>

      <Image src={country.href.flag} width={100} height={100} alt={country.name} />
    </div>
  );
}

export default Page;