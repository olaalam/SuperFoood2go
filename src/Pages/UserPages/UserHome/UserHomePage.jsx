import { useEffect, useState } from 'react';
import { useAuth } from '../../../Context/Auth';
import Loading from '../../../Components/Loading';
import axios from 'axios';
import { useDispatch } from 'react-redux';
// import { addToCart, removeFromCart } from '../../../Redux/CartSlice.js';
// import { PiStorefront } from "react-icons/pi";
// import { CiMoneyCheck1 } from "react-icons/ci";
import { useNavigate ,Link } from 'react-router-dom';  // Import useNavigate
import { useTranslation } from 'react-i18next';
import UserSelect from '../../../Components/userSelect/UserSelect';

const UserHomePage = () => {
  
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [tutorialGroups, setTutorialGroups] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Replace useHistory with useNavigate
  const { t } = useTranslation();
  const [selectedPlanId, setSelectedPlanId] = useState(null)
  const [userData, setUserData] = useState('');

  const fetchData = async () => {
    setIsLoading(true);
    try {
        const response = await axios.get('https://clientbcknd.food2go.online/user/v1/my_service', {
            headers: {
                Authorization: `Bearer ${auth.user.token}`,
            },
        });
        if (response.status === 200) {
            console.log(response.data)
            setData(response.data);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        setIsLoading(false);
    }
  };

  const fetchTutorial = async () => {
    setIsLoading(true);
    try {
        const response = await axios.get(' https://clientbcknd.food2go.online/user/v1/tutorial', {
            headers: {
                Authorization: `Bearer ${auth.user.token}`,
            },
        });
        if (response.status === 200) {
            console.log(response.data)
            setTutorialGroups(response.data.tutorial_groups);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        setIsLoading(false);
    }
  };

  const ProfilefetchData = async () => {
    setIsLoading(true);
    try {
        const response = await axios.get(' https://clientbcknd.food2go.online/user/v1/profile', {
            headers: {
                Authorization: `Bearer ${auth.user.token}`,
            },
        });
        if (response.status === 200) {
            console.log(response.data)
            setUserData(response.data.user);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        setIsLoading(false);
    }
    };

  useEffect(() => {
      fetchData();
      fetchTutorial();
      ProfilefetchData()
  }, []);

  useEffect(() => {
    const savedPlanId = localStorage.getItem('selectedPlanId');
    if (savedPlanId) {
        setSelectedPlanId(savedPlanId);
    }
  }, []);

    if (isLoading) {
      return (
        <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
          <Loading />
        </div>
      );
  }    
    
  if (!data) {
      return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>{t("No data available")}</div>;
  }

  return (
    <div>
          
          <div className="p-2 xl:p-6 bg-gray-50 min-h-screen font-sans">
          <div className="w-full">
            {
              !selectedPlanId && (
                <UserSelect />
              )
            }
</div>
    {/* Header */}
    <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gradient-to-r from-mainColor to-mainColor text-white p-6 rounded-xl shadow-lg mb-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">{t("Welcome !")}</h1>
        <p className="text-gray-200 text-sm">
          {t("Here’s an overview of your dashboard")}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 mt-4 sm:mt-0">
        <Link to="store">
          <button className="bg-white text-mainColor px-5 py-3 rounded-lg shadow-md hover:shadow-lg transition hover:bg-gray-200 text-sm font-semibold">
            {t("Create Store")}
          </button>
        </Link>
        {/* <button className="bg-mainColor text-white px-5 py-3 rounded-lg shadow-md hover:shadow-lg transition hover:bg-blue-700 text-sm font-semibold">
          {t("Request Demo")}
        </button> */}
      </div>
    </header>

    {/* Main Content */}
    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 xl:gap-8">
      {/* Subscription Plan Section */}
      <div className="bg-white p-2 xl:p-6 rounded-xl shadow-lg hover:shadow-xl transition flex flex-col">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          {t("Your Plan")}
        </h2>
        <p className="text-gray-600  mb-2  text-xl">
          {t("Plan")}: <strong className="text-gray-800">{data.plan?.name || t("No Plan Available")}</strong>
        </p>

        <p className="text-gray-600  mb-2 text-xl">
        {t("Plan Duration")}: 
          <strong className="text-gray-800">
            {userData.package === "1" 
              ? "Monthly" 
              : userData.package === "3" 
              ? "3 Months" 
              : userData.package === "6" 
              ? "6 Months" 
              : userData.package === "yearly" 
              ? "Yearly" 
              : t("-")}
          </strong>
        </p>
        <p className="text-gray-600 mb-2 text-xl">
          {t("start date")}: <strong className="text-gray-800">{userData.start_date ||'0'}</strong>
        </p>
        <p className="text-gray-600 mb-2 text-xl">
          {t("expire date")}: <strong className="text-gray-800">{userData.expire_date ||'0'}</strong>
        </p>

        <Link to="subscription" className="mt-auto text-center bg-mainColor text-white px-4 py-3 rounded-lg  text-xl transition font-semibold">
          <button>
            {t("Upgrade Plan")}
          </button>
        </Link>
      </div>

      {/* Store Overview */}
      <div className="bg-white p-4 xl:p-6 rounded-xl shadow-lg hover:shadow-xl transition flex flex-col">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        {t("Your Stores")}
        </h2>
        <ul className="space-y-3 mb-6 max-h-40 overflow-y-auto">
          {data.stores?.length > 0 ? (
            data.stores.map((store, index) => (
              <li
                key={index}
                className="flex justify-between items-center text-gray-600 border-b pb-2">
                <span className="text-xl">{store.name}</span>
              </li>
            ))
          ) : (
            <p className="text-gray-600 text-xl">{t("No Stores Available")}</p>
          )}
        </ul>
        <Link to="store" className="mt-auto text-center bg-mainColor text-white px-4 py-3 rounded-lg  text-xl transition font-semibold">
          <button>
          {t("Create New Store")}
          </button>
        </Link>
      </div>

      {/* Domain Requests */}
      <div className="bg-white p-4 xl:p-6 rounded-xl shadow-lg hover:shadow-xl transition flex flex-col">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
      {t("Domains")}
        </h2>
        <div className="space-y-3 mb-6 max-h-40 overflow-y-auto">
          {data.domains?.length > 0 ? (
            data.domains.map((domain, index) => (
              <p key={index} className="text-gray-600 text-xl">
                {domain.name}
              </p>
            ))
          ) : (
            <p className="text-gray-600 text-sm">{t("No Domains Available")}</p>
          )}
        </div>
        <Link to="buy_domain" className="mt-auto text-center bg-mainColor text-white px-4 py-3 rounded-lg  text-xl transition font-semibold">
          <button>
          {t("Request New Domain")}
          </button>
        </Link>
      </div>

      {/* Extra Products */}
      <div className="bg-white p-4 xl:p-6 rounded-xl shadow-lg hover:shadow-xl transition flex flex-col">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
      {t("Extra Products")}
        </h2>
        <div className="space-y-3 mb-6 max-h-40 overflow-y-auto">
          {data.extras?.length > 0 ? (
            data.extras.map((extra, index) => (
              <p key={index} className="text-gray-600 text-xl">
                {extra.name}
              </p>
            ))
          ) : (
            <p className="text-gray-600 text-xl">{t("No Extra Products Available")}</p>
          )}
        </div>
        <Link to="extra" className="mt-auto text-center bg-mainColor text-white px-4 py-3 rounded-lg  text-xl transition font-semibold">
          <button>
          {t("Request New Extra Product")}
          </button>
        </Link>
      </div>

      {/* Tutorials */}
      <div className="bg-white p-4 xl:p-6 rounded-xl shadow-lg hover:shadow-xl transition flex flex-col">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
      {t("Learn and Grow")}
        </h2>
        <ul className="space-y-3 mb-6">
          {tutorialGroups.map((tutorial, index) => (
            <Link to="tutorial" className="text-mainColor text-xl font-medium hover:underline">
            <li key={index}>
              {tutorial.name}
            </li>
            </Link>
          ))}
        </ul>
        <Link to="tutorial" className="mt-auto text-center bg-mainColor text-white px-4 py-3 rounded-lg  text-xl transition font-semibold">
          <button>
          {t("Explore Tutorials")}
          </button>
        </Link>
      </div>
    </div>
  </div>

    </div>
  );
};

export default UserHomePage;
