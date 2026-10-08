import React, { createContext, useEffect, useState } from 'react';
import { EditActivityPage } from "../../Pages/AllPages";
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate ,useParams} from 'react-router-dom';
import Loading from '../../Components/Loading';
import axios from 'axios';
import { useAuth } from '../../Context/Auth';

export const ActivityDataLayout = createContext();

const EditActivityLayout =()=>{
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [allActivityData, setAllActivityData] = useState([]);
  const [activityEdit, setActivityEdit] = useState(null);
  const { activityId } = useParams();

  const [allActivityData_ar, setAllActivityData_ar] = useState([]);
  const [activityEdit_ar, setActivityEdit_ar] = useState(null);
  

  const fetchData = async () => {
    setIsLoading(true);
    try {
           const response = await axios.get('https://clientbcknd.food2go.online/admin/v1/activity', {
                  headers: {
                         Authorization: `Bearer ${auth.user.token}`,
                  },
           });
           if (response.status === 200) {
                  console.log(response.data)
                  setAllActivityData(response.data.activity)
           }
    } catch (error) {
           console.error('Error fetching data:', error);
    } finally {
           setIsLoading(false);
    }
};
const fetchData_ar = async () => {
       setIsLoading(true);
       try {
              const response = await axios.get(' https://clientbcknd.food2go.online/admin/v1/activity?locale=ar', {
                     headers: {
                            Authorization: `Bearer ${auth.user.token}`,
                     },
              });
              if (response.status === 200) {
                     console.log(response.data)
                     setAllActivityData_ar(response.data.activity)
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
       fetchData_ar(); 
   }, []);

  useEffect(() => {
    if (allActivityData.length > 0 && activityId) {
           const filteredActivity = allActivityData.find(
           (activity) => activity.id === parseInt(activityId)
           );
           setActivityEdit(filteredActivity);
    }
    }, [allActivityData, activityId]);

    useEffect(() => {
       if (allActivityData_ar.length > 0 && activityId) {
              const filteredActivity = allActivityData_ar.find(
              (activity) => activity.id === parseInt(activityId)
              );
              setActivityEdit_ar(filteredActivity);
       }
       }, [allActivityData_ar, activityId]);
    
    console.log('allActivityData', allActivityData); // Logging the whole array
    console.log('activityEdit', activityEdit);

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
        <HeaderPageSection handleClick={handleGoBack} name="Edit Activity" />
        <ActivityDataLayout.Provider value={{activityEdit,activityEdit_ar}}>
            <EditActivityPage/>
        </ActivityDataLayout.Provider>
        </>
    )
}

export default EditActivityLayout;
