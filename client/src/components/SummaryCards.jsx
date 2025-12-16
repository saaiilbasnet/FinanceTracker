import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaArrowUp,
  FaArrowDown,
  FaRupeeSign,
  FaWallet,
  FaBalanceScale
} from "react-icons/fa";

function SummaryCards() {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0
  });

  const [loading, setLoading] = useState(true);

  // component load huda summary data fetch garna
  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      // localStorage bata token nikaleko
      const token = localStorage.getItem('token');

      // token header ma pathauna config banako
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      // backend bata income, expense ra balance fetch gareko
      const response = await axios.get(
        'http://localhost:3000/api/reports/summary',
        config
      );

      // response bata data state ma set gareko
      setSummary({
        totalIncome: response.data.totalIncome || 0,
        totalExpense: response.data.totalExpense || 0,
        balance: response.data.balance || 0
      });

      setLoading(false);
    } catch (error) {
      // error aaye loading false gareko
      console.error('Error fetching summary:', error);
      setLoading(false);
    }
  };

  // data load hudai cha bhane dekhaune
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white h-40 p-5 rounded-2xl shadow animate-pulse"
          >
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">

      {/* total income ko summary card */}
      <div className="bg-white h-40 p-5 rounded-2xl shadow flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-indigo-600">
            <FaWallet className="text-xl" />
            <span className="font-semibold text-gray-700">
              Total Income
            </span>
          </div>
          <button className="text-gray-400">⋮</button>
        </div>

        {/* total income amount dekhaune */}
        <div className="text-2xl font-bold text-gray-900">
          ₹{summary.totalIncome.toLocaleString()}
        </div>

        {/* income positive bhako dekhaune */}
        <div className="flex items-center text-green-500 font-medium text-sm">
          <FaArrowUp className="mr-1" />
          Current total
        </div>
      </div>

      {/* total expense ko summary card */}
      <div className="bg-white h-40 p-5 rounded-2xl shadow flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-red-500">
            <FaBalanceScale className="text-xl" />
            <span className="font-semibold text-gray-700">
              Total Expenses
            </span>
          </div>
          <button className="text-gray-400">⋮</button>
        </div>

        {/* total expense amount dekhaune */}
        <div className="text-2xl font-bold text-gray-900">
          ₹{summary.totalExpense.toLocaleString()}
        </div>

        {/* expense increase bhako dekhaune */}
        <div className="flex items-center text-red-500 font-medium text-sm">
          <FaArrowDown className="mr-1" />
          Current total
        </div>
      </div>

      {/* remaining balance ko summary card */}
      <div className="bg-white h-40 p-5 rounded-2xl shadow flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-yellow-500">
            <FaRupeeSign className="text-xl" />
            <span className="font-semibold text-gray-700">
              Remaining Balance
            </span>
          </div>
          <button className="text-gray-400">⋮</button>
        </div>

        {/* balance positive ki negative bhanera color change */}
        <div
          className={`text-2xl font-bold ${
            summary.balance >= 0
              ? 'text-gray-900'
              : 'text-red-600'
          }`}
        >
          ₹{summary.balance.toLocaleString()}
        </div>

        {/* budget control ma cha ki chaina dekhaune */}
        <div
          className={`flex items-center font-medium text-sm ${
            summary.balance >= 0
              ? 'text-green-500'
              : 'text-red-500'
          }`}
        >
          {summary.balance >= 0 ? (
            <>
              <FaArrowUp className="mr-1" />
              Budget under control
            </>
          ) : (
            <>
              <FaArrowDown className="mr-1" />
              Over budget
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SummaryCards;
