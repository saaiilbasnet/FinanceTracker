import SideBar from "../components/SideBar"
import SummaryCards from "../components/SummaryCards"
import PieChart from "../components/PieChart"

function Dashboard() {
  return (
    <div className="flex h-screen w-screen">
      
    <SideBar />
    <div className="flex flex-col h-full w-full">
    <SummaryCards/>
    <PieChart/>
    </div>
    </div>
  )
}

export default Dashboard
