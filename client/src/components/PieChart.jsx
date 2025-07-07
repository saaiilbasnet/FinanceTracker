import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Chart.js v3+ (or include via <script> in HTML for static site)

const PieChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
          {
            data: [30, 40, 20],
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: 'black',
              font: {
                size: 14,
              },
              padding: 20,
            },
          },
        },
      },
    });
  }, []);

  return (
    <div className="font-sans leading-normal tracking-normal mt-2 ml-0 h-[400px] w-full  pr-150">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default PieChart;
