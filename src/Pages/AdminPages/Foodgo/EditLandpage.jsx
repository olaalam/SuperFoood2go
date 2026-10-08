import React, { useState, useEffect } from "react";
import axios from "axios";
import InputCustom from "../../../Components/InputCustom";
import { Button } from "../../../Components/Button";
import { useAuth } from "../../../Context/Auth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Loading from "../../../Components/Loading";
import CheckBox from "../../../Components/CheckBox";
import { IoIosArrowDropleftCircle } from "react-icons/io";

const EditLandpage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const client = location.state;

  const [alt, setAlt] = useState("");
  const [website, setWebsite] = useState("");
  const [facebook, setFacebook] = useState("");
  const [ios, setIos] = useState("");
  const [android, setAndroid] = useState("");
  const [appStatus, setAppStatus] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };

  useEffect(() => {
console.log(client)
    if (!client) return; 

    setAlt(client.alt || "");
    setWebsite(client.website || "");
    setFacebook(client.facaebook || ""); 
    setIos(client.ios || "");
    setAndroid(client.android || "");
    setAppStatus(client.app_status === 1);
    setIsClient(client.is_client === 1);
    setOldImage(client.img || "");
  }, [client, auth.user.token]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    if (!alt) {
      auth.toastError("Please enter image alt text.");
      return;
    }

    const formData = new FormData();
    if (image) {
      formData.append("img", image);
    }
    formData.append("alt", alt);
    formData.append("website", website);
    formData.append("facaebook", facebook);
    formData.append("ios", ios);
    formData.append("android", android);
    formData.append("app_status", appStatus ? 1 : 0);
    formData.append("is_client", isClient ? 1 : 0);

    setIsLoading(true);

    try {
      const res = await axios.post(
        `https://clientbcknd.food2go.online/admin/v1/client_domian/update/${client.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        auth.toastSuccess("Landpage updated successfully!");
        handleGoBack();
      } else {
        auth.toastError("Failed to update Landpage.");
      }
    } catch (err) {
      console.error(err);
      auth.toastError("Error updating Landpage.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-4 px-4 my-4">
        <h2 className="text-2xl font-semibold text-mainColor">Edit Client</h2>
        <Link to="/dashboard_admin/landpage">
          <IoIosArrowDropleftCircle className="text-[30px] text-mainColor" />
        </Link>
      </div>

      <form
        onSubmit={handleSubmitEdit}
        className="flex flex-col items-center justify-center w-full gap-y-10"
      >
        <div className="flex flex-wrap items-center justify-start w-full gap-10">
          {/* Alt */}
          <div className="lg:w-[30%] sm:w-full">
            <InputCustom
              type="text"
              borderColor="mainColor"
              placeholder="Name"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              width="w-full"
            />
          </div>

          {/* Website */}
          <div className="lg:w-[30%] sm:w-full">
            <InputCustom
              type="text"
              borderColor="mainColor"
              placeholder="Website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              width="w-full"
            />
          </div>

          {/* Facebook */}
          <div className="lg:w-[30%] sm:w-full">
            <InputCustom
              type="text"
              borderColor="mainColor"
              placeholder="Facebook"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              width="w-full"
            />
          </div>

          {/* iOS */}
          <div className="lg:w-[30%] sm:w-full">
            <InputCustom
              type="text"
              borderColor="mainColor"
              placeholder="iOS Link"
              value={ios}
              onChange={(e) => setIos(e.target.value)}
              width="w-full"
            />
          </div>

          {/* Android */}
          <div className="lg:w-[30%] sm:w-full">
            <InputCustom
              type="text"
              borderColor="mainColor"
              placeholder="Android Link"
              value={android}
              onChange={(e) => setAndroid(e.target.value)}
              width="w-full"
            />
          </div>

          {/* Old Image Preview */}
          {oldImage && (
            <div className="lg:w-[30%] sm:w-full">
              <p className="mb-2 text-lg text-thirdColor">Current Image:</p>
              <img
                src={oldImage}
                alt="old"
                className="object-cover w-40 h-24 border border-gray-300 rounded-md"
              />
            </div>
          )}

          {/* Upload New Image */}
          <div className="lg:w-[30%] sm:w-full">
            <label className="text-lg font-medium text-thirdColor">New Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 mt-2 border rounded-md border-mainColor"
            />
          </div>

          {/* App Status */}
          <div className="flex items-center gap-x-4 lg:w-[30%] sm:w-full">
            <span className="text-2xl font-medium text-thirdColor">App Status:</span>
            <CheckBox
              checked={appStatus}
              handleClick={(e) => setAppStatus(e.target.checked)}
            />
          </div>

          {/* Is Client */}
          <div className="flex items-center gap-x-4 lg:w-[30%] sm:w-full">
            <span className="text-2xl font-medium text-thirdColor">Is Client:</span>
            <CheckBox
              checked={isClient}
              handleClick={(e) => setIsClient(e.target.checked)}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-start w-full sm:flex-col lg:flex-row sm:gap-y-5 lg:gap-x-28 sm:my-8 lg:my-0">
          <div className="flex items-center justify-center w-72">
            <Button
              type="submit"
              Text={isLoading ? <Loading /> : "Done"}
              BgColor="bg-mainColor"
              Color="text-white"
              Width="full"
              Size="text-2xl"
              px="px-28"
              rounded="rounded-2xl"
            />
          </div>
          <button
            onClick={handleGoBack}
            type="button"
            className="text-2xl text-mainColor"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditLandpage;
