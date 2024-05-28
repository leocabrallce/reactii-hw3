"use client";
import { useState } from "react";
import type { Country } from "@/types/Country";

type Props = {
  countries: Country[];
};

function CountrySelector({ countries }: Props) {
  const [selectedCountry, setSelectedCountry] = useState("");

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <div className="max-w-2xl">
        <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
          Location
        </label>
        <select
          id="location"
          name="location"
          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue=""
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country.name} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <button
        disabled={!selectedCountry}
        onClick={() => {
          if (selectedCountry) {
            window.location.href = `/country/${selectedCountry}`;
          }
        }}
        type="button"
        className="rounded-md disabled:bg-white bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold disabled:text-gray-900 text-white shadow-sm ring-1 ring-inset ring-indigo-400 disabled:ring-gray-300 hover:bg-indigo-800 hover:cursor-pointer disabled:hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none transition-colors duration-150 ease-in-out"
      >
        Go to country
      </button>
    </div>
  );
}

export default CountrySelector;;