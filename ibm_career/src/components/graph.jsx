// import React from "react";

// import { StackedBarChart } from "@carbon/charts-react";

// import "@carbon/styles/css/styles.css";
// import "@carbon/charts/styles.css";

// function Graph() {
//     const [stackedBarData, setStackedBarData] = React.useState([
//         // refer to tabular data format tutorial
//         { group: "Qty", value: 65000 },
//         { group: "More", value: 29123 },
//         { group: "Sold", value: 35213 },
//         { group: "Restocking", value: 51213 },
//         { group: "Misc", value: 16932 }
//     ]);

//     const [stackedBarOptions, setStackedBarOptions] = React.useState([
//         // refer to chart specific options
//         {title: "Try clicking a slice!",
//         resizable: true,}
//     ]);

//     return (
//         <div className="Graph">
//             <StackedBarChart
//                 data={stackedBarData}
//                 options={stackedBarOptions}
//             />
//         </div>
//     );
// }




import React, { useEffect, useRef } from "react";
import { DonutChart } from "@carbon/charts-react";

// Styles
import "@carbon/charts/styles.css";

export default function Graph() {
  const chartRef = useRef(null);

  const chartOnClick = ({ detail }) =>
    alert(`You clicked ${detail.datum.data.group}`);

  useEffect(() => {
    // You can see the current dispatched events here.
    // https://carbon-design-system.github.io/carbon-charts/documentation/modules/_interfaces_events_.html
    chartRef.current.chart.services.events.addEventListener(
      "pie-slice-click",
      chartOnClick
    );
  }, [chartRef]);

  // Unmount
  useEffect(
    () => () => {
      if (chartRef.current) {
        chartRef.current.chart.services.events.removeEventListener(
          "pie-slice-click",
          chartOnClick
        );
      }
    },
    []
  );

  const chartData = [
    {
      group: "Available",
      value: 1
    },
    {
      group: "Reserved",
      value: 2
    },
    {
      group: "Maintenance",
      value: 3
    }
  ];

  const chartOptions = {
    title: "Try clicking a slice!",
    resizable: true,
    donut: {
      center: {
        label: "Clusters"
      }
    },
    pie: {
      labels: {
        enabled: false
      }
    },
    color: {
      pairing: {
        option: 3
      }
    },
    height: "400px"
  };

  return (
    <>
      <DonutChart ref={chartRef} data={chartData} options={chartOptions} />
    </>
  );
}
