// // import React from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// // import { Line } from 'react-chartjs-2';
// import { ChartDataType } from '../types';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// interface ComplexChartProps {
//   chartData: ChartDataType[];
// }

// export default function ComplexChart({ chartData }: ComplexChartProps) {
//   const labelData = chartData.map((item) => item.date);
//   const areaData = chartData.map((item) => item.value.value_area);
//   const barData = chartData.map((item) => item.value.value_bar);
//   console.log(labelData, areaData, barData);
//   const complexData = {
//     labels: labelData,
//     datasets: [
//       {
//         type: 'bar',
//         label: 'bar dataset',
//         data: barData,
//       },
//       {
//         type: 'line',
//         label: 'line dataset',
//         data: areaData,
//       },
//     ],
//   };
//   return <ChartJS data={complexData} />;
// }

import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { ChartDataType } from '../types';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
);

interface ComplexChartProps {
  chartData: ChartDataType[];
}

export default function ComplexChart({ chartData }: ComplexChartProps) {
  const labelData = chartData.map((item) => item.date);
  const areaData = chartData.map((item) => item.value.value_area);
  const barData = chartData.map((item) => item.value.value_bar);

  const data = {
    labels: labelData,
    datasets: [
      {
        type: 'line' as const,
        label: 'value_area',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 2,
        fill: true,
        data: areaData,
        yAxisID: 'area-y-axis',
      },
      {
        type: 'bar' as const,
        label: 'valur_bar',
        backgroundColor: 'rgb(75, 192, 192)',
        data: barData,
        borderColor: 'white',
        borderWidth: 2,
        yAxisID: 'bar-y-axis',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    // height: '500px',
    // interaction: {
    //   mode: 'index' as const,
    //   intersect: false,
    // },
    // stacked: false,
    // plugins: {
    //   title: {
    //     display: true,
    //     text: 'Chart.js Line Chart - Multi Axis',
    //   },
    // },
    scales: {
      'bar-y-axis': {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        grid: {
          drawOnChartArea: false,
        },
      },
      'area-y-axis': {
        type: 'linear' as const,
        display: true,
        fill: true,
        position: 'right' as const,
        max: Math.max(...areaData) * 2,
      },
    },
  };

  return <Chart type='bar' data={data} options={options} height='500px' />;
}
