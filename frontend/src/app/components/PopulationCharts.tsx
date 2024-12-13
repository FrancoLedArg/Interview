import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface PopulationChartProps {
  populationData: { year: number; value: number }[];
}

const PopulationChart: React.FC<PopulationChartProps> = ({
  populationData,
}) => {
  const data = {
    labels: populationData.map((entry) => entry.year),
    datasets: [
      {
        label: "Population",
        data: populationData.map((entry) => entry.value),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Population Over Time",
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default PopulationChart;
