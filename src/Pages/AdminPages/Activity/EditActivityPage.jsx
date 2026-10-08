import React, { useState, useRef ,useContext,useEffect} from 'react';
import InputCustom from '../../../Components/InputCustom';
import { Button } from '../../../Components/Button';
import axios from 'axios';
import Loading from '../../../Components/Loading';
import { useAuth } from '../../../Context/Auth';
import { useNavigate } from 'react-router-dom';
import { ActivityDataLayout } from '../../../Layouts/AdminLayouts/EditActivityLayout';

const EditActivityPage =()=>{

    const auth = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [name , setName]=useState('')
    // set arabic
    const [name_ar , setName_ar]=useState('')
    const {activityEdit,activityEdit_ar} = useContext(ActivityDataLayout);
   
    const [language,setLanguage]= useState('en')

        const handleChangeLanguage = () => {
        const newLanguage = language === 'en' ? 'ar' : 'en'; 
        setLanguage(newLanguage); 
    };
    useEffect(() => {
        if (activityEdit) {
            setName(activityEdit.name || '');
        }
    }, [activityEdit]);

    useEffect(() => {
        if (activityEdit_ar) {
           
            setName_ar(activityEdit_ar.name || '');
        }
    }, [activityEdit_ar]);
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
 
    const handleSubmitEdit = async (activityId,event) => {
        event.preventDefault();

        if (!name) {
            auth.toastError('Please enter a name');
            return;
        } 
        if (!name_ar) {
            auth.toastError('Please enter a name Arabic');
            return;
        } 
        const formData = new FormData();
        formData.append('name', name);
          // Create translations array
          const translations = [
            { key: 'name', value: name_ar, locale: 'ar' },
        ];
        translations.forEach((translation, index) => {
            Object.entries(translation).forEach(([fieldKey, fieldValue]) => {
                formData.append(`translations[${index}][${fieldKey}]`, fieldValue);
            });
        });



        for (let pair of formData.entries()) {
               console.log(pair[0] + ', ' + pair[1]);
        }        
 
        setIsLoading(true);
        try {
            const response = await axios.post(`https://clientbcknd.food2go.online/admin/v1/activity/update/${activityId}`,formData, {
                headers: {
                    Authorization: `Bearer ${auth.user.token}`,
                    'Content-Type': 'application/json', // Use JSON since we're sending a JSON object now
                },
            });
 
            if (response.status === 200) {
                auth.toastSuccess('Activity updated successfully!');
                handleGoBack();
            } else {
                auth.toastError('Failed to update Activity.');
            }
        } catch (error) {    
            console.log(error);
            const errorMessages = error?.response?.data?.errors;
            let errorMessageString ='Error occurred';
            
            if (errorMessages) {
                errorMessageString = Object.values(errorMessages).flat().join(' ');
            }
            
            auth.toastError('Error', errorMessageString);
        } finally {
            setIsLoading(false);
        }
    };
 
    return(
        <>
     <div className="">
     <Button 
    type="submit"
    Text={`Change to ${language === 'en' ? 'Arabic' : 'English'}`}
    BgColor="bg-mainColor"
    Color="text-white"
    Width="fit"
    Size="text-2xl"
    px="px-28"
    rounded="rounded-2xl"
     
    handleClick={() => handleChangeLanguage()}
/>
<form onSubmit={(event) => handleSubmitEdit(activityEdit.id, event)} className="w-full flex flex-col items-center justify-center gap-y-10 m-5">
               {language==='en'?   <div className="w-full flex flex-wrap items-center justify-start gap-10">
                      <div className="lg:w-[30%] sm:w-full">
                          <InputCustom
                              type="text"
                              placeholder="Name"
                              borderColor="mainColor"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                          />
                      </div>  
                  </div>:
                    <div className="w-full flex flex-wrap items-center justify-start gap-10">
                    <div className="lg:w-[30%] sm:w-full">
                        <InputCustom
                            type="text"
                            placeholder="الاسم"
                            borderColor="mainColor"
                            value={name_ar}
                            onChange={(e) => setName_ar(e.target.value)}
                        />
                    </div>  
                </div>}
                
      
                  <div className="w-full flex sm:flex-col lg:flex-row items-center justify-start sm:gap-y-5 lg:gap-x-28 sm:my-8 lg:my-0">
                      <div className="flex items-center justify-center w-72">
                          <Button
                              type="submit"
                              Text="Done"
                              BgColor="bg-mainColor"
                              Color="text-white"
                              Width="full"
                              Size="text-2xl"
                              px="px-28"
                              rounded="rounded-2xl"
                              stateLoding={isLoading}
                          />
                      </div>
                      <button onClick={handleGoBack} className="text-2xl text-mainColor">Cancel</button>
                  </div>
        </form>
     </div>
        </>
    )
}

export default EditActivityPage;