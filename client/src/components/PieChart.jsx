import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Store the chart instance

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Destroy existing chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Expenses', 'Income', 'Remaining'],
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
        maintainAspectRatio: false, // Essential for controlling size within flex container
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

    // Cleanup on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    // Removed specific width and right padding, now relies on flex container
    <div className="bg-white p-4 rounded-lg shadow h-[400px] flex-1"> {/* Added bg, padding, shadow, and flex-1 */}
      <canvas ref={chartRef}></canvas>
      <div className="flex justify-center mt-4"> {/* Added legend manually for better control if needed, or rely on Chart.js legend */}
        <span className="flex items-center mr-4">
          <span className="block w-4 h-4 bg-pink-400 rounded-full mr-2"></span>Expenses
        </span>
        <span className="flex items-center">
          <span className="block w-4 h-4 bg-blue-400 rounded-full mr-2"></span>Income
        </span>
      </div>
    </div>
  );
};

export default PieChart;