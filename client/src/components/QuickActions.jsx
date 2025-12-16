import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function QuickActions() {
  const [showModal, setShowModal] = useState(false);
  const [transactionType, setTransactionType] = useState('income');
  const [availableBalance, setAvailableBalance] = useState(0);
  const [formData, setFormData] = useState({
    amount: '',
    source: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  // Fetch current balance when modal opens for expense
  useEffect(() => {
    if (showModal && transactionType === 'expense') {
      fetchBalance();
    }
  }, [showModal, transactionType]);

  const fetchBalance = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      // Fetch total income - handle both response structures
      const incomeRes = await axios.get('http://localhost:3000/api/income/all', config);
      const incomes = incomeRes.data.incomes || incomeRes.data || [];
      const totalIncome = incomes.reduce((sum, item) => {
        const amount = item.incomeAmount || item.amount || 0;
        return sum + parseFloat(amount);
      }, 0);

      // Fetch total expenses - handle both response structures
      const expenseRes = await axios.get('http://localhost:3000/api/expense/all', config);
      const expenses = expenseRes.data.expenses || expenseRes.data || [];
      const totalExpenses = expenses.reduce((sum, item) => {
        const amount = item.expenseAmount || item.amount || 0;
        return sum + parseFloat(amount);
      }, 0);

      console.log('Balance calculation:', {
        incomesCount: incomes.length,
        expensesCount: expenses.length,
        totalIncome,
        totalExpenses,
        balance: totalIncome - totalExpenses
      });

      setAvailableBalance(totalIncome - totalExpenses);
    } catch (error) {
      console.error('Error fetching balance:', error);
      toast.error('Failed to fetch balance');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.source || !formData.description || !formData.date) {
      toast.error('Please fill all fields');
      return;
    }

    const amount = parseFloat(formData.amount);

    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    // Validate expense doesn't exceed available balance
    if (transactionType === 'expense' && amount > availableBalance) {
      toast.error(`Cannot add expense! You only have Rs ${availableBalance.toFixed(2)} available.`);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login first');
        return;
      }

      const config = {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      const postPath = transactionType === 'income' ? 'income/new' : 'expense/add';
      const payload = transactionType === 'income' ? {
        incomeAmount: amount,
        incomeSource: formData.source,
        incomeDescription: formData.description,
        incomeDate: formData.date
      } : {
        expenseAmount: amount,
        expenseSource: formData.source,
        expenseDescription: formData.description,
        expenseDate: formData.date
      };

      console.log('Submitting transaction:', { postPath, payload });

      const response = await axios.post(
        `http://localhost:3000/api/${postPath}`, 
        payload, 
        config
      );

      console.log('Transaction response:', response.data);
      
      toast.success(`${transactionType === 'income' ? 'Income' : 'Expense'} added successfully!`);
      setShowModal(false);
      resetForm();
      
      // Instead of reloading the entire page, just refresh the data
      setTimeout(() => {
        // Trigger custom event that other components can listen to
        window.dispatchEvent(new CustomEvent('transactionAdded'));
        
        // Refresh balance if it was an expense
        if (transactionType === 'expense') {
          fetchBalance();
        }
      }, 500);

    } catch (error) {
      console.error('Error adding transaction:', error);
      
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        
        const errorMsg = error.response.data?.message || 
                        error.response.data?.error || 
                        'Server error';
        toast.error(`Error: ${errorMsg}`);
      } else if (error.request) {
        console.error('Error request:', error.request);
        toast.error('No response from server. Check your connection.');
      } else {
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      amount: '',
      source: '',
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const openModal = (type) => {
    setTransactionType(type);
    resetForm();
    setShowModal(true);
  };

  // Listen for transaction added events to refresh
  useEffect(() => {
    const handleTransactionAdded = () => {
      if (transactionType === 'expense') {
        fetchBalance();
      }
    };

    window.addEventListener('transactionAdded', handleTransactionAdded);
    return () => {
      window.removeEventListener('transactionAdded', handleTransactionAdded);
    };
  }, [transactionType]);

  return (
    <>
      <div className="flex gap-2">
        <button
          onClick={() => openModal('income')}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition flex items-center gap-2"
        >
          <i className="fa-solid fa-plus"></i>
          Add Income
        </button>
        <button
          onClick={() => openModal('expense')}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition flex items-center gap-2"
        >
          <i className="fa-solid fa-plus"></i>
          Add Expense
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Add {transactionType === 'income' ? 'Income' : 'Expense'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fa-solid fa-times text-lg"></i>
              </button>
            </div>
            
            {transactionType === 'expense' && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-blue-800 flex items-center">
                  <i className="fa-solid fa-wallet mr-2"></i>
                  Available Balance: <span className="font-semibold ml-1">Rs {availableBalance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </p>
                {availableBalance <= 0 && (
                  <p className="text-xs text-red-600 mt-1">
                    <i className="fa-solid fa-exclamation-triangle mr-1"></i>
                    You have no available balance for expenses
                  </p>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                  required
                  step="0.01"
                  min="0.01"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {transactionType === 'income' ? 'Source' : 'Category'}
                </label>
                <input
                  type="text"
                  value={formData.source}
                  onChange={(e) => setFormData({...formData, source: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={transactionType === 'income' ? 'e.g., Salary, Freelance' : 'e.g., Groceries, Rent'}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Add additional details..."
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Add {transactionType === 'income' ? 'Income' : 'Expense'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default QuickActions;