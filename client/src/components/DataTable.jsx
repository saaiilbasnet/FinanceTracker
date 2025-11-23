import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css'; // Don't forget to import the CSS!

function DataTable() {
  return (
    <div className="bg-white p-3 rounded-lg shadow flex-1 min-h-[300px]">
      <SimpleBar style={{ height: '100%', width: '100%' }} autoHide={false}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>

              <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>

              <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>

              {/* NEW ADD BUTTON COLUMN */}
              <th className="px-4 py-2.5 text-left">
                <button
                  onClick={() => console.log("Open Add Form")}
                  className="px-3 py-1.5 text-xs font-medium text-white bg-green-600 rounded-md hover:bg-green-500 transition duration-150 ease-in-out"
                >
                  <i className="fa-solid fa-plus mr-1"></i> Add
                </button>
              </th>

              {/* ACTION COLUMN */}
              <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-4 py-2.5 whitespace-nowrap text-sm">Salary added in bank.</td>
              <td className="px-4 py-2.5 whitespace-nowrap text-sm">21-Bhadra-2082</td>
              <td className="px-4 py-2.5 whitespace-nowrap">
                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Income
                </span>
              </td>
              <td></td>

              <td className="px-4 py-2.5 whitespace-nowrap">
                <button className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 transition duration-150 ease-in-out">
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button className="ml-2 px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-500 transition duration-150 ease-in-out">
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>

            <tr>
              <td className="px-4 py-2.5 whitespace-nowrap text-sm">EMI for laptop.</td>
              <td className="px-4 py-2.5 whitespace-nowrap text-sm">21-Bhadra-2082</td>
              <td className="px-4 py-2.5 whitespace-nowrap">
                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                  Expenses
                </span>
              </td>
              <td></td>

              <td className="px-4 py-2.5 whitespace-nowrap">
                <button className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 transition duration-150 ease-in-out">
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button className="ml-2 px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-500 transition duration-150 ease-in-out">
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>

            <tr>
              <td className="px-4 py-2.5 whitespace-nowrap text-sm">Weekly grocery shopping.</td>
              <td className="px-4 py-2.5 whitespace-nowrap text-sm">20-Bhadra-2082</td>
              <td className="px-4 py-2.5 whitespace-nowrap">
                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                  Expenses
                </span>
              </td>
              <td></td>

              <td className="px-4 py-2.5 whitespace-nowrap">
                <button className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 transition duration-150 ease-in-out">
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button className="ml-2 px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-500 transition duration-150 ease-in-out">
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>

            <tr>
              <td className="px-4 py-2.5 whitespace-nowrap text-sm">Payment for web project.</td>
              <td className="px-4 py-2.5 whitespace-nowrap text-sm">19-Bhadra-2082</td>
              <td className="px-4 py-2.5 whitespace-nowrap">
                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Income
                </span>
              </td>
              <td></td>

              <td className="px-4 py-2.5 whitespace-nowrap">
                <button className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 transition duration-150 ease-in-out">
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button className="ml-2 px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-500 transition duration-150 ease-in-out">
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>

            <tr>
              <td className="px-4 py-2.5 whitespace-nowrap text-sm">Monthly house rent.</td>
              <td className="px-4 py-2.5 whitespace-nowrap text-sm">18-Bhadra-2082</td>
              <td className="px-4 py-2.5 whitespace-nowrap">
                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                  Expenses
                </span>
              </td>
              <td></td>

              <td className="px-4 py-2.5 whitespace-nowrap">
                <button className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 transition duration-150 ease-in-out">
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button className="ml-2 px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-500 transition duration-150 ease-in-out">
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>

          </tbody>
        </table>
      </SimpleBar>
    </div>
  );
}

export default DataTable;
