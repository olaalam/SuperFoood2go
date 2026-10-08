import React, { createContext, useEffect, useState } from 'react';
import { EditStoresPage } from "../../Pages/AllPages";
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate ,useParams} from 'react-router-dom';
import Loading from '../../Components/Loading';
import axios from 'axios';
import { useAuth } from '../../Context/Auth';

export const StoresDataContext = createContext();

const EditStoresLayout =()=>{

    const auth = useAuth();
       const [isLoading, setIsLoading] = useState(false);
       const [allStoresData, setAllStoresData] = useState([]);
       const [storeEdit, setStoreEdit] = useState(null);
       const { storesId } = useParams();

       useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                   const response = await axios.get('https://clientbcknd.food2go.online/admin/v1/store/show/approve', {
                          headers: {
                                 Authorization: `Bearer ${auth.user.token}`,
                          },
                   });
                   if (response.status === 200) {
                          console.log(response.data)
                          setAllStoresData(response.data.stores)
                   }
            } catch (error) {
                   console.error('Error fetching data:', error);
            } finally {
                   setIsLoading(false);
            }
        };
    fetchData(); }, []);

    useEffect(() => {
      if (allStoresData.length > 0 && storesId) {
             const filteredStores = allStoresData.find(
             (stores) => stores.id === parseInt(storesId)
             );
             setStoreEdit(filteredStores);
      }
    }, [allStoresData, storesId]);

    console.log('allStoresData', allStoresData); // Logging the whole array
    console.log('storeEditData', storeEdit);

    const navigate = useNavigate();
    const handleGoBack = () => {
      navigate(-1, { replace: true });
    };
    return(
        <>
        <HeaderPageSection handleClick={handleGoBack} name="Edit Store" />
        <StoresDataContext.Provider value={storeEdit}>
           <EditStoresPage/>
        </StoresDataContext.Provider>
        </>
    )
}

export default EditStoresLayout;
