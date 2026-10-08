import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export const useChangeState = () => {
const user = JSON.parse(localStorage.getItem('user'));
  const [loadingChange, setLoadingChange] = useState(false);
  const [responseChange, setResponseChange] = useState(null);

  const changeState = async (url, name, data) => { // Accepting a single "data" object
    setLoadingChange(true);
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${user?.token || ''}`,
        },
      };
      const response = await axios.put(url, data || {}, config);

      if (response.status === 200) {
        setResponseChange(response);
        toast.success(name);
        return true; // Return true on success
      }
    } catch (error) {
      toast.error(error.message);
      console.error('Error changing state:', error);
      return false; // Return false on error
    } finally {
      setLoadingChange(false);
    }
  };

  return { changeState, loadingChange, responseChange };
};
