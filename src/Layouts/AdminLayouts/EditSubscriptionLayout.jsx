import React, { createContext, useEffect, useState } from 'react';
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate ,useParams} from 'react-router-dom';
import { EditSubscriptionPage } from "../../Pages/AllPages";
import Loading from '../../Components/Loading';
import axios from 'axios';
import { useAuth } from '../../Context/Auth';

export const SubscriperLayout = createContext();

const EditSubscriptionLayout =()=>{
    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [allUsersData, setAllUsersData] = useState([]);
    const [userEdit, setUserEdit] = useState(null);
    const { subscriptionId } = useParams();

    const fetchData = async () => {
        setIsLoading(true);
        try {
               const response = await axios.get('https://clientbcknd.food2go.online/admin/v1/subscripe', {
                      headers: {
                             Authorization: `Bearer ${auth.user.token}`,
                      },
               });
               if (response.status === 200) {
                      console.log(response.data)
                      setAllUsersData(response.data.users)
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

    useEffect(() => {
        if (allUsersData.length > 0 && subscriptionId) {
               const filteredUser = allUsersData.find(
               (user) => user.id === parseInt(subscriptionId)
               );
               setUserEdit(filteredUser);
        }
        }, [allUsersData, subscriptionId]);
        
        console.log('allSubscriperData', allUsersData); // Logging the whole array
        console.log('subscriperEdit', userEdit);

    const navigate = useNavigate();
    const handleGoBack = () => {
      navigate(-1, { replace: true });
    };

    if (isLoading) {
        return (
          <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
            <Loading />
          </div>
        );
      }

    return(
        <>
        <HeaderPageSection handleClick={handleGoBack} name="Edit Subscriper" />
        <SubscriperLayout.Provider value={userEdit}>
            <EditSubscriptionPage/>
        </SubscriperLayout.Provider>
        </>
    )
}

export default EditSubscriptionLayout;
