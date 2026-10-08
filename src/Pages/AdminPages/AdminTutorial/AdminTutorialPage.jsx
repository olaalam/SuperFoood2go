import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../Context/Auth';
import Loading from '../../../Components/Loading';
import axios from 'axios';
import { ButtonAdd } from '../../../Components/Button';
import { Link } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { PiVideoFill } from 'react-icons/pi';
import {Wroning,DeleteIcon,EditIcon} from '../../../Components/Icons/AllIcons';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

const AdminTutorialPage = () => {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [tutorialGroups, setTutorialGroups] = useState([]);
  const [tutorialGroupChanged, setTutorialGroupChanged] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  // const [openDialog, setOpenDialog] = useState(null);
  const [tutorial, setTutorial] = useState([]);
  const [tutorialChanged, setTutorialChanged] = useState([]);

  const [openGroupDialog, setOpenGroupDialog] = useState(null); // for group dialogs
  const [openTutorialDialog, setOpenTutorialDialog] = useState(null); // for tutorial dialogs


  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(' https://clientbcknd.food2go.online/admin/v1/tutorial_group', {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      });
      if (response.status === 200) {
        console.log(response.data)
        setTutorialGroups(response.data.tutorial_group);
        setTutorialChanged(response.data.tutorial_group.tutorials);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

    const handleOpenGroupDialog = (groupId) => {
      setOpenGroupDialog(groupId);
    };
    const handleCloseGroupDialog = (groupId) => {
      setOpenGroupDialog(null);
    };

    const handleOpenTutorialDialog = (tutorialId) => {
      setOpenTutorialDialog(tutorialId);
    };
    const handleCloseTutorialDialog = (tutorialId) => {
      setOpenTutorialDialog(null);
    };    
    
    

  // const handleCloseDialog = () => {
  //         setOpenDialog(null);
  // };

  const handleDeleteGroup = async (groupId) => {
          setIsDeleting(true);
          const success = await deleteGroup(groupId, auth.user.token);
          setIsDeleting(false);
          handleCloseGroupDialog();

        if (success) {
              setTutorialGroupChanged(!tutorialGroupChanged)
              auth.toastSuccess('Tutorial group deleted successfully!');
              setTutorialGroups((prevGroup) =>
                prevGroup.filter((group) => group.id !== groupId)
              );
        } else {
              auth.toastError('Failed to delete tutorial group.');
        }
  };

    const deleteGroup = async (groupId, authToken) => {
           try {
                  const response = await axios.delete(` https://clientbcknd.food2go.online/admin/v1/tutorial_group/delete/${groupId}`, {
                         headers: {
                                Authorization: `Bearer ${authToken}`,
                         },
                  });

                  if (response.status === 200) {
                         console.log('Tutorial group deleted successfully');
                         return true;
                  } else {
                         console.error('Failed to delete Tutorial group:', response.status, response.statusText);
                         return false;
                  }
           } catch (error) {
                  console.error('Error deleting Tutorial group:', error);
                  return false;
           }
    };

    const handleDeleteTutorial = async (tutorialId) => {
      setIsDeleting(true);
      const success = await deleteTutorial(tutorialId, auth.user.token);
      setIsDeleting(false);
      handleCloseTutorialDialog();

    if (success) {
          setTutorialChanged(!tutorialChanged)
          auth.toastSuccess('Tutorial deleted successfully!');
          setTutorial((prevTutorial) =>
            prevTutorial.filter((tutorial) => tutorial.id !== tutorialId)
          );
    } else {
          auth.toastError('Failed to delete tutorial.');
    }
    };

    const deleteTutorial = async (tutorialId, authToken) => {
          try {
                  const response = await axios.delete(` https://clientbcknd.food2go.online/admin/v1/tutorial/delete/${tutorialId}`, {
                        headers: {
                                Authorization: `Bearer ${authToken}`,
                        },
                  });

                  if (response.status === 200) {
                        console.log('Tutorial deleted successfully');
                        return true;
                  } else {
                        console.error('Failed to delete Tutorial:', response.status, response.statusText);
                        return false;
                  }
          } catch (error) {
                  console.error('Error deleting Tutorial:', error);
                  return false;
          }
    };

  const handleGroupToggle = (group) => {
    setSelectedGroup((prevGroup) => (prevGroup?.name === group.name ? null : group));
  };

  useEffect(() => {
    fetchData();
  }, [tutorialGroupChanged,tutorialChanged]);

  if (isLoading) {
    return (
      <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
        <Loading />
      </div>
    );
  }

  if (!tutorialGroups.length) {
    return (
      <div className="w-full flex flex-col gap-10">
      <div className="w-2/3 lg:w-1/6">
        <Link to="add">
          <ButtonAdd Text="Add Group" isWidth="true" BgColor="mainColor" Color="white" iconColor="white" />
        </Link>
      </div>
      <div className="text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center">No Tutorial Groups data available</div>
      </div>
      )
  }

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="w-2/3 lg:w-1/6">
        <Link to="add">
          <ButtonAdd Text="Add Group" isWidth="true" BgColor="mainColor" Color="white" iconColor="white" />
        </Link>
      </div>

      <div>
        <h1 className="text-center font-semibold mb-5 text-2xl text-mainColor">Tutorial Groups</h1>
        {tutorialGroups.map((group) => (
          <div key={group.id} className="relative mb-6">
            {/* Group Box */}
            <div
                className="bg-white border rounded-lg shadow-lg cursor-pointer"
                style={{ minHeight: '60px' }}
                onClick={() => handleGroupToggle(group)} // Toggle group selection
            >
            {/* <div className="bg-white border rounded-lg shadow-lg cursor-pointer"> */}
              <div className="flex justify-between items-center p-4">
                <span className="text-2xl font-semibold text-mainColor">{group.name}</span>
                <div className="flex gap-3">
                  {/* Add Tutorial Icon */}
                  <Link to={`add_tutorial/${group.id}`}>
                    <PiVideoFill className="text-green-500" size={25} title="Add Tutorial" />
                  </Link>
                  {/* Edit Icon */}
                  <Link to={`edit/${group.id}`}>
                    <EditIcon className="text-blue-500" size={25} title="Edit Group" />
                  </Link>
                  {/* Delete Icon */}
                  <button
                    type="button" onClick={() => handleOpenGroupDialog(group.id)}
                    className="text-red-500"
                    title="Delete Group"
                  >
                    <DeleteIcon size={25} />
                  </button>
                  {openGroupDialog  === group.id && (
                    <Dialog open={true} onClose={handleCloseGroupDialog} className="relative z-10">
                        <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-lg">
                            <div className="flex flex-col items-center justify-center bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                              <Wroning Width='28' Height='28' aria-hidden="true" />
                              <div className="flex items-center">
                                      <div className="mt-2 text-center">
                                              <DialogTitle as="h3" className="text-xl font-semibold leading-10 text-gray-900">
                                                      You will delete group {group.name|| "null"}
                                              </DialogTitle>
                                      </div>
                              </div>
                            </div>
                            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                            type="button"
                                            onClick={() => handleDeleteGroup(group.id)}
                                            disabled={isDeleting}
                                            className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                                    >
                                            {isDeleting ? <div className="flex w-10 h-5"><Loading /></div> : 'Delete'}
                                    </button>
                                    <button
                                            type="button"
                                            data-autofocus
                                            onClick={handleCloseGroupDialog}
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-6 py-3 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
                                    >
                                            Cancel
                                    </button>
                            </div>
                            </DialogPanel>
                          </div>
                        </div>
                    </Dialog>
                  )}
                  {/* Toggle Arrow */}
                  {selectedGroup?.name === group.name ? (
                    <IoIosArrowUp className="text-xl text-mainColor" />
                  ) : (
                    <IoIosArrowDown className="text-xl text-mainColor" />
                  )}
                </div>
              </div>
            </div>

            {/* Tutorials List */}
            {selectedGroup?.name === group.name && (
              <div className="flex flex-col gap-5 bg-gray-100 border rounded-lg w-full p-4">
                {group.tutorials.length === 0 ? (
                  <p className="text-center text-mainColor text-xl font-semibold">There are no tutorials</p>
                ) : (
                  group.tutorials.map((tutorial) => (
                    <div key={tutorial.id} className="flex justify-between items-center gap-3 p-2 border-b">
                      <div className="flex items-center gap-3 text-mainColor text-xl font-bold">
                        <Link to={`tutorial/${tutorial.id}`} state={{tutorial: tutorial}}>
                        <button
                            // to={tutorial.path}
                            // key={index}
                            className="flex items-center gap-3 text-mainColor text-xl font-bold hover:underline"
                        >
                            <div className="text-mainColor text-xl">
                            <PiVideoFill size={30}/>
                            </div>
                            <div className="text-mainColor text-xl mb-1">
                            {tutorial.name}
                            </div>
                        </button>
                        </Link>
                        {/* <button
                            // to={tutorial.path}
                            key={index}
                            className="flex items-center gap-3 text-mainColor text-xl font-bold hover:underline"
                        >
                            <div className="text-mainColor text-xl">
                            <PiVideoFill size={30}/>
                            </div>
                            <div className="text-mainColor text-xl mb-1">
                            {tutorial.title}
                            </div>
                        </button> */}
                      </div>
                      <div className="flex gap-3">
                        {/* Edit Tutorial */}
                        <Link to={`edit_tutorial/${tutorial.id}`} state={{groupId: group.id}}>
                          <EditIcon className="text-blue-500 cursor-pointer" size={20} title="Edit Tutorial" />
                        </Link>
                        {/* Delete Tutorial */}
                        <button
                          type="button"
                          onClick={() => handleOpenTutorialDialog(tutorial.id)}
                          className="text-red-500"
                          title="Delete Tutorial"
                        >
                          <DeleteIcon size={20} />
                        </button>
                        {openTutorialDialog === tutorial.id && (
                          <Dialog open={true} onClose={handleCloseTutorialDialog} className="relative z-10">
                              <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                  <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-lg">
                                  <div className="flex flex-col items-center justify-center bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <Wroning Width='28' Height='28' aria-hidden="true" />
                                    <div className="flex items-center">
                                            <div className="mt-2 text-center">
                                                    <DialogTitle as="h3" className="text-xl font-semibold leading-10 text-gray-900">
                                                            You will delete tutorial {tutorial.title|| "null"}
                                                    </DialogTitle>
                                            </div>
                                    </div>
                                  </div>
                                  <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                          <button
                                                  type="button"
                                                  onClick={() => handleDeleteTutorial(tutorial.id)}
                                                  disabled={isDeleting}
                                                  className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                                          >
                                                  {isDeleting ? <div className="flex w-10 h-5"><Loading /></div> : 'Delete'}
                                          </button>
                                          <button
                                                  type="button"
                                                  data-autofocus
                                                  onClick={handleCloseTutorialDialog}
                                                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-6 py-3 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
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
                    </div>
                  ))
                )}
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTutorialPage;
