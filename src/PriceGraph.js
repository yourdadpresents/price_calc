import React from "react";
import { Bar } from "react-chartjs-2";

const PriceGraph = ({ data }) => (
  <div>
    <h2>Bar Example (custom size)</h2>
    <Bar
      data={data}
      width={100}
      height={50}
      options={{
        maintainAspectRatio: false
      }}
    />
  </div>
);

export default PriceGraph;
