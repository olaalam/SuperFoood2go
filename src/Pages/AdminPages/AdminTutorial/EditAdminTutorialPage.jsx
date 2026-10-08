import React, { useState, useRef,useEffect,useContext } from 'react';
import axios from 'axios';
import InputCustom from '../../../Components/InputCustom';
import { Button } from '../../../Components/Button';
import { useAuth } from '../../../Context/Auth';
import { useNavigate } from 'react-router-dom'
import Loading from '../../../Components/Loading';
import { TutorialGroupLayout } from '../../../Layouts/AdminLayouts/EditAdminTutorialLayout';

const EditAdminTutorialPage =()=>{

    const {tutorialGroupEdit,tutorialGroupEdit_ar} = useContext(TutorialGroupLayout);
    const auth = useAuth();
    const translate = new FormData();
    const [language, setLanguage] = useState("en");
    const [name, setName] = useState('');
    const [name_ar, setName_ar] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    
    const handleGoBack = () => {
        navigate(-1, { replace: true });
    };

    useEffect(() => {
        if (tutorialGroupEdit) {
            setName(tutorialGroupEdit.name|| '')
           
        }
    }, [tutorialGroupEdit]);

    useEffect(() => {
        if (tutorialGroupEdit_ar) {
            setName_ar(tutorialGroupEdit_ar.name|| '')
        }
    }, [tutorialGroupEdit_ar]);

    const handleSubmitEdit = async (groupId ,event) => {
        event.preventDefault();

        if (!name) {
            auth.toastError('Please Enter the Group Name.');
            return;
        }

        if (!name_ar) {
            auth.toastError('Please Enter the Group Name.');
            return;
          }

        const formData = new FormData();
        formData.append('name', name);
          // Convert the translation object to an array of translations
      const translations = [
        { key: "name", value: name_ar, locale: "ar" },
      ];
  
      translations.forEach((translation, index) => {
        Object.entries(translation).forEach(([fieldKey, fieldValue]) => {
            formData.append(`translations[${index}][${fieldKey}]`, fieldValue);
        });
    });


        setIsLoading(true);
        try {
        
         const response = await axios.post(
                `https://clientbcknd.food2go.online/admin/v1/tutorial_group/update/${groupId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${auth.user.token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.status === 200) {
                auth.toastSuccess(
                   'Tutorial Group updated successfully!'
                );
                handleGoBack();
            } else {
                console.error(
                  'Failed to update Tutorial Group:', 
                    response.status, 
                    response.statusText
                );
                auth.toastError(
                 
                       'Failed to update Tutorial Group.'
                );
            }
        } catch (error) {
            console.error(
                'Error updating Tutorial Group:', 
                error?.response?.data?.errors || 'Network error'
            );
        
            const errorMessages = error?.response?.data?.errors;
            let errorMessageString = 'Error occurred';
        
            if (errorMessages) {
                errorMessageString = Object.values(errorMessages).flat().join(' ');
            }
        
            auth.toastError(
              
                     `Error: ${errorMessageString}`
            );
        } finally {
            setIsLoading(false);
        }
    };
    const handleChangeLanguage = () => {
        const newLanguage = language === 'en' ? 'ar' : 'en'; 
        setLanguage(newLanguage); 
    };
    
    return(
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
         <form onSubmit={(event) => handleSubmitEdit(tutorialGroupEdit.id, event)} className="w-full flex flex-col items-center justify-center gap-y-10 m-5">
       {language==='en' ?  <div className="w-full flex flex-wrap items-center justify-start gap-10">
            <div className="lg:w-[30%] sm:w-full">
              <InputCustom
                      type="text"
                      borderColor="mainColor"
                      placeholder="Group Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      width="w-full"
                  />
            </div>
        </div>:
         <div className="w-full flex flex-wrap items-center justify-start gap-10">
         <div className="lg:w-[30%] sm:w-full">
           <InputCustom
                   type="text"
                   borderColor="mainColor"
                   placeholder="اسم الجروب"
                   value={name_ar}
                   onChange={(e) => setName_ar(e.target.value)}
                   width="w-full"
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
                />
            </div>
            <button onClick={handleGoBack} className="text-2xl text-mainColor">Cancel</button>
        </div>
        </form>
       </div>
    )
}

export default EditAdminTutorialPage;