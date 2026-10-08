import React, { createContext, useEffect, useState } from 'react';
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate ,useParams} from 'react-router-dom';
import { EditUserPage } from "../../Pages/AllPages";
import Loading from '../../Components/Loading';
import axios from 'axios';
import { useAuth } from '../../Context/Auth';

export const UserAddingLayout = createContext();

const EditUserLayout = () => {

        const auth = useAuth();
        const [isLoading, setIsLoading] = useState(false);
        const [allUsersData, setAllUsersData] = useState([]);
        const [userEdit, setUserEdit] = useState(null);
       //  const [allUsersData_ar, setAllUsersData_ar] = useState([]);
       //  const [userEdit_ar, setUserEdit_ar] = useState(null);
        const { userId } = useParams();

       useEffect(() => {
              const fetchData = async () => {
                     setIsLoading(true);
                     try {
                            const response = await axios.get('https://clientbcknd.food2go.online/admin/v1/users/view', {
                                   headers: {
                                          Authorization: `Bearer ${auth.user.token}`,
                                   },
                            });
                            if (response.status === 200) {
                                   console.log(response.data)
                                   setAllUsersData(response.data.user);
                                }
                     } catch (error) {
                            console.error('Error fetching data:', error);
                     } finally {
                            setIsLoading(false);
                     }
                 };
       fetchData(); }, []);

    

       useEffect(() => {
              if (allUsersData.length > 0 && userId) {
                     const filteredUser = allUsersData.find(
                     (user) => user.id === parseInt(userId)
                     );
                     setUserEdit(filteredUser);
              }
              }, [allUsersData, userId]);
              console.log('allUsersData', allUsersData); // Logging the whole array
              console.log('userEdit', userEdit);


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
             if (!allUsersData.length) {
              return <div className="text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center">No Tutorial Groups data available</div>;
            }
       return (
              <>
              <HeaderPageSection handleClick={handleGoBack} name="Edit User" />
              <UserAddingLayout.Provider value={userEdit}>
                     <EditUserPage/>
              </UserAddingLayout.Provider>
              </>
       )
}

export default EditUserLayout
