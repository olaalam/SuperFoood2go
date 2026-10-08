import React, { createContext, useEffect, useState } from 'react';
import { EditPlanPage } from "../../Pages/AllPages";
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate ,useParams} from 'react-router-dom';
import Loading from '../../Components/Loading';
import axios from 'axios';
import { useAuth } from '../../Context/Auth';

export const PlanDataContext = createContext();

const EditPlanLayout =()=>{

       const auth = useAuth();
       const [isLoading, setIsLoading] = useState(false);
       const [allPlanData, setAllPlanData] = useState([]);
       const [allPlanData_ar, setAllPlanData_ar] = useState([]);
       const [planEdit, setPlanEdit] = useState(null);
       const [planEdit_ar, setPlanEdit_ar] = useState(null);
       const { planId } = useParams();

       useEffect(() => {
       const fetchData = async () => {
        setIsLoading(true);
        try {
               const response = await axios.get('https://clientbcknd.food2go.online/admin/v1/plan/show', {
                      headers: {
                             Authorization: `Bearer ${auth.user.token}`,
                      },
               });
               if (response.status === 200) {
                      console.log(response.data)
                      setAllPlanData(response.data.plan)
               }
        } catch (error) {
               console.error('Error fetching data:', error);
        } finally {
               setIsLoading(false);
        }
    };
       fetchData(); }, []);

       useEffect(() => {
              const fetchData_ar = async () => {
              setIsLoading(true);
              try {
                     const response = await axios.get('https://clientbcknd.food2go.online/admin/v1/plan/show?locale=ar', {
                            headers: {
                                   Authorization: `Bearer ${auth.user.token}`,
                            },
                     });
                     if (response.status === 200) {
                            console.log(response.data)
                            setAllPlanData_ar(response.data.plan)
                     }
              } catch (error) {
                     console.error('Error fetching data:', error);
              } finally {
                     setIsLoading(false);
              }
       };
       fetchData_ar(); }, []);

    useEffect(() => {
      if (allPlanData.length > 0 && planId) {
             const filteredPlan = allPlanData.find(
             (plan) => plan.id === parseInt(planId)
             );
             setPlanEdit(filteredPlan);
      }
    }, [allPlanData, planId]);

    useEffect(() => {
       if (allPlanData_ar.length > 0 && planId) {
              const filteredPlan = allPlanData_ar.find(
              (plan) => plan.id === parseInt(planId)
              );
              setPlanEdit_ar(filteredPlan);
       }
     }, [allPlanData_ar, planId]);

    console.log('allPlanData', allPlanData); // Logging the whole array
    console.log('allPlanData_ar', allPlanData_ar); // Logging the whole array
    console.log('PlanEditData', planEdit);
    console.log('PlanEditData_ar', planEdit_ar);
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
        <HeaderPageSection handleClick={handleGoBack} name="Edit Plan" />
        <PlanDataContext.Provider value={{ planEdit, planEdit_ar }}>
              <EditPlanPage />
       </PlanDataContext.Provider>

        </>
    )
}

export default EditPlanLayout;
