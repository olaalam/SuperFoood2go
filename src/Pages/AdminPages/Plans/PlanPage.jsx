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
import { useTranslation } from 'react-i18next';
import { convertNumberToArabic } from '../../../Components/convert_number';
import { PiStorefront } from "react-icons/pi";
import { CiMoneyCheck1 } from "react-icons/ci";
import { FaCrown } from "react-icons/fa";

const PlanPage = () => {

    const auth = useAuth();
    const [expanded,setExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [plans, setPlans] = useState('');
    const [planChanged, setPlanChanged] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [openDialog, setOpenDialog] = useState(null);


    const [billingPeriod, setBillingPeriod] = useState({});
    const [selectedPlanId, setSelectedPlanId] = useState(null);
    const {t,i18n} = useTranslation();

    const togleeExpanded= ()=>{
    setExpanded(pre=>!pre);

    }
    const fetchData = async () => {
        setIsLoading(true);
        try {
               const response = await axios.get(i18n.language==='en'?' https://clientbcknd.food2go.online/admin/v1/plan/show':' https://clientbcknd.food2go.online/admin/v1/plan/show?locale=ar', {
                      headers: {
                             Authorization: `Bearer ${auth.user.token}`,
                      },
               });
               if (response.status === 200) {
                      console.log(response.data)
                      setPlans(response.data.plan)
               }
        } catch (error) {
               console.error('Error fetching data:', error);
        } finally {
               setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(); 
    }, [planChanged,i18n.language]);

    const handleBillingPeriodChange = (planId, newPeriod) => {
      setBillingPeriod((prev) => ({ ...prev, [planId]: newPeriod }));
  };


    const handleOpenDialog = (planId) => {
       setOpenDialog(planId);
       };

       const handleCloseDialog = () => {
              setOpenDialog(null);
       };

       const handleDelete = async (planId) => {
              setIsDeleting(true);
              const success = await deletePlan(planId, auth.user.token);
              setIsDeleting(false);
              handleCloseDialog();

              if (success) {
                     setPlanChanged(!planChanged)
                     auth.toastSuccess('Plan deleted successfully!');
                     setPlans((prevPlan) =>
                            prevPlan.filter((plan) => plan.id !== planId)
                     );
              } else {
                    //  auth.toastError('Failed to delete Plan.');
                     auth.toastError('This Plan is subscriped by users.');
              }
       };

       const deletePlan = async (planId, authToken) => {
              console.log(planId)
              try {
                     const response = await axios.delete(` https://clientbcknd.food2go.online/admin/v1/plan/delete/${planId}`, {
                            headers: {
                                   Authorization: `Bearer ${authToken}`,
                            },
                     });

                     if (response.status === 200) {
                            console.log('Plan deleted successfully');
                            return true;
                     } else {
                            console.error('Failed to delete Plan:', response.status, response.statusText);
                            return false;
                     }
              } catch (error) {
                     console.error('Error deleting Plan:', error);
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
      
    if (!plans) {
        return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No plans data available</div>;
    }

       return (
              <>
             <div className='w-full flex flex-col gap-10'>
              <div className='w-full lg:w-1/6'>
                <Link to={'add'}>
                  <ButtonAdd isWidth="true" BgColor="mainColor" Color="white" iconColor="white" />
                </Link>
              </div>

            {/* <div className="w-full flex flex-wrap items-start justify-start gap-10">
              {plans.map((plan, index) => (
                <div key={plan.id} className="lg:w-[30%] sm:w-full border border-mainColor rounded-2xl overflow-hidden shadow-lg">
                  <div className='text-center mb-5 p-4 pb-0 text-mainColor text-4xl font-semibold leading-10'>
                    <h1 className='p-2'>{plan.name}</h1>
                  </div>

                  <div className='p-4 text-mainColor flex flex-col gap-5'>
                    <div className='flex flex-wrap items-center gap-2'>
                      <span className='text-mainColor text-xl xl:text-2xl font-semibold'>Description:</span>
                      <p className='text-[#686868] text-lg xl:text-2xl'>{plan.description}</p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-x-4 w-full">
                      <span className="text-xl xl:text-3xl text-mainColor font-medium">Application:</span>
                      <CheckBox checked={plan.app} />
                    </div>

                    {['setup_fees', 'monthly', 'quarterly', 'semi_annual', 'yearly'].map((fee, index) => (
                      <div key={fee} className='flex flex-wrap items-center gap-5'>
                        <span className='text-mainColor text-xl xl:text-2xl font-semibold'>
                          {fee === 'setup_fees' ? 'SetUp Fees' : `Price per ${fee.replace('_', ' ')}`}
                        </span>
                        <p className='text-[#686868] text-lg xl:text-2xl'>{plan[fee]} EGP</p>
                      </div>
                    ))}
                  </div>

                  <div className='p-4'>
                    <div className='flex gap-x-5 p-4 pb-0'>
                      <Link to={`edit/${plan.id}`} state={plan.id} type="button">
                        <span className='flex text-[#686868] items-center text-2xl underline gap-1'>
                          <EditIcon /> Edit
                        </span>
                      </Link>

                      <button type="button" onClick={() => handleOpenDialog(plan.id)}>
                        <span className='flex text-[#686868] items-center text-2xl underline gap-1'>
                          <DeleteIcon /> Delete
                        </span>
                      </button>

                      {openDialog === plan.id && (
                        <Dialog open={true} onClose={handleCloseDialog} className="relative z-10">
                          <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-lg">
                              <div className="flex flex-col items-center justify-center bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <Wroning Width='28' Height='28' aria-hidden="true" />
                                <div className="mt-2 text-center">
                                  <DialogTitle as="h3" className="text-xl font-semibold leading-10 text-gray-900">
                                    You will delete plan {plan.name || "null"}
                                  </DialogTitle>
                                </div>
                              </div>

                              <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                  type="button"
                                  onClick={() => handleDelete(plan.id)}
                                  disabled={isDeleting}
                                  className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                                >
                                  {isDeleting ? <div className="flex w-10 h-5"><Loading /></div> : 'Delete'}
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
                        </Dialog>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div> */}

          <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.map((plan) => {
                  const selectedPeriod = billingPeriod[plan.id] || 'monthly';
                  const priceOptions = {
                      monthly: plan.monthly,
                      quarterly: plan.quarterly || plan.monthly * 3,
                      semiAnnually: plan["semi_annual"] || plan.monthly * 6,
                      annually: plan.yearly || plan.monthly * 12,
                  };
                  const discountOptions = {
                      monthly: plan.discount_monthly,
                      quarterly: plan.discount_quarterly,
                      semiAnnually: plan.discount_semi_annual,
                      annually: plan.discount_yearly,
                  };
                  const currentPrice = priceOptions[selectedPeriod];
                  const discountedPrice = discountOptions[selectedPeriod];
                  const savings = discountedPrice ? currentPrice - discountedPrice : 0;
      
                  return (
                      <div
                          key={plan.id}
                          className={`relative p-4 xl:p-6 transition-all duration-300 ease-in-out transform rounded-lg shadow-lg hover:shadow-xl border border-gray-200 hover:scale-105 
                              bg-white text-mainColor`}
                      >
                          {/* Header */}
                          <h2 className="text-center font-bold text-2xl mb-4">{plan.name}</h2>
      
                          {/* Plan Details */}
                          <div className="space-y-4 mb-6">
                          <p 
  onClick={() => setExpanded(!expanded)} 
  className="text-sm text-gray-600 cursor-pointer"
>
  {expanded ? plan.description : `${plan.description.slice(0, 30)}...`}
</p>
                              <p className="flex items-center gap-2"><PiStorefront size={26} /><span className="font-semibold">{t("Number of stores:")}</span> {convertNumberToArabic(plan.limet_store ,i18n.language)|| '0'}</p>
                              <p className="flex items-center gap-2"><CiMoneyCheck1 size={30} className='text-mainColor' /><span className="font-semibold text-mainColor">{t("SetUp Fees:")}</span> {convertNumberToArabic(plan.setup_fees,i18n.language) || '0'} {t("EGP")}</p>
                              <div className="flex flex-wrap items-center gap-x-4 w-full">
                                <span className="text-xl text-mainColor font-medium">Application:</span>
                                <CheckBox checked={plan.app} />
                              </div>

                          </div>
      
                          {/* Billing Period */}
                          <div className="flex flex-col xl:flex-row justify-between items-center mb-4">
                              <label htmlFor={`billing-${plan.id}`} className="text-lg font-medium">{t("Billing Period:")}</label>
                              <select
                                  id={`billing-${plan.id}`}
                                  value={selectedPeriod}
                                  onChange={(e) => handleBillingPeriodChange(plan.id, e.target.value)}
                                  className="bg-gray-100 border border-gray-300 text-gray-700 rounded-lg p-2 focus:ring-2 focus:ring-mainColor"
                              >
                                  <option value="monthly">{t("Monthly")}</option>
                                  <option value="quarterly">{t("3 Months")}</option>
                                  <option value="semiAnnually">{t("6 Months")}</option>
                                  <option value="annually">{t("Yearly")}</option>
                              </select>
                          </div>
      
                          {/* Pricing and Savings */}
                          <div className="text-center ">
                              {discountedPrice ? (
                                  <>
                                      <p className="text-lg line-through">{convertNumberToArabic(currentPrice,i18n.language)} {t("EGP")}</p>
                                      <p className="text-3xl font-semibold text-mainColor">{convertNumberToArabic(discountedPrice,i18n.language)} {t("EGP")}</p>
                                      <p className="text-green-500 font-semibold mt-2">{t("Save")} {convertNumberToArabic(savings,i18n.language)} {t("EGP")} {t("per")} {t(selectedPeriod)}</p>
                                  </>
                              ) : (
                                  <>
                                      <p className="text-lg text-gray-500 line-through">{priceOptions['monthly'] * (selectedPeriod === 'monthly' ? 1 : selectedPeriod === 'quarterly' ? 3 : selectedPeriod === 'semiAnnually' ? 6 : 12)} {t("EGP")} / {t("month")}</p>
                                      <p className="text-3xl font-semibold text-mainColor">{currentPrice} {t("EGP")}</p>
                                      {selectedPeriod !== 'monthly' && (
                                          <p className="text-green-500 font-semibold mt-2">
                                              {t("Save")} {priceOptions['monthly'] * (selectedPeriod === 'quarterly' ? 3 : selectedPeriod === 'semiAnnually' ? 6 : 12) - currentPrice} {t("EGP")}
                                          </p>
                                      )}
                                  </>
                              )}
                          </div>      
                          <div className='p-4'>
                          <div className='flex gap-x-5 p-4 pb-0'>
                                                  <Link to={`edit/${plan.id}`} state={plan.id} type="button">
                                                          <span className='flex text-[#686868] items-center text-2xl underline gap-1'><EditIcon /> Edit</span>
                                                  </Link>
                                                  <button type="button" onClick={() => handleOpenDialog(plan.id)}>
                                                         <span className='flex text-[#686868] items-center text-2xl underline gap-1'><DeleteIcon /> Delete</span>
                                                  </button>
                                                  {openDialog === plan.id && (
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
                                                                                                                  You will delete Plan {plan.name|| "null"}
                                                                                                          </DialogTitle>
                                                                                                  </div>
                                                                                          </div>
                                                                                  </div>
                                                                                  <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                          <button
                                                                                                  type="button"
                                                                                                  onClick={() => handleDelete(plan.id)}
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
                      </div>
     
                      </div>
                  );
              })}
          </div>
      </div>
              </>
       )
}

export default PlanPage
