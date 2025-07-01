
function SideBar() {
  return (
    <div>
      <div className="flex h-screen">
  {/* Sidebar */}
  <aside className="w-64 bg-white shadow-md">
    <div className="p-4">
      <div className="flex items-center">
        <img src="../public/line-chart-computer-icons-bar-chart-statistics-symbol-2bfd0a5d99d340a746ade9150b7f994d.png" alt="Logo" className="h-8 w-auto" />
        <span className="ml-2 text-xl font-semibold text-gray-800">Finance Tracker</span>
      </div>
    </div>
    <nav className="mt-10 px-2">
      <a href="#" className="group flex items-center px-2 py-2 text-base font-medium rounded-md bg-indigo-100 text-indigo-700">
       <i class="fa-solid fa-house-chimney mr-4 text-2xl"></i>
        Dashboard
      </a>
      <a href="#" className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
<i class="fa-solid fa-chart-simple mr-5 text-2xl"></i>
        Reports
      </a>
      <a href="#" className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
        <i class="fa-solid fa-clock-rotate-left mr-4 text-2xl"></i>
        History
      </a>
      <a href="#" className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
<i class="fa-solid fa-user mr-5 text-2xl"></i>
        Profile
      </a>
      <a href="#" className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
<i class="fa-solid fa-gear mr-4 text-2xl"></i>
        Settings
      </a>
    </nav>

    <div className="mt-50 p-4">
      <div className="flex items-center">
        <img className="h-8 w-8 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXZElMNFXv-lQzkLqtLk7l1k090WNrupIZCw&s" alt="User" />
        <div className="ml-3">
          <p className="text-1xl font-bold text-gray-700">Saaiil Basnet</p>
          <p className="text-sm font-medium text-gray-500">View Profile</p>
        </div>
      </div>
    </div>
  </aside>
</div>
    </div>
  )
}

export default SideBar
