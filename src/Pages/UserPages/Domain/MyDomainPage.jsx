import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../Context/Auth';
import Loading from '../../../Components/Loading';
import axios from 'axios';
import {ButtonAdd} from '../../../Components/Button'
import { Link } from 'react-router-dom';
import CheckBox from '../../../Components/CheckBox';
import { TfiWorld } from "react-icons/tfi";
import { PiScreencastDuotone } from "react-icons/pi";
import { CiCalendarDate } from "react-icons/ci";
import { MdAttachMoney } from "react-icons/md";
import { useTranslation } from 'react-i18next';

const MyDomainPage = () => {
    const {t} = useTranslation()
    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [myDomains, setMyDomains] = useState('');
    const [domainChanged, setDomainChanged] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [openDialog, setOpenDialog] = useState(null);

    const fetchData = async () => {
        setIsLoading(true);
        try {
               const response = await axios.get('https://clientbcknd.food2go.online/user/v1/domains/my_domains', {
                      headers: {
                             Authorization: `Bearer ${auth.user.token}`,
                      },
               });
               if (response.status === 200) {
                      console.log(response.data)
                      setMyDomains(response.data.my_domains)
               }
        } catch (error) {
               console.error('Error fetching data:', error);
        } finally {
               setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(); 
    }, [domainChanged]);


    if (isLoading) {
        return (
          <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
            <Loading />
          </div>
        );
    }    

       return (
              <>     
                <div className='w-full flex flex-col gap-10'>
                {myDomains?
                    (
                        <>
                        <div className='w-3/6 lg:w-1/6'>
                            <Link to={'../buy_domain'}>
                                    <ButtonAdd Text={t("Buy Domain")} isWidth="true" BgColor ="mainColor" Color="white" iconColor="white"/>
                            </Link>
                        </div>
                        <div className="w-full flex flex-wrap items-center justify-start gap-10">
                            {myDomains.map((domain, index) => (
                                <>
                                    <div key={index} className="w-full lg:w-[30%] rounded-xl border-2 border-mainColor">
                                        <div className='flex items-center gap-3  p-4 text-mainColor border-b-2 border-mainColor'>
                                            <div className='w-16 p-4 rounded-full bg-[#E9EAF3]'>
                                                <TfiWorld size={32}/>
                                            </div>
                                            <h1 className='font-semibold text-2xl mb-2'>{domain.name}</h1>
                                        </div>
                                        <div className='flex flex-col ml-2'>
                                            <div className='flex items-center gap-3 p-2 text-mainColor border-mainColor'>
                                                <PiScreencastDuotone size={32}/>
                                                <h1 className='text-xl font-semibold text-green-600'>{t("Active")}</h1>
                                            </div>
                                            <div className='flex items-center gap-3 p-2 text-mainColor border-mainColor'>
                                                <MdAttachMoney size={32}/>
                                                <h1 className='text-xl font-semibold'>{t("Price :")} <span>{domain.price}</span></h1>
                                            </div>
                                            <div className='flex items-center gap-3 p-2 text-mainColor border-mainColor'>
                                                <CiCalendarDate size={32}/>
                                                <h1 className='text-xl font-semibold'>{t("Renew Date :")} <span>{domain.renewdate}</span></h1>
                                            </div>

                                        </div>
                                    </div>  
                                </>
                            ))}
                        </div>
                        </>
                    )
                    :
                    (
                        <>
                        <div className='w-full flex flex-col gap-5 justify-center items-center'>
                            <h1 className='text-center text-2xl lg:text-3xl text-mainColor font-semibold'>{t("You do not have domains")}</h1>
                            <div className='lg:w-2/6'>
                                <Link to={'../buy_domain'}>
                                        <ButtonAdd Text="Buy Domain" isWidth="true" BgColor ="mainColor" Color="white" iconColor="white"/>
                                </Link>
                            </div>
                        </div>
                        </>
                    )

                }
                </div>
              </>
       )
}

export default MyDomainPage
