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
import { roundAndMultipy } from '../lib/utils';

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
  checkIsClick: (region: string) => boolean;
}

export default function ComplexChart({ chartData, checkIsClick }: ComplexChartProps) {
  const labelData = chartData.map((item) => item.date.slice(-8));
  const areaData = chartData.map((item) => item.value.value_area);
  const barData = chartData.map((item) => item.value.value_bar);
  const regionData = chartData.map((item) => item.value.id);
  const barColor = { default: 'rgba(255, 255, 255, 0.3)', selected: 'rgba(255, 255, 255, 0.8)' };
  const barColorData = regionData.map((region) => {
    if (checkIsClick(region)) {
      return barColor.selected;
    } else {
      return barColor.default;
    }
  });

  const data = {
    labels: labelData,
    datasets: [
      {
        type: 'line' as const,
        label: 'value_area',
        borderColor: '#438BFF',
        backgroundColor: '#438BFF',
        borderWidth: 1,
        fill: true,
        data: areaData,
        yAxisID: 'area-y-axis',
      },
      {
        type: 'bar' as const,
        label: 'valur_bar',
        backgroundColor: barColorData,
        data: barData,
        borderColor: 'white',
        borderWidth: 0,
        yAxisID: 'bar-y-axis',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    tooltips: {
      mode: 'index',
    },
    legend: {
      fontColor: 'white',
    },
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
        max: roundAndMultipy(areaData, 100, 2),
      },
    },
  };
  return <Chart type='bar' data={data} options={options} height='100px' />;
}
