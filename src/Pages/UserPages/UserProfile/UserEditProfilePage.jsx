import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Loading from "../../../Components/Loading";
import { useAuth } from "../../../Context/Auth";
import InputCustom from "../../../Components/InputCustom";
import { Link, useLocation ,useNavigate} from "react-router-dom";
import { AiTwotoneEdit } from "react-icons/ai";
import { Button } from "../../../Components/Button";
import { CiCamera } from "react-icons/ci";
import { useTranslation } from 'react-i18next';

const UserEditProfilePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const location = useLocation();
  const uploadRef = useRef();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const user = location.state || {};
  const userData = user?.userData || {};

  const [name, setName] = useState(userData.name || "");
  const [phone, setPhone] = useState(userData.phone || "");
  const [email, setEmail] = useState(userData.email || "");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(userData.image_link || "");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log("User data:", userData);
  }, [userData]);

  const handleInputClick = () => {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnail(URL.createObjectURL(file)); // Set a preview URL
    }
  };

  const handleGoBack = () => {
    navigate(-1, { replace: true });
};

  const handleSubmitEdit = async (event) => {
    event.preventDefault();

    if (!name || !phone || !email) {
      auth.toastError("Please complete all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    if (thumbnailFile) {
      formData.append("image", thumbnailFile);
    }
    if(password){
    formData.append("password", password);
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://clientbcknd.food2go.online/user/v1/profile/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
          },
        }
      );

      if (response.status === 200) {
        auth.toastSuccess("Profile updated successfully!");
        handleGoBack()
      } else {
        auth.toastError("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      auth.toastError("An error occurred while updating the profile.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmitEdit} className="w-full flex flex-col gap-y-10 p-4">
      <div className="w-full flex flex-col lg:flex-row gap-10 items-center">
        <div className="w-80 h-80 flex relative rounded-full border-2">
          <img
            src={thumbnail}
            alt="Profile"
            className="w-full object-contain rounded-full"
            onClick={handleInputClick}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            ref={uploadRef}
          />
          <label
            className={`bg-white text-mainColor shadow p-2 rounded-full absolute flex items-center  ${i18n.language ? 'right-4' : 'left-4'} bottom-7 hover:bg-gray-300 cursor-pointer`}
          >
            <CiCamera size={40} />
          </label>
        </div>
      </div>

      <div className="w-full flex flex-wrap items-center justify-start gap-10">
        <div className="w-full flex flex-col lg:flex-row gap-10">
          <div className="lg:w-[35%] sm:w-full">
            <InputCustom
              type="text"
              placeholder={t('name')}
              borderColor="mainColor"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="lg:w-[35%] sm:w-full">
            <InputCustom
              type="email"
              placeholder={t('email')}
              borderColor="mainColor"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-10">
          <div className="lg:w-[35%] sm:w-full">
            <InputCustom
              type="text"
              placeholder={t('phone')}
              borderColor="mainColor"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="lg:w-[35%] sm:w-full">
            <InputCustom
              type="password"
              placeholder={t('password')}
              borderColor="mainColor"
              required={false}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <div className="flex items-center justify-center w-full lg:w-96 md:w-96">
            <Button
              type="submit"
              Text={t('Update Profile')}
              BgColor="bg-mainColor"
              Color="text-white"
              Width="full"
              Size="text-2xl"
              px="px-14"
              rounded="rounded-2xl"
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default UserEditProfilePage;
