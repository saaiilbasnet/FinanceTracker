import SideBar from "../components/SideBar";
import SummaryCards from "../components/SummaryCards";
import PieChart from "../components/PieChart";
import DataTable from "../components/DataTable";

function Dashboard() {
  return (
    <div className="flex h-screen w-full bg-gray-100"> {/* Added bg-gray-100 for background color as in screenshot */}
      <SideBar />
      <div className="flex flex-col flex-1 overflow-auto"> {/* Changed w-400 to flex-1 and added overflow-auto */}
        <div className="bg-white shadow p-4 text-gray-800 font-semibold text-lg border-b border-gray-200">
            Dashboard {/* Added a simple top bar for consistency with screenshot */}
        </div>
        <SummaryCards />
        <div className="flex flex-col lg:flex-row gap-6 p-6 flex-grow"> {/* Added flex-grow, changed to flex-col for small screens, flex-row for large */}
          <PieChart />
          <DataTable />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;