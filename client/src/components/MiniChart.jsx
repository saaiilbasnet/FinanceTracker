import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function MiniChart() {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const summaryRes = await axios.get(
        'http://localhost:3000/api/reports/summary',
        config
      );

      setTotalIncome(summaryRes.data.totalIncome || 0);
      setTotalExpense(summaryRes.data.totalExpense || 0);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching summary:', error);
      setLoading(false);
    }
  };

  const chartData = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        data: [totalIncome, totalExpense],
        backgroundColor: ['#22c55e', '#ef4444'],
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Overview</h2>
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Financial Overview</h2>
      <div className="h-64">
        {totalIncome > 0 || totalExpense > 0 ? (
          <Pie data={chartData} options={chartOptions} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No data yet</p>
          </div>
        )}
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Income:</span>
          <span className="font-semibold text-green-600">रु {totalIncome.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Expense:</span>
          <span className="font-semibold text-red-600">रु {totalExpense.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm pt-2 border-t">
          <span className="text-gray-600 font-medium">Balance:</span>
          <span className={`font-bold ${totalIncome - totalExpense >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            रु {(totalIncome - totalExpense).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MiniChart;