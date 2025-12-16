import { useState, useEffect } from 'react';
import axios from 'axios';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import SideBar from '../components/SideBar';

function HistoryPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // page load huda transaction data fetch garna
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      // localStorage bata token nikaleko
      const token = localStorage.getItem('token');

      // token chaina bhane login message dekhaune
      if (!token) {
        setError('Please login first');
        return;
      }

      // token header ma pathauna config 
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      // income, expense  API
      const [incomeRes, expenseRes] = await Promise.all([
        axios.get('http://localhost:3000/api/income/all', config),
        axios.get('http://localhost:3000/api/expense/all', config)
      ]);

      // income data format change 
      const incomeData = incomeRes.data.incomes.map(item => ({
        id: item.id,
        type: 'income',
        source: item.incomeSource,
        amount: parseFloat(item.incomeAmount),
        date: item.incomeDate
      }));

      // expense data format change
      const expenseData = expenseRes.data.expenses.map(item => ({
        id: item.id,
        type: 'expense',
        source: item.expenseSource,
        amount: parseFloat(item.expenseAmount),
        date: item.expenseDate
      }));

      // income and expense combine garera date anusar sort 
      const combined = [...incomeData, ...expenseData].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      setTransactions(combined);
      setLoading(false);
    } catch (error) {
      
      console.error('Error fetching transactions:', error);
      setError('Failed to load transactions');
      setLoading(false);
    }
  };

  // total income, expense and net balance calculate 
  const calculateTotals = () => {
    const incomeTotal = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expenseTotal = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      incomeTotal,
      expenseTotal,
      netTotal: incomeTotal - expenseTotal
    };
  };

  // date lai YYYY/MM/DD format ma change 
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}/${String(
      date.getMonth() + 1
    ).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
  };

  const totals = calculateTotals();

  //  loading screen 
  if (loading) {
    return (
      <div className="flex h-screen w-full bg-gray-100">
        <SideBar />
        <div className="flex flex-col flex-1 overflow-auto">
          <div className="bg-white shadow p-4 text-gray-800 font-semibold text-lg border-b border-gray-200">
            Transaction History
          </div>
          <div className="flex items-center justify-center flex-grow">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">
                Loading transaction history...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen w-full bg-gray-100">
        <SideBar />
        <div className="flex flex-col flex-1 overflow-auto">
          <div className="bg-white shadow p-4 text-gray-800 font-semibold text-lg border-b border-gray-200">
            Transaction History
          </div>
          <div className="flex items-center justify-center flex-grow">
            <div className="text-center">
              <div className="text-red-500 text-4xl mb-4">
                <i className="fa-solid fa-circle-exclamation"></i>
              </div>
              <p className="text-gray-700 mb-4">{error}</p>
              <button
                onClick={fetchTransactions}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
        <div className="bg-white shadow p-4 text-gray-800 font-semibold text-lg border-b border-gray-200">
          Transaction History
        </div>

        <div className="p-6 flex-grow">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Transaction History
            </h1>
            <p className="text-gray-600">
              Track all your income and expenses
            </p>
          </div>

          {/* total summary  */}
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">Total Income</p>
                <p className="text-xl font-bold text-green-600">
                  रु {totals.incomeTotal.toLocaleString()}
                </p>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600">Total Expense</p>
                <p className="text-xl font-bold text-red-600">
                  रु {totals.expenseTotal.toLocaleString()}
                </p>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600">Net Balance</p>
                <p
                  className={`text-xl font-bold ${
                    totals.netTotal >= 0
                      ? 'text-blue-600'
                      : 'text-orange-600'
                  }`}
                >
                  रु {Math.abs(totals.netTotal).toLocaleString()}
                  <span className="text-sm ml-2">
                    {totals.netTotal >= 0 ? '(+)' : '(-)'}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* transaction table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <SimpleBar style={{ maxHeight: '60vh' }}>
              <table className="min-w-full">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Source / Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Amount
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {transactions.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="px-6 py-12 text-center">
                        <p className="text-gray-500">
                          No transactions found
                        </p>
                      </td>
                    </tr>
                  ) : (
                    transactions.map((transaction) => (
                      <tr
                        key={`${transaction.type}-${transaction.id}`}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {formatDate(transaction.date)}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {transaction.source}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div
                            className={`text-sm font-medium ${
                              transaction.type === 'income'
                                ? 'text-green-600'
                                : 'text-red-600'
                            }`}
                          >
                            {transaction.type === 'income' ? '+' : '-'} रु{' '}
                            {transaction.amount.toLocaleString()}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </SimpleBar>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryPage;
