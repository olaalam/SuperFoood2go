import React, { useEffect, useState } from "react";
import { FaMoneyBill, FaShoppingCart, FaUsers, FaChartLine } from "react-icons/fa";
import { useAuth } from '../../../Context/Auth';
import Loading from '../../../Components/Loading';
import axios from 'axios';
import { Link ,useNavigate} from 'react-router-dom';

const AdminHomePage = () => {
  const [data, setData] = useState({
    bending_payment: 3,
    revenue: 1000,
    order_pending: 6,
    order_in_progress: 5,
    signups: 100,
    monthly_signups: 10,
    subscriptions: 100,
    monthly_subscriptions: 10,
  });

  const [date, setDate] = useState("");
  const [payments, setPayments] = useState('');
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  const auth = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data2, setData2] = useState('');

  const fetchData = async () => {
      setIsLoading(true);
      try {
             const response = await axios.get('https://clientbcknd.food2go.online/admin/v1/home', {
                    headers: {
                           Authorization: `Bearer ${auth.user.token}`,
                    },
             });
             if (response.status === 200) {
                    console.log(response.data)
                    setData2(response.data)
                    setPayments(response.data.payments)
             }
      } catch (error) {
             console.error('Error fetching data:', error);
      } finally {
             setIsLoading(false);
      }
  };

  useEffect(() => {
      fetchData(); 
  }, []);

  if (isLoading) {
    return (
        <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
            <Loading />
        </div>
    );
}

