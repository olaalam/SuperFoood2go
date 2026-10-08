import React, { createContext, useEffect, useState } from 'react';
import { EditWelcomOfferPage} from "../../Pages/AllPages";
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate ,useParams} from 'react-router-dom';
import Loading from '../../Components/Loading';
import axios from 'axios';
import { useAuth } from '../../Context/Auth';

export const WelcomOfferDataLayout = createContext();

const EditWelcomOfferLayout =()=>{

  const auth = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [allOfferData, setAllOfferData] = useState([]);
    const [offerEdit, setOfferEdit] = useState(null);
    const { welcomeOfferId } = useParams();

    const fetchData = async () => {
      setIsLoading(true);
      try {
             const response = await axios.get('https://clientbcknd.food2go.online/admin/v1/welcome_offer', {
                    headers: {
                           Authorization: `Bearer ${auth.user.token}`,
                    },
             });
             if (response.status === 200) {
                    setAllOfferData(response.data.offer)
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
        if (allOfferData && welcomeOfferId) {
            if (allOfferData.id === parseInt(welcomeOfferId)) {
              setOfferEdit(allOfferData);  // If IDs match, set the offer
            }
        }
        }, [allOfferData, welcomeOfferId]);
        
        console.log('allWelcomeOfferData', allOfferData); // Logging the whole array
        console.log('WelcomeOfferEdit', offerEdit);

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
        <HeaderPageSection handleClick={handleGoBack} name="Edit Welcome Offer" />
        <WelcomOfferDataLayout.Provider value={offerEdit}>
            <EditWelcomOfferPage/>
        </WelcomOfferDataLayout.Provider>
        </>
    )
}

export default EditWelcomOfferLayout;

