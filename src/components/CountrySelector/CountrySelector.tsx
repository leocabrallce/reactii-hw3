"use client";
import { useState } from "react";
import type { Country } from "@/types/Country";

type Props = {
  countries: Country[];
};

function CountrySelector({ countries }: Props) {
  const [selectedCountry, setSelectedCountry] = useState("");

  return (
    <div>
      <select
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
      <button
        onClick={() => {
          if (selectedCountry) {
            window.location.href = `/country/${selectedCountry}`;
          }
        }}
      >
        Go
      </button>
    </div>
  );
}

export default CountrySelector;