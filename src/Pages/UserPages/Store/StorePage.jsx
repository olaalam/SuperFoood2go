import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../Context/Auth';
import Loading from '../../../Components/Loading';
import axios from 'axios';
import {ButtonAdd} from '../../../Components/Button'
import { Link } from 'react-router-dom';
import {Wroning,DeleteIcon,EditIcon} from '../../../Components/Icons/AllIcons';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { MdCheck } from "react-icons/md";
import CheckBox from '../../../Components/CheckBox';
import { MdOutlinePending } from "react-icons/md";
import { FaStore, FaLink, FaTrashAlt, FaShoppingCart } from "react-icons/fa";
import { MdPending } from "react-icons/md";
import { FaCogs } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

const StorePage = () => {
  const { t } = useTranslation();

    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [stores, setStores] = useState('');
    const [storeChanged, setStoreChanged] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [openDialog, setOpenDialog] = useState(null);
    const [userData, setUserData] = useState('');
    const [userPlanId, setUserPlanId] = useState('');

    const fetchData = async () => {
        setIsLoading(true);
        try {
               const response = await axios.get('https://clientbcknd.food2go.online/user/v1/store', {
                      headers: {
                             Authorization: `Bearer ${auth.user.token}`,
                      },
               });
               if (response.status === 200) {
                      console.log(response.data)
                      setStores(response.data.stores)
               }
        } catch (error) {
               console.error('Error fetching data:', error);
        } finally {
               setIsLoading(false);
        }
    };

    const ProfilefetchData = async () => {
      setIsLoading(true);
      try {
          const response = await axios.get(' https://clientbcknd.food2go.online/user/v1/profile', {
              headers: {
                  Authorization: `Bearer ${auth.user.token}`,
              },
          });
          if (response.status === 200) {
              console.log(response.data)
              setUserData(response.data.user);
              setUserPlanId(response.data.user.plan_id);
          }
      } catch (error) {
          console.error('Error fetching data:', error);
      } finally {
          setIsLoading(false);
      }
      };
  
      useEffect(()=>{
        ProfilefetchData()
      },[])
  
    useEffect(() => {
        fetchData(); 
    }, [storeChanged]);

    const handleOpenDialog = (storeId) => {
       setOpenDialog(storeId);
       };

       const handleCloseDialog = () => {
              setOpenDialog(null);
       };

       const handleDelete = async (storeId) => {
              setIsDeleting(true);
              const success = await deleteStore(storeId, auth.user.token);
              setIsDeleting(false);
              handleCloseDialog();

              if (success) {
                     setStoreChanged(!storeChanged)
                     auth.toastSuccess('Store deleted successfully!');
                     setStores((prevStore) =>
                        prevStore.filter((store) => store.id !== storeId)
                     );
              } else {
                     auth.toastError('Failed to delete store.');
              }
       };

       const deleteStore = async (storeId, authToken) => {
              try {
                     const response = await axios.put(
                            ` https://clientbcknd.food2go.online/user/v1/store/delete/${storeId}`,
                            {}, // Empty object as request data
                            {
                            headers: {
                                   Authorization: `Bearer ${authToken}`,
                            },
                            }
                     );

                     return response.status === 200;
              } catch (error) {
                     console.error('Error deleting store:', error);
                     return false;
              }
       };    


    if (isLoading) {
        return (
          <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
            <Loading />
          </div>
        );
    }    
      
       return (
              <>
              {userPlanId === null ? (
                <div className="w-2/6 lg:w-1/6">
                  <Link to="../subscription">
                    <ButtonAdd
                      Text="Buy Plan"
                      isWidth="true"
                      BgColor="mainColor"
                      Color="white"
                      iconColor="white"
                    />
                  </Link>
                </div>
              ) : stores.length === 0 ? (
                <>
                  <div className="text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center">
                    No stores data available
                  </div>
                  <div className="w-2/6 lg:w-1/6">
                    <Link to="add">
                      <ButtonAdd
                        isWidth="true"
                        BgColor="mainColor"
                        Color="white"
                        iconColor="white"
                      />
                    </Link>
                  </div>
                </>
              ) : (
                <div className="w-full flex flex-col gap-10">
                  <div className="w-2/6 lg:w-1/6">
                    <Link to="add">
                      <ButtonAdd
                        isWidth="true"
                        BgColor="mainColor"
                        Color="white"
                        iconColor="white"
                      />
                    </Link>
                  </div>
                <div className="w-full flex flex-wrap items-center justify-start gap-10">
                  {stores.map((store) => (
                    <div
                      key={store.id}
                      // to={store.link_store}
                      className="lg:w-[45%] xl:w-[30%] sm:w-full bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 p-5"
                    >
                      <div className="flex items-center justify-between bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-4 rounded-t-3xl">
                        <div>
                          <h2 className="text-2xl font-semibold">{store.store_name}</h2>
                          <p className="mt-2 text-lg">{store.activity?.name || 'N/A'}</p>
                        </div>
                        <FaStore className="text-4xl text-white" />
                      </div>

                      <div className="p-4 bg-gray-100 rounded-b-3xl">
                      {store.deleted === 1 ? (
                          <div className="flex items-center text-lg gap-2 text-red-600">
                            <MdPending className="text-red-500" size={30} />
                            <span className="font-semibold">Pending Deleted</span>
                          </div>
                        ) : store.deleted !== 1 ? (
                        <>
                            {store.status === "pending" ? (
                              <div className="flex items-center text-lg gap-2 text-yellow-600">
                                <MdPending className="text-yellow-500" size={30} />
                                <span className="font-semibold">{t("Pending Created")}</span>
                              </div>
                            ) : (
                              <>
                                {/* <Link
                                key={store.id}
                                to={store.link_store}
                              > */}
                                <div className="mb-4">
                                  <p className="text-lg">{t("Store Link")}:</p>
                                  <Link
                                    href={store.link_store || "#"}
                                    className="text-lg text-blue-600 hover:text-blue-800"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <FaLink className="inline ml-1" />
                                    {store.link_store || "-"}
                                  </Link>
                                </div>

                                <div className="mb-4">
                                  <p className="text-lg">{t("email")}:</p>
                                  <p className="text-lg">{store.email || "-"}</p>
                                </div>

                                <div className="mb-4">
                                  <p className="text-lg">{t("password")}:</p>
                                  <p className="text-lg">{store.password || "-"}</p>
                                </div>

                                <div className="flex-col gap-3">
                                  {/* Go to Store button */}
                                 <div className="flex justify-between items-center ">
                                 <button
                                    onClick={() => window.open(store.link_store, "_blank")}
                                    className="inline-flex items-center gap-2 px-1 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition-all duration-300"
                                  >
                                    <FaLink />
                                    <span>{t("Go to Store")}</span>
                                  </button>

                                  {/* CPanel button */}
                                  <button
                                    onClick={() => console.log("Navigate to Control Panel")}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-all duration-300"
                                  >
                                    <FaCogs />
                                    <span>{t("CPanel")}</span>
                                  </button>
                                 </div>

                                  {/* Delete icon */}
                                  <button
                                    type="button"
                                    onClick={() => handleOpenDialog(store.id)}
                                    className="text-red-600 hover:text-red-700 transition-all duration-300"
                                  >
                                    <FaTrashAlt size={24} />
                                  </button>
                                </div>
                                {/* </Link> */}
                              </>
                            )}
                        </>
                        ):''}
                    </div>


                      {openDialog === store.id && (
                        <Dialog
                          open={true}
                          onClose={handleCloseDialog}
                          className="relative z-10"
                        >
                          <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-lg">
                                <div className="flex flex-col items-center justify-center bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                  <Wroning Width="28" Height="28" aria-hidden="true" />
                                  <div className="mt-2 text-center">
                                    <DialogTitle
                                      as="h3"
                                      className="text-xl font-semibold leading-10 text-gray-900"
                                    >
                                      Are you sure you want to delete store{" "}
                                      <span className="text-blue-600">{store.store_name || "_"}</span>?
                                    </DialogTitle>
                                  </div>
                                </div>
                                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                  <button
                                    type="button"
                                    onClick={() => handleDelete(store.id)}
                                    disabled={isDeleting}
                                    className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                                  >
                                    {isDeleting ? (
                                      <div className="flex w-10 h-5">
                                        <Loading />
                                      </div>
                                    ) : (
                                      "Delete"
                                    )}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={handleCloseDialog}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-6 py-3 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </DialogPanel>
                            </div>
                          </div>
                        </Dialog>
                      )}
                    </div>
                  ))}
                </div>
                </div>
              )}
            </>
            
       )
}

export default StorePage
