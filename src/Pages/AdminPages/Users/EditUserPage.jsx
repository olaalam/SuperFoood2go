import React, { useState, useRef,useEffect ,useContext} from 'react';
import axios from 'axios';
import InputCustom from '../../../Components/InputCustom';
import { Button } from '../../../Components/Button';
import { useAuth } from '../../../Context/Auth';
import { useNavigate } from 'react-router-dom'
import Loading from '../../../Components/Loading';
import CheckBox from '../../../Components/CheckBox';
import { UserAddingLayout } from '../../../Layouts/AdminLayouts/EditUserLayout';

const EditUserPage =()=>{

    const userContent = useContext(UserAddingLayout);
    const translate= new FormData();
    const [language,setLanguage]= useState('en')
    const auth = useAuth();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [activeUser, setActiveUser] = useState('');
    // set arabic
    const [name_ar, setName_ar] = useState('');
    const [phone_ar, setPhone_ar] = useState('');
    const [email_ar, setEmail_ar] = useState('');
    const [password_ar, setPassword_ar] = useState('');
    const [activeUser_ar, setActiveUser_ar] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleChangeLanguage = () => {
        const newLanguage = language === 'en' ? 'ar' : 'en'; 
        setLanguage(newLanguage); 
    };

    useEffect(() => {
        if (userContent) {
            setName(userContent.name|| '')
            setPhone(userContent.phone|| '')
            setEmail(userContent.email|| '')
            setPassword(userContent.password|| '')
            setActiveUser(userContent.status|| '')
            // set arabic
            setName_ar(userContent.name|| '')
            setPhone_ar(userContent.phone|| '')
            setEmail_ar(userContent.email|| '')
            setPassword_ar(userContent.password|| '')
            setActiveUser_ar(userContent.status|| '')
        }
    }, [userContent]);

    const handleClick = (e) => {
        const isChecked = e.target.checked;
        setActiveUser(isChecked ? 1 : 0);
        setActiveUser_ar(isChecked ? 1 : 0);
    };

    const handleGoBack = () => {
        navigate(-1, { replace: true });
    };

    const handleSubmitEdit = async (userId , event) => {
        event.preventDefault();

        if (!name_ar) {
            auth.toastError('يرجى إدخال الاسم.');
            return;
        }
        if (!phone_ar) {
            auth.toastError('يرجى إدخال الهاتف.');
            return;
        }
        if (!email_ar) {
            auth.toastError('يرجى إدخال البريد الإلكتروني.');
            return;
        }
        if (!activeUser_ar) {
            auth.toastError('يرجى إدخال الحالة.');
            return;
        }
        

        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('phone', phone);
            formData.append('email', email); 
            formData.append('password', password);
            formData.append('status', activeUser);

            const response = await axios.post(
                ` https://clientbcknd.food2go.online/admin/v1/users/update/${userId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${auth.user.token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.status === 200) {
                auth.toastSuccess(`${language === 'en' ? 'User updated successfully!' : 'تم تحديث المستخدم بنجاح!'}`);
                handleGoBack();
            } else {
                console.error('Failed to update User:', response.status, response.statusText);
                auth.toastError(`${language === 'en' ? 'Failed to update User.' : 'فشل في تحديث المستخدم.'}`);
            }
            } catch (error) {
                const errors = error.response?.data?.error;
                if (errors) {
                    if (errors.email?.includes('The email has already been taken.')) {
                        auth.toastError('The email has already been taken.');
                    } else if (errors.phone?.includes('The phone has already been taken.')) {
                        auth.toastError(`${language === 'en' ? 'The phone has already been taken.' : 'تم أخذ رقم الهاتف بالفعل.'}`);
                    } else {
                        auth.toastError(`${language === 'en' ? 'Unexpected error occurred.' : 'حدث خطأ غير متوقع.'}`);
                    }
                } else {
                    auth.toastError(`${language === 'en' ? 'Error posting data!' : 'خطأ في إرسال البيانات!'}`);
                }
            } finally {
                setIsLoading(false);
            }
            
    };

    return(
     <div className="">
           <form onSubmit={(event) => handleSubmitEdit(userContent.id, event)} className="w-full flex flex-col items-center justify-center gap-y-10">
        
        <div className="w-full flex flex-wrap items-center justify-start gap-10">
        <div className="lg:w-[30%] sm:w-full">
          <InputCustom
                  type="text"
                  borderColor="mainColor"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  width="w-full"
              />
        </div>
        <div className="lg:w-[30%] sm:w-full">
          <InputCustom
                  type="text"
                  borderColor="mainColor"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  width="w-full"
              />
        </div>
        <div className="lg:w-[30%] sm:w-full">
          <InputCustom
                  type="text"
                  borderColor="mainColor"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  width="w-full"
              />
        </div>
        <div className="lg:w-[30%] sm:w-full">
          <InputCustom
                  type="password"
                  borderColor="mainColor"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  width="w-full"
                  required={false}
              />
        </div>
        <div className="flex items-center gap-x-4 lg:w-[30%] sm:w-full">
              <span className="text-2xl text-thirdColor font-medium">Active:</span>
              <div>
                      <CheckBox checked={activeUser} handleClick={handleClick} />
              </div>
          </div>
    </div>

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

export default EditUserPage;