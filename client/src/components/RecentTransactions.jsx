import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function RecentTransactions({ limit = 2 }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // component load huda recent transaction fetch garna
  useEffect(() => {
    fetchRecentTransactions();
  }, []);

  const fetchRecentTransactions = async () => {
    try {
      // localStorage bata token nikaleko
      const token = localStorage.getItem('token');

      // token header ma pathauna config banako
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      // income ra expense dubai database bata ekai choti fetch gareko
      const [incomeRes, expenseRes] = await Promise.all([
        axios.get('http://localhost:3000/api/income/all', config),
        axios.get('http://localhost:3000/api/expense/all', config)
      ]);

      // income data lai common format ma convert gareko
      const incomeData = (incomeRes.data.incomes || []).map(item => ({
        id: item.id,
        type: 'income',
        description: item.incomeDescription,
        amount: item.incomeAmount,
        source: item.incomeSource,
        date: item.incomeDate
      }));

      // expense data lai pani same format ma convert gareko
      const expenseData = (expenseRes.data.expenses || []).map(item => ({
        id: item.id,
        type: 'expense',
        description: item.expenseDescription,
        amount: item.expenseAmount,
        source: item.expenseSource,
        date: item.expenseDate
      }));

      // income ra expense milaera sort ra limit apply gareko
      const combined = [...incomeData, ...expenseData]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, limit);

      // state ma final data set gareko
      setTransactions(combined);
      setLoading(false);
    } catch (error) {
      // error aaye loading false gareko
      console.error('Error fetching transactions:', error);
      setLoading(false);
    }
  };

  // data load hudai cha bhane loading dekhaune
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Recent Transactions
        </h2>

        {/* history page ma jana link */}
        <Link
          to="/history"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          View All →
        </Link>
      </div>

      {/* transaction chaina bhane message dekhaune */}
      {transactions.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No transactions yet
        </p>
      ) : (
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={`${transaction.type}-${transaction.id}`}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                {/* income ho ki expense ho bhanera icon change */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'income'
                      ? 'bg-green-100'
                      : 'bg-red-100'
                  }`}
                >
                  <i
                    className={`fa-solid ${
                      transaction.type === 'income'
                        ? 'fa-arrow-down text-green-600'
                        : 'fa-arrow-up text-red-600'
                    }`}
                  ></i>
                </div>

                {/* description ra source dekhaune */}
                <div>
                  <p className="font-medium text-gray-800">
                    {transaction.description}
                  </p>
                  <p className="text-xs text-gray-500">
                    {transaction.source}
                  </p>
                </div>
              </div>

              {/* amount ra date dekhaune */}
              <div className="text-right">
                <p
                  className={`font-semibold ${
                    transaction.type === 'income'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {transaction.type === 'income' ? '+' : '-'} रु{' '}
                  {transaction.amount.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(transaction.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentTransactions;
