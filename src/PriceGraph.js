import React from "react";
import { Bar } from "react-chartjs-2";

const PriceGraph = ({ data }) => (
  <div>
    <h2>Bar Example (custom size)</h2>
    <Bar
      data={data}
      width={100}
      height={500}
      options={{
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: 10000
              }
            }
          ]
        },
        maintainAspectRatio: false
      }}
    />
  </div>
);

export default PriceGraph;
