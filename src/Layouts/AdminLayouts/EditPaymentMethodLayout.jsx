import React, { createContext, useEffect, useState } from 'react';
import { EditPaymentMethodPage } from "../../Pages/AllPages";
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate ,useParams} from 'react-router-dom';
import Loading from '../../Components/Loading';
import axios from 'axios';
import { useAuth } from '../../Context/Auth';

export const PaymentMethodDataContext = createContext();

const EditPaymentMethodLayout =()=>{

    const auth = useAuth();
       const [isLoading, setIsLoading] = useState(false);
       const [allPaymentData, setAllPaymentData] = useState([]);
       const [paymentEdit, setPaymentEdit] = useState(null);
       const { methodId } = useParams();

       useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                   const response = await axios.get('https://clientbcknd.food2go.online/admin/v1/payment/method/show', {
                          headers: {
                                 Authorization: `Bearer ${auth.user.token}`,
                          },
                   });
                   if (response.status === 200) {
                          console.log(response.data)
                          setAllPaymentData(response.data.payment)
                   }
            } catch (error) {
                   console.error('Error fetching data:', error);
            } finally {
                   setIsLoading(false);
            }
        };
    fetchData(); }, []);

    useEffect(() => {
      if (allPaymentData.length > 0 && methodId) {
             const filteredPayment = allPaymentData.find(
             (payment) => payment.id === parseInt(methodId)
             );
             setPaymentEdit(filteredPayment);
      }
    }, [allPaymentData, methodId]);

    console.log('allPaymentData', allPaymentData); // Logging the whole array
    console.log('PaymentEditData', paymentEdit);

    const navigate = useNavigate();
    const handleGoBack = () => {
      navigate(-1, { replace: true });
    };
    return(
        <>
        <HeaderPageSection handleClick={handleGoBack} name="Edit Payment Method" />
        <PaymentMethodDataContext.Provider value={paymentEdit}>
           <EditPaymentMethodPage/>
        </PaymentMethodDataContext.Provider>
        </>
    )
}

export default EditPaymentMethodLayout;
