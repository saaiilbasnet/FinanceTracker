import { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import SideBar from "../components/SideBar";

// chart.js required components
ChartJS.register(ArcElement, Tooltip, Legend);

function Reports() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [expenseList, setExpenseList] = useState([]);

  // page load huda report ko data fetch garna
  useEffect(() => {
    loadReportData();
  }, []);

  // backend bata summary ra category-wise expense nikalna
  const loadReportData = async () => {
    try {
      const token = localStorage.getItem("token");

      // token navaye login garna vanera error set garne
      if (!token) {
        setError("Please login first");
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // total income, expense ra balance nikalna
      const summaryRes = await axios.get(
        "http://localhost:3000/api/reports/summary",
        config
      );

      // expense haru category wise breakdown nikalna
      const categoryRes = await axios.get(
        "http://localhost:3000/api/reports/category-breakdown",
        config
      );

      setTotalIncome(summaryRes.data.totalIncome || 0);
      setTotalExpense(summaryRes.data.totalExpense || 0);
      setExpenseList(categoryRes.data.expenseBySource || []);

      setLoading(false);
    } catch (error) {
      let errorMessage = "Failed to load report data";

      // token invalid bhaye
      if (error.response?.status === 401) {
        errorMessage = "Authentication failed. Please login again.";
      }
      // server error bhaye
      else if (error.response?.status === 500) {
        errorMessage = "Server error occurred";
      }
      // server connect nai navaye
      else if (error.request) {
        errorMessage = "Cannot connect to server";
      }

      setError(errorMessage);
      setLoading(false);
    }
  };

  // chart ko basic configuration
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  // income ra expense ko pie chart data
  const incomeExpenseData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [totalIncome, totalExpense],
        backgroundColor: ["#22c55e", "#ef4444"],
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  };

  // expense category wise pie chart data
  const expenseCategoryData = {
    labels: expenseList.map(item => item.expenseSource),
    datasets: [
      {
        data: expenseList.map(item => item.total),
        backgroundColor: [
          "#ef4444",
          "#f97316",
          "#eab308",
          "#22c55e",
          "#3b82f6",
          "#8b5cf6",
          "#ec4899",
        ],
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  };

  // loading state
  if (loading) {
    return (
      <div className="flex h-screen w-full bg-gray-100">
        <SideBar />
        <div className="flex flex-col flex-1 overflow-auto">
          <div className="bg-white shadow p-4 text-gray-800 font-semibold text-lg border-b border-gray-200">
            Reports
          </div>
          <div className="flex items-center justify-center flex-grow">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-lg text-gray-600">Loading reports...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // error state
  if (error) {
    return (
      <div className="flex h-screen w-full bg-gray-100">
        <SideBar />
        <div className="flex flex-col flex-1 overflow-auto">
          <div className="bg-white shadow p-4 text-gray-800 font-semibold text-lg border-b border-gray-200">
            Reports
          </div>
          <div className="flex items-center justify-center flex-grow">
            <div className="text-center max-w-md p-6">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <p className="font-bold mb-2">Error</p>
                <p>{error}</p>
              </div>
              <button
                onClick={() => {
                  setError(null);
                  setLoading(true);
                  loadReportData();
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-gray-100">
      <SideBar />
      <div className="flex flex-col flex-1 overflow-auto">
        {/* top bar */}
        <div className="bg-white shadow p-4 text-gray-800 font-semibold text-lg border-b border-gray-200">
          Reports
        </div>

        {/* main content */}
        <div className="p-6 flex-grow">
          {/* summary section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 text-sm mb-2">Total Income</p>
              <p className="text-3xl font-bold text-green-600">
                रु {totalIncome.toLocaleString()}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 text-sm mb-2">Total Expense</p>
              <p className="text-3xl font-bold text-red-600">
                रु {totalExpense.toLocaleString()}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
              <p className="text-gray-600 text-sm mb-2">Net Balance</p>
              <p className={`text-3xl font-bold ${
                totalIncome - totalExpense >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}>
                रु {(totalIncome - totalExpense).toLocaleString()}
              </p>
            </div>
          </div>

          {/* charts section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Income vs Expense
              </h2>
              <div className="h-64">
                {(totalIncome > 0 || totalExpense > 0) ? (
                  <Pie data={incomeExpenseData} options={chartOptions} />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">No data available</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Expense by Category
              </h2>
              <div className="h-64">
                {expenseList.length > 0 ? (
                  <Pie data={expenseCategoryData} options={chartOptions} />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">No expense data available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
