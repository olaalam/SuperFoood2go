import React, { createContext, useEffect, useState } from 'react';
import { EditAdminInformationPage } from "../../Pages/AllPages";
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate ,useParams} from 'react-router-dom';
import Loading from '../../Components/Loading';
import axios from 'axios';
import { useAuth } from '../../Context/Auth';

export const ContactDataContext = createContext();

const EditAdminInformationLayout =()=>{

    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [allContactData, setAllContactData] = useState([]);
    const [contactEdit, setContactEdit] = useState(null);
    const { contactId } = useParams();

    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try {
               const response = await axios.get('https://clientbcknd.food2go.online/admin/v1/contact_us', {
                      headers: {
                             Authorization: `Bearer ${auth.user.token}`,
                      },
               });
               if (response.status === 200) {
                      console.log(response.data)
                      setAllContactData(response.data.data)
               }
        } catch (error) {
               console.error('Error fetching data:', error);
        } finally {
               setIsLoading(false);
        }
    };
  fetchData(); }, []);

  useEffect(() => {
    if (allContactData.length > 0 && contactId) {
           const filteredContact = allContactData.find(
           (contact) => contact.id === parseInt(contactId)
           );
           setContactEdit(filteredContact);
    }
  }, [allContactData, contactId]);

  console.log('allContactInformationData', allContactData); // Logging the whole array
  console.log('ContactInformationEditData', contactEdit);


    const navigate = useNavigate();
    const handleGoBack = () => {
      navigate(-1, { replace: true });
    };
    return(
        <>
        <HeaderPageSection handleClick={handleGoBack} name="Edit Contact Information" />
        <ContactDataContext.Provider value={contactEdit}>
           <EditAdminInformationPage/>
        </ContactDataContext.Provider>
        </>
    )
}

export default EditAdminInformationLayout;
