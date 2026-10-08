import React, { useEffect, useState ,useRef} from 'react';
import InputCustom from '../../../Components/InputCustom';
import { Button } from '../../../Components/Button';
import axios from 'axios';
import Loading from '../../../Components/Loading';
import { useAuth } from '../../../Context/Auth';
import { useNavigate } from 'react-router-dom';
import DropDownMenu from '../../../Components/DropDownMenu';
import { useTranslation } from 'react-i18next';

const AddStorePage = () => {
    const { t } = useTranslation();

    const auth = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [storeName, setStoreName] = useState('');
    const [phone, setPhone] = useState('');
    const [instgramLink, setInstgramLink] = useState('');
    const [facebookLink, setFacebookLink] = useState('');

    const [activityData ,setActivityData] =useState([])
    // const [selectActivity, setSelectActivity] = useState('Select Store Activity');
    const [selectActivity, setSelectActivity] = useState("");

    // set arabic
    
  useEffect(() => {
    setSelectActivity(t("Select Store Activity"));

  }, [t]); // Ensure it updates if the language changes

    const [selectActivityId, setSelectActivityId] = useState([]);
    const [openSelectActivity, setOpenSelectActivity] = useState(false);
   
    const [thumbnails, setThumbnails] = useState(''); // Store file name
    const [thumbnailFile, setThumbnailFile] = useState(null); // Store file object

    const uploadRef = useRef(null);
    const dropdownActivityRef =useRef();

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
                      setActivityData(response.data.activties)
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

    const handleGoBack = () => {
        navigate(-1, { replace: true });
    };

    const handleInputClick = () => {
        if (uploadRef.current) {
            uploadRef.current.click(); // Trigger the file input
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setThumbnailFile(file); // Set file object for upload
            setThumbnails(file.name); // Display file name in the text input
        }
        console.log(file)
    };

    useEffect(()=>{console.log('setThumbnailFile',thumbnailFile)},[thumbnailFile])
    const handleOpenSelectActivity = () => {
        setOpenSelectActivity(!openSelectActivity)
      };
 
     const handleSelectActivity = (e) => {
        const inputElement = e.currentTarget.querySelector('.inputVal');
        const selectedOptionName = e.currentTarget.textContent.trim();
        const selectedOptionValue = inputElement ? inputElement.value : null;
        setSelectActivity(selectedOptionName);
        setSelectActivityId(parseInt(selectedOptionValue));
        setOpenSelectActivity(false);
        console.log('Selected Activity:', selectedOptionName);
        console.log('Activity ID:', selectedOptionValue);
      };

      useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);
    
      const handleClickOutside = (event) => {
        if (dropdownActivityRef.current && !dropdownActivityRef.current.contains(event.target)
        ) {
            setOpenSelectActivity(false); 
        }
      };

    const handleSubmitAdd = async (event) => {
    event.preventDefault();

    if (!storeName) {
        auth.toastError('Please Enter Store Name.');
        return;
    }
    if (!selectActivityId) {
        auth.toastError('Please Select Store Activity.');
        return;
    }
    if (!phone) {
        auth.toastError('Please Enter Phone.');
        return;
    }
    // if (!instgramLink) {
    //     auth.toastError('Please Enter Instgram Link.');
    //     return;
    // }
    // if (!facebookLink) {
    //     auth.toastError('Please Enter Facebook Link.');
    //     return;
    // }
    // if (!thumbnailFile) {
    //     auth.toastError('Please Enter Store Logo.');
    //     return;
    // }

    const formData = new FormData();
    formData.append('store_name', storeName);
    formData.append('activities_id', selectActivityId);
    formData.append('phone', phone);
    formData.append('instgram_link', instgramLink);
    formData.append('facebook_link', facebookLink);
    formData.append('logo', thumbnailFile);

    for (let pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
    }        

    setIsLoading(true);
    try {
        const response = await axios.post(' https://clientbcknd.food2go.online/user/v1/store/add',formData, {
            headers: {
                Authorization: `Bearer ${auth.user.token}`,
                'Content-Type': 'application/json', // Use JSON since we're sending a JSON object now
            },
        });
        console.log(response)

        if (response.status === 200) {
            auth.toastSuccess('Store added successfully!');
            handleGoBack();
        } else {
            auth.toastError('Failed to add Store.');
        }
    } catch (error) {
        console.log(error.response.data.faild)
        if(error.response.data.faild=== "You must buy new plan"){
            auth.toastError('You have exceeded the store limit for this plan. Please consider purchasing a new plan.');
            handleGoBack();
        }
        const errorMessages = error?.response?.data.errors;
        let errorMessageString = 'Error occurred';

        if (errorMessages) {
            errorMessageString = Object.values(errorMessages).flat().join(' ');
        }
        // auth.toastError('Error', errorMessageString);
    } finally {
        setIsLoading(false);
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
              <form onSubmit={handleSubmitAdd} className="w-full flex flex-col items-center justify-center gap-y-10">
                  <div className="w-full flex flex-wrap items-center justify-start gap-10">
                      <div className="lg:w-[30%] sm:w-full">
                          <InputCustom
                              type="text"
                              placeholder={t("Store Name")}
                              borderColor="mainColor"
                              value={storeName}
                              onChange={(e) => setStoreName(e.target.value)}
                          />
                      </div>
                      <div className="lg:w-[30%] sm:w-full">
                            <DropDownMenu
                            ref={dropdownActivityRef}
                            handleOpen={handleOpenSelectActivity}
                            handleOpenOption={handleSelectActivity}
                            stateoption={selectActivity}
                            openMenu={openSelectActivity}
                            options={activityData}
                            />
                     </div>
                      <div className="lg:w-[30%] sm:w-full">
                          <InputCustom
                              type="text"
                              placeholder={t("phone")}
                              borderColor="mainColor"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                          />
                      </div>
                      <div className="lg:w-[30%] sm:w-full">
                          <InputCustom
                              type="text"
                              placeholder={t("Instagram Link (Optional)")}
                              borderColor="mainColor"
                              value={instgramLink}
                              onChange={(e) => setInstgramLink(e.target.value)}
                              required={false}
                          />
                      </div>
                      <div className="lg:w-[30%] sm:w-full">
                          <InputCustom
                              type="text"
                              placeholder={t("Facebook Link (Optional)")}
                              borderColor="mainColor"
                              value={facebookLink}
                              onChange={(e) => setFacebookLink(e.target.value)}
                              required={false}
                          />
                      </div>
                       <div className="lg:w-[30%] sm:w-full">
                        <InputCustom
                            type="text"
                            borderColor="mainColor"
                            placeholder={t("Store Logo")}
                            value={thumbnails}
                            readOnly={true}
                            onClick={handleInputClick}
                            required={false}
                            upload={true}
                        />
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            ref={uploadRef}
                        />
                    </div>

                  </div>
      
                  <div className="w-full flex sm:flex-col lg:flex-row items-center justify-start sm:gap-y-5 lg:gap-x-28 sm:my-8 lg:my-0">
                      <div className="flex items-center justify-center w-72">
                          <Button
                              type="submit"
                              Text={t("done")}
                              BgColor="bg-mainColor"
                              Color="text-white"
                              Width="full"
                              Size="text-2xl"
                              px="px-28"
                              rounded="rounded-2xl"
                            //   stateLoding={isLoading}
                          />
                      </div>
                      <button onClick={handleGoBack} className="text-2xl text-mainColor">{t("cancel")}</button>
                  </div>
              </form>
              </>
       )
}

export default AddStorePage
