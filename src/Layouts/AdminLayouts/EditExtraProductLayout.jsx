import React, { createContext, useEffect, useState } from 'react';
import { EditExtraProductPage } from "../../Pages/AllPages";
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate ,useParams} from 'react-router-dom';
import Loading from '../../Components/Loading';
import axios from 'axios';
import { useAuth } from '../../Context/Auth';

export const productDataContext = createContext();


const EditExtraProductLayout =()=>{

    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [allProductData, setAllProductData] = useState([]);
    const [productEdit, setProductEdit] = useState(null);
    // -----------
    const [allProductData_ar, setAllProductData_ar] = useState([]);
    const [productEdit_ar, setProductEdit_ar] = useState(null);
    const { extraId } = useParams();

    const fetchData = async () => {
        setIsLoading(true);
        try {
               const response = await axios.get('https://clientbcknd.food2go.online/admin/v1/extra/show', {
                      headers: {
                             Authorization: `Bearer ${auth.user.token}`,
                      },
               });
               if (response.status === 200) {
                      console.log(response.data)
                      setAllProductData(response.data.extra)
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
              const response = await axios.get(' https://clientbcknd.food2go.online/admin/v1/extra/show?locale=ar', {
                     headers: {
                            Authorization: `Bearer ${auth.user.token}`,
                     },
              });
              if (response.status === 200) {
                     console.log(response.data)
                     setAllProductData_ar(response.data.extra)
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
        if (allProductData.length > 0 && extraId) {
               const filteredProduct = allProductData.find(
               (extra) => extra.id === parseInt(extraId)
               );
               setProductEdit(filteredProduct);
        }
      }, [allProductData, extraId]);

      useEffect(() => {
       if (allProductData_ar.length > 0 && extraId) {
              const filteredProduct = allProductData_ar.find(
              (extra) => extra.id === parseInt(extraId)
              );
              setProductEdit_ar(filteredProduct);
       }
     }, [allProductData_ar, extraId]);
  
      console.log('allProductData', allProductData); // Logging the whole array
      console.log('allProductData_Ar', allProductData_ar);
      console.log('productEditData', productEdit);
  
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
        <HeaderPageSection handleClick={handleGoBack} name="Edit Extra Product" />
        <productDataContext.Provider value={{productEdit,productEdit_ar}}>
           <EditExtraProductPage/>
        </productDataContext.Provider>
        </>
    )
}

export default EditExtraProductLayout;