import { FaArrowUp, FaArrowDown, FaRupeeSign, FaWallet, FaBalanceScale } from "react-icons/fa";

function SummaryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {/* Total Income Card */}
      <div className="bg-white h-40 p-5 rounded-2xl shadow flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-indigo-600">
            <FaWallet className="text-xl" />
            <span className="font-semibold text-gray-700">Total Income</span>
          </div>
          <button className="text-gray-400">⋮</button>
        </div>
        <div className="text-2xl font-bold text-gray-900">₹1,50,000.00</div>
        <div className="flex items-center text-green-500 font-medium">
          <FaArrowUp className="mr-1" />
          10% more than last month
        </div>
      </div>

      {/* Total Expenses Card */}
      <div className="bg-white h-40 p-5 rounded-2xl shadow flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-red-500">
            <FaBalanceScale className="text-xl" />
            <span className="font-semibold text-gray-700">Total Expenses</span>
          </div>
          <button className="text-gray-400">⋮</button>
        </div>
        <div className="text-2xl font-bold text-gray-900">₹60,000.00</div>
        <div className="flex items-center text-red-500 font-medium">
          <FaArrowDown className="mr-1" />
          5% more than last month
        </div>
      </div>

      {/* Remaining Balance Card */}
      <div className="bg-white h-40 p-5 rounded-2xl shadow flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-yellow-500">
            <FaRupeeSign className="text-xl" />
            <span className="font-semibold text-gray-700">Remaining Balance</span>
          </div>
          <button className="text-gray-400">⋮</button>
        </div>
        <div className="text-2xl font-bold text-gray-900">₹90,000.00</div>
        <div className="flex items-center text-green-500 font-medium">
          <FaArrowUp className="mr-1" />
          Budget under control
        </div>
      </div>
    </div>
  );
}

export default SummaryCards;