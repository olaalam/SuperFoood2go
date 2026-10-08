import React, { createContext, useEffect, useState } from 'react';
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate ,useParams} from 'react-router-dom';
import { EditPromoCodePage } from "../../Pages/AllPages";
import Loading from '../../Components/Loading';
import axios from 'axios';
import { useAuth } from '../../Context/Auth';

export const PromoCodeDataLayout = createContext();

const EditPromoCodeLayout =()=>{

    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [allPromoCodeData, setAllPromoCodeData] = useState([]);
    const [promoCodeEdit, setPromoCodeEdit] = useState(null);
    const [allPromoCodeData_ar, setAllPromoCodeData_ar] = useState([]);
    const [promoCodeEdit_ar, setPromoCodeEdit_ar] = useState(null);
    const { codeId } = useParams();

    const fetchData = async () => {
        setIsLoading(true);
        try {
               const response = await axios.get('https://clientbcknd.food2go.online/admin/v1/promoCode/show', {
                      headers: {
                             Authorization: `Bearer ${auth.user.token}`,
                      },
               });
               if (response.status === 200) {
                      setAllPromoCodeData(response.data.promoCode)
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
              const response = await axios.get(' https://clientbcknd.food2go.online/admin/v1/promoCode/show?locale=ar', {
                     headers: {
                            Authorization: `Bearer ${auth.user.token}`,
                     },
              });
              if (response.status === 200) {
                     setAllPromoCodeData_ar(response.data.promoCode)
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
        if (allPromoCodeData.length > 0 && codeId) {
               const filteredPromoCode = allPromoCodeData.find(
               (code) => code.id === parseInt(codeId)
               );
               setPromoCodeEdit(filteredPromoCode);
        }
        }, [allPromoCodeData, codeId]);

        useEffect(() => {
              if (allPromoCodeData_ar.length > 0 && codeId) {
                     const filteredPromoCode = allPromoCodeData_ar.find(
                     (code) => code.id === parseInt(codeId)
                     );
                     setPromoCodeEdit_ar(filteredPromoCode);
              }
              }, [allPromoCodeData_ar, codeId]);
        
        console.log('allPromoCodeData', allPromoCodeData); // Logging the whole array
        console.log('promoCodeEdit', promoCodeEdit);

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
        <HeaderPageSection handleClick={handleGoBack} name="Edit PromoCode" />
        <PromoCodeDataLayout.Provider value={{promoCodeEdit,promoCodeEdit_ar}}>
            <EditPromoCodePage/>
        </PromoCodeDataLayout.Provider>
        </>
    )
}

export default EditPromoCodeLayout;