if (!data2) {
    return (
        <div className="text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center">
            No data available
        </div>
    );
}

  const calculateProgress = (current, total) => {
    return total === 0 ? 0 : Math.round((current / total) * 100);
  };

  // Filter function
  const filteredPayments = payments.filter((payment) => {
    const paymentDate = new Date(payment.created_at);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    return (!start || paymentDate >= start) && (!end || paymentDate <= end);
  });

  // Calculate total count and amount
  const totalPayments = filteredPayments.length;
  const totalAmount = filteredPayments.reduce(
    (sum, payment) => sum + (payment.amount || 0),
    0
  );



  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
        Admin Dashboard
      </h1>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Bending Payment Card */}

        <Link to="pending_payment">
        <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition transform duration-300">
          <div className="flex justify-between items-center">
            <FaMoneyBill className="text-3xl" />
            {/* <span className="text-sm bg-white text-purple-700 py-1 px-3 rounded-full">
              +10%
            </span> */}
          </div>
          <h2 className="mt-4 text-lg font-semibold">Pending Payment</h2>
          <p className="text-3xl font-bold mt-2">{data2.pending_payments}</p>
        </div>
        </Link>

      <Link to="subscription">
        {/* Revenue Card */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition transform duration-300">
          <div className="flex justify-between items-center">
            <FaChartLine className="text-3xl" />
            {/* <span className="text-sm bg-white text-blue-700 py-1 px-3 rounded-full">
              +25%
            </span> */}
          </div>
          <h2 className="mt-4 text-lg font-semibold">Revenue</h2>
          <p className="text-3xl font-bold mt-2">{data2.payment_year} EGP</p>
        </div>
      </Link>

      <Link to="order">
        {/* Order Pending Card */}
        <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition transform duration-300">
          <div className="flex justify-between items-center">
            <FaShoppingCart className="text-3xl" />
            <span className="text-sm bg-white text-green-700 py-1 px-3 rounded-full">
              +8%
            </span>
          </div>
          <h2 className="mt-4 text-lg font-semibold">Order Pending</h2>
          <p className="text-3xl font-bold mt-2">{data2.pending_orders}</p>
        </div>
      </Link>
      
        {/* Order In Progress Card */}
        <Link to="order">
        <div className="bg-gradient-to-r from-red-500 to-red-700 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition transform duration-300">
          <div className="flex justify-between items-center">
            <FaShoppingCart className="text-3xl" />
            <span className="text-sm bg-white text-red-700 py-1 px-3 rounded-full">
              +5%
            </span>
          </div>
          <h2 className="mt-4 text-lg font-semibold">Order In Progress</h2>
          <p className="text-3xl font-bold mt-2">{data2.in_progress_orders}</p>
        </div>
        </Link>

      </div>

      {/* Signups and Subscriptions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
        {/* Signups Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700">Signups</h2>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Signups</p>
              <p className="text-2xl font-bold text-gray-800">{data2.total_users}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">This Month</p>
              <p className="text-2xl font-bold text-blue-500">
                {data2.users_this_month}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="relative w-20 h-20 mx-auto">
              <svg
                className="absolute inset-0 transform rotate-[-90deg]"
                viewBox="0 0 36 36"
              >
                <circle
                  className="text-gray-300"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="transparent"
                  r="15.9155"
                  cx="18"
                  cy="18"
                />
                <circle
                  className="text-blue-500"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={`${calculateProgress(
                    data.monthly_signups,
                    data.signups
                  )}, 100`}
                  fill="transparent"
                  r="15.9155"
                  cx="18"
                  cy="18"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-blue-500 text-lg">
                {calculateProgress(data.monthly_signups, data.signups)}%
              </div>
            </div>
          </div>
        </div>

        {/* Subscriptions Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700">Subscriptions</h2>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-2xl font-bold text-gray-800">
                {data2.total_subscriptions}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">This Month</p>
              <p className="text-2xl font-bold text-green-500">
                {data2.subscriptions_this_month}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="relative w-20 h-20 mx-auto">
              <svg
                className="absolute inset-0 transform rotate-[-90deg]"
                viewBox="0 0 36 36"
              >
                <circle
                  className="text-gray-300"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="transparent"
                  r="15.9155"
                  cx="18"
                  cy="18"
                />
                <circle
                  className="text-green-500"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={`${calculateProgress(
                    data.monthly_subscriptions,
                    data.subscriptions
                  )}, 100`}
                  fill="transparent"
                  r="15.9155"
                  cx="18"
                  cy="18"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-green-500 text-lg">
                {calculateProgress(data.monthly_subscriptions, data.subscriptions)}%
              </div>
            </div>
          </div>
        </div>
      </div>

     
      <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Payment Filter</h1>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Start Date */}
        <div>
          <label className="block text-gray-700">Start Date</label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-gray-700">End Date</label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {/* Results */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Filtered Payments</h2>
        <p>
          <strong>Total Payments:</strong> {totalPayments}
        </p>
        <p>
          <strong>Total Amount:</strong> {totalAmount}
        </p>

        {filteredPayments.length > 0 ? (
          <ul className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
  {filteredPayments.map((payment) => {
    const percentage = payment.amount
      ? Math.min((payment.amount / totalAmount) * 100, 100)
      : 0;

    return (
      <li
        key={payment.id}
        className="p-6 rounded-xl shadow-lg bg-gradient-to-r from-blue-100 to-white border border-gray-200 flex items-center justify-between transition-all duration-300 ease-in-out"

      >
        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-center space-x-4">
            <span className="font-semibold text-lg text-gray-800">
              <strong>Date:</strong> {new Date(payment.created_at).toLocaleDateString()}
            </span>
            {/* <span className="font-semibold text-lg text-gray-800">
              <strong>Amount:</strong> <span className="text-gray-900">${payment.amount}</span>
            </span> */}
          </div>
        </div>

        <div className="circle-progress relative w-16 h-16 flex-shrink-0 ml-8">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              r="15.9155"
              fill="transparent"
              stroke="#e0e0e0"
              strokeWidth="3"
            />
            <circle
              cx="18"
              cy="18"
              r="15.9155"
              fill="transparent"
              stroke="blue"
              strokeWidth="3"
              strokeDasharray={`${percentage}, 100`}
              className="text-gradient"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-blue-700 font-bold text-sm">

            {percentage.toFixed(0)}%
          </div>
        </div>
      </li>
    );
  })}
</ul>





        ) : (
          <p className="text-gray-500 mt-4">
            No payments match the filter criteria.
          </p>
        )}
      </div>
    </div>
    </div>
  );
};

export default AdminHomePage;
