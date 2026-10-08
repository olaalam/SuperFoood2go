import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import InputCustom from "../../../Components/InputCustom";
import { Button } from "../../../Components/Button";
import { useAuth } from "../../../Context/Auth";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Components/Loading";

// import CheckBox from '../../../Components/CheckBox';

const AddPaymentMethodPage = () => {
  const auth = useAuth();
  const [thumbnails, setThumbnails] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("en");
  // set arabic
  // const [thumbnails_ar, setThumbnails_ar] = useState("");
  // const [title_ar, setTitle_ar] = useState("");
  // const [description_ar, setDescription_ar] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const uploadRef = useRef();
  const [thumbnailFile, setThumbnailFile] = useState(null); // Store the file object
  // const [paymentActive, setPaymentActive] = useState(0); // Default status to 0
  const [paymentData, setPaymentData] = useState([]);

  // const handleClick = (e) => {
  //     const isChecked = e.target.checked; // Checked status
  //     setPaymentActive(isChecked ? 1 : 0); // Set paymentActive as 1 (true) or 0 (false)
  // };

  const handleInputClick = () => {
    if (uploadRef.current) {
      uploadRef.current.click(); // Trigger a click on the hidden file input
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file); // Set file object for upload
      setThumbnails(file.name); // Display file name in the text input
      // setThumbnails_ar(file.name);
    }
  };

  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };

  const handleSubmitAdd = async (event) => {
    event.preventDefault();

    if (!thumbnails) {
      auth.toastError("Please upload the Thumbnail Image.");
      return;
    }
    if (!title) {
      auth.toastError("Please Enter the Title.");
      return;
    }
    if (!description) {
      auth.toastError("Please Enter the Description.");
      return;
    }
    // set info arabic
    // if (!thumbnails_ar) {
    //   auth.toastError("يرجى تحميل صورة الصورة المصغرة.");
    //   return;
    // }
    // if (!title_ar) {
    //   auth.toastError("يرجى إدخال العنوان.");
    //   return;
    // }
    // if (!description_ar) {
    //   auth.toastError("يرجى إدخال الوصف.");
    //   return;
    // }

    setIsLoading(true);
    try {
    // Prepare form data
    const formData = new FormData();
    formData.append("name", title);
    formData.append("description", description);
    formData.append("thumbnail", thumbnailFile);

    // Arabic translations
  //   const translations = [
  //     { key: "name", value: title_ar, locale: "ar" },
  //     { key: "description", value: description_ar, locale: "ar" },
  //     { key: "thumbnail", value: thumbnails, locale: "ar" },
  //   ];

  //   translations.forEach((translation, index) => {
  //     Object.entries(translation).forEach(([fieldKey, fieldValue]) => {
  //         formData.append(`translations[${index}][${fieldKey}]`, fieldValue);
  //     });
  // });
  

      const response = await axios.post(
        " https://clientbcknd.food2go.online/admin/v1/payment/method/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        auth.toastSuccess("Payment Method added successfully!");
        handleGoBack();
      } else {
        console.error(
          response.status,
          response.statusText
        );
        auth.toastError("Failed to add Payment Method.");
      }
    } catch (error) {
      console.error(
        error?.response?.data?.errors
      );
      const errorMessages = error?.response?.data?.errors;
      let errorMessageString = "Error occurred";

      if (errorMessages) {
        errorMessageString = Object.values(errorMessages).flat().join(" ");
      }

      auth.toastError(errorMessageString);
    } finally {
      setIsLoading(false);
    }
  };
  // const handleChangeLanguage = () => {
  //   const newLanguage = language === "en" ? "ar" : "en";
  //   setLanguage(newLanguage);
  // };
  

  return (
    <div className="">
      {/* <Button
        type="submit"
        Text={`Change to ${language === "en" ? "Arabic" : "English"}`}
        BgColor="bg-mainColor"
        Color="text-white"
        Width="fit"
        Size="text-2xl"
        px="px-28"
        rounded="rounded-2xl"
        handleClick={() => handleChangeLanguage()}
      /> */}
      <form
        onSubmit={handleSubmitAdd}
        className="w-full flex flex-col items-center justify-center gap-y-10 m-5"
      >
        {/* {language === "en" ?
         ( */}
          <div className="w-full flex flex-wrap items-center justify-start gap-10">
            <div className="lg:w-[30%] sm:w-full">
              <InputCustom
                type="text"
                borderColor="mainColor"
                placeholder="Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                width="w-full"
              />
            </div>
            <div className="lg:w-[30%] sm:w-full">
              <InputCustom
                type="text"
                borderColor="mainColor"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                width="w-full"
              />
            </div>
            <div className="lg:w-[30%] sm:w-full">
              <InputCustom
                type="text"
                borderColor="mainColor"
                placeholder="Thumbnail"
                value={thumbnails}
                readOnly={true}
                onClick={handleInputClick}
                upload="true"
              />
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                ref={uploadRef}
              />
            </div>
          </div>
        {/* )
         : (
          <div className="w-full flex flex-wrap items-center justify-start gap-10">
            <div className="lg:w-[30%] sm:w-full">
              <InputCustom
                type="text"
                borderColor="mainColor"
                placeholder="الاسم"
                value={title_ar}
                onChange={(e) => setTitle_ar(e.target.value)}
                width="w-full"
              />
            </div>
            <div className="lg:w-[30%] sm:w-full">
              <InputCustom
                type="text"
                borderColor="mainColor"
                placeholder="الوصف"
                value={description_ar}
                onChange={(e) => setDescription_ar(e.target.value)}
                width="w-full"
              />
            </div>
            <div className="lg:w-[30%] sm:w-full">
              <InputCustom
                type="text"
                borderColor="mainColor"
                placeholder="الصورة المصغرة"
                value={thumbnails}
                readOnly={true}
                onClick={handleInputClick}
                upload="true"
              />
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                ref={uploadRef}
              />
            </div>
          </div>
        )} */}

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
              //   stateLoding={isLoading}
            />
          </div>
          <button onClick={handleGoBack} className="text-2xl text-mainColor">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPaymentMethodPage;
