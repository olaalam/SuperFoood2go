import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from '../../../Components/Loading';
import { useAuth } from '../../../Context/Auth'; // Assuming you're using useAuth for auth context
import InputCustom from '../../../Components/InputCustom';
import { Link } from 'react-router-dom';
import { AiTwotoneEdit } from "react-icons/ai";
import { Button } from '../../../Components/Button';
import image from '../../../../public/Images/logo.png'
import { useTranslation } from 'react-i18next';

const UserProfilePage =()=>{
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState('');
  const auth = useAuth();
  const { t, i18n } = useTranslation();

const fetchData = async () => {
    setIsLoading(true);
    try {
        const response = await axios.get('https://clientbcknd.food2go.online/user/v1/profile', {
            headers: {
                Authorization: `Bearer ${auth.user.token}`,
              },
        });
        if (response.status === 200) {
            console.log(response.data)
            setUserData(response.data.user);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        setIsLoading(false);
    }
    };

    useEffect(()=>{
        fetchData()
    },[])

    if (isLoading) {
        return (
          <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
            <Loading />
          </div>
        );
    }  
    
    return(
        <form className="w-full flex flex-col gap-y-10 p-4">
         <div className="w-full flex flex-col lg:flex-row gap-10 items-center">
            <div className='w-80 h-80 flex relative rounded-full border-2'>
                <img
                    src={userData.image_link}
                    alt="ProfileImage"
                    className="w-full object-contain rounded-full"
                    />
             <Link to={'edit'} type="button" state={{userData:userData}}>
             <button className={`bg-white text-mainColor shadow p-2 rounded-full absolute flex items-center bottom-7 ${i18n.language ? 'right-4' : 'left-4'} hover:bg-gray-300`}>
                        <AiTwotoneEdit size={40}/>
                    </button>
                </Link>
            </div>
            <div className="flex flex-col gap-3">
                <h1 className="text-3xl lg:text-5xl text-mainColor">{userData.name}</h1>
                <h1 className="text-3xl lg:text-5xl text-mainColor font-light">{userData.email}</h1>
            </div>
        </div>
     
        <div className="w-full flex flex-wrap items-center justify-start gap-10">
            <div className="w-full flex flex-col lg:flex-row gap-10">
                <div className="lg:w-[35%] sm:w-full">
                    <InputCustom
                        type="text"
                        placeholder={t('name')} // Use the correct translation key for the placeholder
                        borderColor="mainColor"
                        value={userData.name}
                        readonly="true"
                    />
                </div>
                <div className="lg:w-[35%] sm:w-full">
                    <InputCustom
                        type="email"
                        placeholder={t('email')}
                        borderColor="mainColor"
                        value={userData.email}
                        readonly="true"
                    />
                </div>
            </div>
            <div className="w-full flex flex-col lg:flex-row gap-10">
                <div className="lg:w-[35%] sm:w-full">
                <InputCustom
                        type="text"
                        placeholder={t('phone')}
                        borderColor="mainColor"
                        value={userData.phone}
                        readonly="true"
                    />
                </div>
            </div>
             <div className="w-full flex items-center justify-center">
             <Link to={'edit'} type="button" state={{userData:userData}}>
             <div className="flex items-center justify-center w-full lg:w-96 md:w-96 ">
                          <Button
                              Text={t('Edit Profile')}
                              BgColor="bg-mainColor"
                              Color="text-white"
                              Width="full"
                              Size="text-2xl"
                              px="px-14"
                              rounded="rounded-2xl"
                              stateLoding={isLoading}
                          />
                      </div>
                </Link>
            </div>
        </div>
        </form>
    )
}

export default UserProfilePage;