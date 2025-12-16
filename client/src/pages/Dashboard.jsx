import { useState } from 'react';
import SideBar from "../components/SideBar";
import SummaryCards from "../components/SummaryCards";
import RecentTransactions from "../components/RecentTransactions";
import QuickActions from "../components/QuickActions";
import MiniChart from "../components/MiniChart";

function Dashboard() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    // Increment key to force child components to refresh
    setRefreshKey(prevKey => prevKey + 1);
    
    window.dispatchEvent(new CustomEvent('refreshDashboard'));
    
    const refreshBtn = document.getElementById('refresh-btn');
    
  };

  return (
    <div className="flex h-screen w-full bg-gray-100">
      <SideBar />
      <div className="flex flex-col flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white shadow p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-gray-800 font-semibold text-xl">Dashboard</h1>
              <p className="text-sm text-gray-500">Welcome back! Here's your financial overview.</p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Refresh Button */}
              <button
                id="refresh-btn"
                onClick={handleRefresh}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 hover:shadow-sm"
                title="Refresh Dashboard"
              >
                <i className="fa-solid fa-rotate text-gray-600"></i>
                <span className="hidden sm:inline">Refresh</span>
              </button>
              
              {/* Quick Actions */}
              <QuickActions />
            </div>
          </div>
        </div>

        {/* Summary Cards - Pass refreshKey as prop */}
        <SummaryCards key={`summary-${refreshKey}`} />

        {/* Main Content - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Recent Transactions - Takes 2 columns */}
          <div className="lg:col-span-2">
            <RecentTransactions key={`transactions-${refreshKey}`} limit={2} />
          </div>

          {/* Mini Chart - Takes 1 column */}
          <div>
            <MiniChart key={`chart-${refreshKey}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;