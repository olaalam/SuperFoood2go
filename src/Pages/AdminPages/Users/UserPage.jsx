import React, { useEffect, useState } from "react";
import { useAuth } from "../../../Context/Auth";
import Loading from "../../../Components/Loading";
import axios from "axios";
import { ButtonAdd } from "../../../Components/Button";
import { Link } from "react-router-dom";
import {
  Wroning,
  DeleteIcon,
  EditIcon,
} from "../../../Components/Icons/AllIcons";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { MdCheck } from "react-icons/md";
import CheckBox from "../../../Components/CheckBox";

const UserPage = () => {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState("");
  const [userChanged, setUserChanged] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openDialog, setOpenDialog] = useState(null);
  const [userActive, setUserActive] = useState("");

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        " https://clientbcknd.food2go.online/admin/v1/users/view",
        {
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        setUsers(response.data.user);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userChanged]);

  const handleLoginUserClick = async (userId) => {
    try {
      // Replace with your actual API URL to fetch user data and token
      const response = await axios.get(
        ` https://clientbcknd.food2go.online/admin/v1/users/user_login/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
          },
        }
      );
      if (response.data && response.data.user) {
        const userData = {
          ...response.data.user,
          roles: [response.data.user.role], // Assuming role is the user's role
        };
        // Save the user object in AuthProvider's context
        auth.login(userData);

        // Optionally save to localStorage
        localStorage.setItem("user", JSON.stringify(userData));

        // Provide success feedback
        auth.toastSuccess("User login successful");
      } else {
        // Handle unexpected API response format
        auth.toastError("Unexpected response format from server");
      }
    } catch (error) {
      console.error("Error during login:", error);

      if (error.response) {
        // API returned an error response
        auth.toastError(error.response.data?.message || "Login failed");
      } else if (error.request) {
        // No response from the server
        auth.toastError("No response from the server");
      } else {
        // Other errors
        auth.toastError(`Error: ${error.message}`);
      }
    }
  };

  const handleOpenDialog = (userId) => {
    setOpenDialog(userId);
  };

  const handleCloseDialog = () => {
    setOpenDialog(null);
  };

  const handleDelete = async (userId) => {
    setIsDeleting(true);
    const success = await deleteUser(userId, auth.user.token);
    setIsDeleting(false);
    handleCloseDialog();

    if (success) {
      setUserChanged(!userChanged);
      auth.toastSuccess("User deleted successfully!");
      setUsers((prevUser) => prevUser.filter((user) => user.id !== userId));
    } else {
      auth.toastError("Failed to delete User.");
    }
  };

  const deleteUser = async (userId, authToken) => {
    try {
      const response = await axios.delete(
        ` https://clientbcknd.food2go.online/admin/v1/users/delete/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("User deleted successfully");
        return true;
      } else {
        console.error(
          "Failed to delete User:",
          response.status,
          response.statusText
        );
        return false;
      }
    } catch (error) {
      console.error("Error deleting User:", error);
      return false;
    }
  };

  const handleStatusChange = async (e, userId) => {
    const isChecked = e.target.checked; // Determine if the checkbox is checked
    const newStatus = isChecked ? 1 : 0; // Set the new status based on the checkbox
    setUserActive(newStatus); // Update the local state if needed

    try {
      const response = await axios.put(
        ` https://clientbcknd.food2go.online/admin/v1/users/status/${userId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
          },
        }
      );

      if (response.status === 200) {
        auth.toastSuccess(
          `User status updated to ${newStatus === 1 ? "Active" : "Inactive"}`
        );
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, status: newStatus } : user
          )
        );
      } else {
        auth.toastError("Failed to update user status");
      }
    } catch (error) {
      console.error("Error updating user status:", error);
      auth.toastError("An error occurred while updating the status");
    }
  };

  if (isLoading) {
    return (
      <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
        <Loading />
      </div>
    );
  }

  if (!users) {
    return (
      <>
        <div className="flex items-center justify-center w-full h-full text-2xl font-bold text-mainColor">
          No users data available
        </div>
        <div className="w-2/6 lg:w-1/6">
          <Link to={"add"}>
            <ButtonAdd
              isWidth="true"
              BgColor="mainColor"
              Color="white"
              iconColor="white"
            />
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col w-full gap-10">
        <div className="w-2/6 lg:w-1/6">
          <Link to={"add"}>
            <ButtonAdd
              isWidth="true"
              BgColor="mainColor"
              Color="white"
              iconColor="white"
            />
          </Link>
        </div>
        <div className="flex items-center justify-between w-full mt-4 overflow-x-auto">
          <table className="w-full sm:min-w-0">
            <thead className="w-full">
              <tr className="w-full border-b-2">
                <th className="min-w-[80px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">
                  #
                </th>
                <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">
                  Name
                </th>
                <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">
                  Email
                </th>
                <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">
                  Phone
                </th>
                <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">
                  Active
                </th>
                <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">
                  Login User
                </th>
                <th className="min-w-[100px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="w-full">
              {users.map((user, index) => (
                <tr className="w-full border-b-2" key={user.id}>
                  <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {index + 1}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {user?.name || "Null"}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {user?.email || "Null"}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {user?.phone || "Null"}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-green-500 text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    <CheckBox
                      className="text-mainColor"
                      checked={user?.status === 1}
                      handleClick={(e) => handleStatusChange(e, user.id)}
                    />
                  </td>
                  <td className="text-center">
                    <button
                      className="text-blue-500 underline"
                      onClick={() => handleLoginUserClick(user.id)}
                    >
                      Login User
                    </button>
                  </td>
                  <td className="min-w-[100px] sm:min-w-[80px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    <div className="flex items-center justify-center gap-x-3">
                      <Link
                        to={`edit/${user.id}`}
                        state={user.id}
                        type="button"
                      >
                        <EditIcon />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleOpenDialog(user.id)}
                      >
                        <DeleteIcon />
                      </button>
                      {openDialog === user.id && (
                        <Dialog
                          open={true}
                          onClose={handleCloseDialog}
                          className="relative z-10"
                        >
                          <DialogBackdrop className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
                          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
                              <DialogPanel className="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:max-w-lg">
                                <div className="flex flex-col items-center justify-center px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                                  <Wroning
                                    Width="28"
                                    Height="28"
                                    aria-hidden="true"
                                  />
                                  <div className="flex items-center">
                                    <div className="mt-2 text-center">
                                      <DialogTitle
                                        as="h3"
                                        className="text-xl font-semibold leading-10 text-gray-900"
                                      >
                                        You will delete user{" "}
                                        {user.name || "null"}
                                      </DialogTitle>
                                    </div>
                                  </div>
                                </div>
                                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                  <button
                                    type="button"
                                    onClick={() => handleDelete(user.id)}
                                    disabled={isDeleting}
                                    className="inline-flex justify-center w-full px-6 py-3 text-sm font-semibold text-white rounded-md shadow-sm bg-mainColor sm:ml-3 sm:w-auto"
                                  >
                                    {isDeleting ? (
                                      <div className="flex w-10 h-5">
                                        <Loading />
                                      </div>
                                    ) : (
                                      "Delete"
                                    )}
                                  </button>
                                  <button
                                    type="button"
                                    data-autofocus
                                    onClick={handleCloseDialog}
                                    className="inline-flex justify-center w-full px-6 py-3 mt-3 text-sm font-medium text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </DialogPanel>
                            </div>
                          </div>
                        </Dialog>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserPage;
