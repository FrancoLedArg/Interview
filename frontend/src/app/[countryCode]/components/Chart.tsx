"use client";
import React from "react";

// Components
import PopulationCharts from "../../components/PopulationCharts";

export default function Chart({
  data,
}: {
  data: { year: number; value: number }[];
}) {
  return <PopulationCharts populationData={data} />;
}
