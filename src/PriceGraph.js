import React from "react";
import { Bar } from "react-chartjs-2";

const PriceGraph = ({ data }) => (
  <div>
    <h2>Price Calculator</h2>
    <Bar
      data={data}
      width={100}
      height={50}
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
        }
      }}
    />
  </div>
);

export default PriceGraph;
