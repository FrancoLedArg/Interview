import { Request, Response } from "express";

// Error
import { HttpError } from "./error";

export const getAvailableCountries = async (req: Request, res: Response) => {
  try {
    const response = await fetch(
      "https://date.nager.at/api/v3/AvailableCountries",
    );
    if (!response.ok) {
      throw new Error(`Error fetching countries: ${response.statusText}`);
    }

    const countries = await response.json();

    res.status(200).json({ message: "Success", data: countries });
  } catch (error: unknown) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ error, message: error.message });
      return;
    }

    res.status(500).json({ error, message: "Something went wrong" });
  }
};

export const getCountryInfo = async (req: Request, res: Response) => {
  try {
    const { countryCode } = req.params;
    if (!countryCode) {
      throw new Error("Country code is required");
    }

    const infoResponse = await fetch(
      `https://date.nager.at/api/v3/CountryInfo/${countryCode}`,
    );

    if (!infoResponse.ok) {
      throw new HttpError(
        `Error fetching country info: ${infoResponse.statusText}`,
        infoResponse.status,
      );
    }

    const countryInfo = await infoResponse.json();

    const populationResponse = await fetch(
      "https://countriesnow.space/api/v0.1/countries/population",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: countryInfo.commonName }),
      },
    );

    if (!populationResponse.ok) {
      throw new HttpError(
        `Error fetching population: ${populationResponse.statusText}`,
        populationResponse.status,
      );
    }

    const countryPopulation = await populationResponse.json();

    const isoResponse = await fetch(
      "https://countriesnow.space/api/v0.1/countries/iso",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: countryInfo.commonName }),
      },
    );

    if (!isoResponse.ok) {
      throw new HttpError(
        `Error fetching iso2: ${isoResponse.statusText}`,
        isoResponse.status,
      );
    }

    const countryIso2 = await isoResponse.json();

    const flagResponse = await fetch(
      "https://countriesnow.space/api/v0.1/countries/flag/images",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ iso2: countryIso2.data.Iso2 }),
      },
    );

    if (!flagResponse.ok) {
      throw new HttpError(
        `Error fetching flag: ${flagResponse.statusText}`,
        flagResponse.status,
      );
    }

    const countryFlag = await flagResponse.json();

    const countryData = {
      name: countryInfo.commonName,
      officialName: countryInfo.officialName,
      region: countryInfo.region,
      borders: countryInfo.borders,
      population: countryPopulation.data.populationCounts,
      flag: countryFlag.data.flag,
    };

    res.status(200).json({
      message: "Success",
      data: countryData,
    });
  } catch (error: unknown) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
      return;
    }

    res.status(500).json({ error, message: "Something went wrong" });
  }
};
