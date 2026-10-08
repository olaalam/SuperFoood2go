import React, { useEffect, useState } from "react";
import { useAuth } from "../../../Context/Auth";
import Loading from "../../../Components/Loading";
import axios from "axios";
import { ButtonAdd } from "../../../Components/Button";
import { Link } from "react-router-dom";
import {Wroning,DeleteIcon,EditIcon} from '../../../Components/Icons/AllIcons';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

const WelcomeOfferPage = () => {
        const auth = useAuth();
        const [isLoading, setIsLoading] = useState(false);
        const [offer, setOffer] = useState(null);
        const [offerChanged, setOfferChanged] = useState(false);
        const [isDeleting, setIsDeleting] = useState(false);
        const [openDialog, setOpenDialog] = useState(null);

        const fetchData = async () => {
        setIsLoading(true);
        try {
               const response = await axios.get(' https://clientbcknd.food2go.online/admin/v1/welcome_offer', {
                      headers: {
                             Authorization: `Bearer ${auth.user.token}`,
                      },
               });
               if (response.status === 200) {
                      console.log(response.data)
                      setOffer(response.data.offer)
               }
        } catch (error) {
               console.error('Error fetching data:', error);
        } finally {
               setIsLoading(false);
        }
        };

        const handleOpenDialog = (offerId) => {
                setOpenDialog(offerId);
        };
 
        const handleCloseDialog = () => {
             setOpenDialog(null);
        };
 
        const handleDelete = async (offerId) => {
               setIsDeleting(true);
               const success = await deleteOffer(offerId, auth.user.token);
               setIsDeleting(false);
               handleCloseDialog();
 
               if (success) {
                //       setOfferChanged(!offerChanged)
                      auth.toastSuccess('Welcome Offer deleted successfully!');
                //       setOffer((prevOffer) =>
                //         prevOffer.filter((offer) => offer.id !== offerId)
                //       );
               } else {
                      auth.toastError('Failed to delete Welcome Offer.');
               }
        };
 
        const deleteOffer = async (offerId, authToken) => {
               try {
                      const response = await axios.delete(` https://clientbcknd.food2go.online/admin/v1/welcome_offer/delete/${offerId}`, {
                             headers: {
                                    Authorization: `Bearer ${authToken}`,
                             },
                      });
 
                      if (response.status === 200) {
                             console.log('Welcome Offer deleted successfully');
                             return true;
                      } else {
                             console.error('Failed to delete Welcome Offer:', response.status, response.statusText);
                             return false;
                      }
               } catch (error) {
                      console.error('Error deleting Welcome Offer:', error);
                      return false;
               }
        };
  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="w-1/4 h-full flex items-center justify-center m-auto">
        <Loading />
      </div>
    );
  }

  if (!offer) {
    return (
      <div className="text-mainColor text-2xl font-bold w-full flex flex-col gap-10 items-center">
        <div className="w-2/6 lg:w-1/6">
          <Link to="add">
            <ButtonAdd isWidth="true" BgColor="mainColor" Color="white" iconColor="white" />
          </Link>
        </div>
        <div>No welcome offer data available</div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-8 border rounded-lg shadow-md bg-blue-50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Welcome Offer Details</h2>
        <span
          className={`px-4 py-1 rounded-full text-xl font-medium ${
            offer.status === 1 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {offer.status === 1 ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Offer Images */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Offer Images</h3>
        <div className="grid xl:grid-cols-2 sm:grid-cols-1 gap-4">
          <div className="border rounded-lg overflow-hidden">
            <img
              src={offer.ar_image_link}
              alt="Arabic Offer"
              className="w-full h-64 object-fit"
            />
            <p className="text-lg text-center p-2 bg-gray-100">Arabic Image</p>
          </div>
          <div className="border rounded-lg overflow-hidden">
            <img
              src={offer.en_image_link}
              alt="English Offer"
              className="w-full h-64 object-fit"
            />
            <p className="text-lg text-center p-2 bg-gray-100">English Image</p>
          </div>
        </div>
      </div>

      {/* Offer Details */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Plan Details</h3>
        <ul className="text-xl text-gray-800 space-y-2">
          <li>
            <span className="font-medium">Plan Name:</span> {offer.plan?.name}
          </li>
          <li>
            <span className="font-medium">Duration:</span> {offer.duration}
          </li>
          <li>
            <span className="font-medium">Price:</span> {offer.price} EGP
          </li>
        </ul>
      </div>

      {/* Created/Updated Info */}
      {/* <div className="text-sm text-gray-500 mb-6">
        <p>
          <span className="font-medium">Created At:</span> {new Date(offer.created_at).toLocaleString()}
        </p>
        <p>
          <span className="font-medium">Updated At:</span> {new Date(offer.updated_at).toLocaleString()}
        </p>
      </div> */}

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Link
          to={`edit/${offer.id}`}
          className="flex items-center px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <EditIcon colored="white" className="w-5 h-5 mr-2" />
          Edit
        </Link>
        <button
          onClick={() => handleOpenDialog(offer.id)}
          className="flex items-center px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          <DeleteIcon colored="white" className="w-5 h-5 mr-2" />
          Delete
        </button>
      </div>

      {openDialog === offer.id && (
        <Dialog open={true} onClose={handleCloseDialog} className="relative z-10">
                <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-lg">
                                <div className="flex flex-col items-center justify-center bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <Wroning Width='28' Height='28' aria-hidden="true" />
                                        <div className="flex items-center">
                                                <div className="mt-2 text-center">
                                                        <DialogTitle as="h3" className="text-xl font-semibold leading-10 text-gray-900">
                                                                You will delete welcome offer {offer.plan_id}
                                                        </DialogTitle>
                                                </div>
                                        </div>
                                </div>
                                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                                type="button"
                                                onClick={() => handleDelete(offer.id)}
                                                disabled={isDeleting}
                                                className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                                        >
                                                {isDeleting ? <div className="flex w-10 h-5"><Loading /></div> : 'Delete'}
                                        </button>
                                        <button
                                                type="button"
                                                data-autofocus
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
  );
};

export default WelcomeOfferPage;

