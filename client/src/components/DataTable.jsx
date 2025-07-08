import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css'; // Don't forget to import the CSS!

function DataTable() {
  return (
    <div className="bg-white p-3 rounded-lg shadow flex-1 min-h-[300px]"> {/* Increased padding slightly (p-3) */}
      <SimpleBar style={{ height: '100%', width: '100%' }} autoHide={false}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              {/* Increased padding for headers, adjusted font size to text-xs */}
              <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              {/* Increased padding for table data cells, kept text-sm for data */}
              <td className="px-4 py-2.5 whitespace-nowrap text-sm">Salary</td>
              <td className="px-4 py-2.5 whitespace-nowrap text-sm">Salary added in bank.</td>
              <td className="px-4 py-2.5 whitespace-nowrap text-sm">21-Bhadra-2082</td>
              <td className="px-4 py-2.5 whitespace-nowrap">
                {/* Slightly increased padding for status tag, text-xs */}
                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Income</span>
              </td>
              <td className="px-4 py-2.5 whitespace-nowrap">
                {/* Slightly increased padding for buttons, kept text-xs */}
                <button className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"><i class="fa-solid fa-pen-to-square"></i></button>
                <button className="ml-2 px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"><i class="fa-solid fa-trash"></i></button>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 whitespace-nowrap text-sm">EMI</td>
              <td className="px-4 py-2.5 whitespace-nowrap text-sm">EMI for laptop.</td>
              <td className="px-4 py-2.5 whitespace-nowrap text-sm">21-Bhadra-2082</td>
              <td className="px-4 py-2.5 whitespace-nowrap">
                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Expenses</span>
              </td>
              <td className="px-4 py-2.5 whitespace-nowrap">
                <button className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"><i class="fa-solid fa-pen-to-square"></i></button>
                <button className="ml-2 px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"><i class="fa-solid fa-trash"></i></button>
              </td>
            </tr>
            {/* Add more rows to test the scrollbar more effectively */}
            <tr>
              <td className="px-4 py-2.5 whitespace-nowrap text-sm">Groceries</td>
              <td className="px-4 py-2.5 whitespace-nowrap text-sm">Weekly grocery shopping.</td>
              <td className="px-4 py-2.5 whitespace-nowrap text-sm">20-Bhadra-2082</td>
              <td className="px-4 py-2.5 whitespace-nowrap">
                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Expenses</span>
              </td>
              <td className="px-4 py-2.5 whitespace-nowrap">
                <button className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"><i class="fa-solid fa-pen-to-square"></i></button>
                <button className="ml-2 px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"><i class="fa-solid fa-trash"></i></button>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 whitespace-nowrap text-sm">Freelance</td>
              <td className="px-4 py-2.5 whitespace-nowrap text-sm">Payment for web project.</td>
              <td className="px-4 py-2.5 whitespace-nowrap text-sm">19-Bhadra-2082</td>
              <td className="px-4 py-2.5 whitespace-nowrap">
                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Income</span>
              </td>
              <td className="px-4 py-2.5 whitespace-nowrap">
                <button className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"><i class="fa-solid fa-pen-to-square"></i></button>
                <button className="ml-2 px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"><i class="fa-solid fa-trash"></i></button>
              </td>
            </tr>
             <tr>
              <td className="px-4 py-2.5 whitespace-nowrap text-sm">Rent</td>
              <td className="px-4 py-2.5 whitespace-nowrap text-sm">Monthly house rent.</td>
              <td className="px-4 py-2.5 whitespace-nowrap text-sm">18-Bhadra-2082</td>
              <td className="px-4 py-2.5 whitespace-nowrap">
                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Expenses</span>
              </td>
              <td className="px-4 py-2.5 whitespace-nowrap">
                <button className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"><i class="fa-solid fa-pen-to-square"></i></button>
                <button className="ml-2 px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"><i class="fa-solid fa-trash"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </SimpleBar>
    </div>
  );
}

export default DataTable;