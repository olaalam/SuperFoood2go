import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../Context/Auth';
import Loading from '../../../Components/Loading';
import axios from 'axios';
import { ButtonAdd } from '../../../Components/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { PiVideoFill } from "react-icons/pi";
import { useTranslation } from 'react-i18next';

const TutorialPage = () => {
    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [tutorialGroups, setTutorialGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null); // This tracks the selected group
    const navigate = useNavigate();
    const { t } = useTranslation();

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('https://clientbcknd.food2go.online/user/v1/tutorial', {
                headers: {
                    Authorization: `Bearer ${auth.user.token}`,
                },
            });
            if (response.status === 200) {
                console.log(response.data)
                setTutorialGroups(response.data.tutorial_groups);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Handle tutorial title click
    const handleTutorialClick = (tutorial) => {
        navigate(`video/${tutorial.id}`, { state: { tutorial } });
    };
    

    // Toggle tutorial group visibility
    const handleGroupToggle = (group) => {
        if (selectedGroup?.name === group.name) {
            setSelectedGroup(null); // If the same group is clicked, hide tutorials
        } else {
            setSelectedGroup(group); // Show tutorials for the selected group
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
        <div>
        <h1 className='text-center font-semibold mb-8 text-3xl text-mainColor'>{t("Tutorial Groups")}</h1>
    
        {isLoading ? (
            <Loading /> // Display loading component if fetching data
        ) : (
            tutorialGroups.map((group, index) => (
                <div key={index} className="relative mb-8">
                    {/* Group Box */}
                    <div
                        className="bg-white border rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-all ease-in-out duration-300"
                        style={{ minHeight: '70px' }}
                        onClick={() => handleGroupToggle(group)} // Toggle group selection
                    >
                        <div className="flex justify-between items-center p-5">
                            <span className="text-2xl font-semibold text-mainColor break-words">
                                {group.name}
                            </span>
                            <span>
                                {selectedGroup?.name === group.name ? (
                                    <IoIosArrowUp className="text-2xl text-mainColor" />
                                ) : (
                                    <IoIosArrowDown className="text-2xl text-mainColor" />
                                )}
                            </span>
                        </div>
                    </div>
    
                    {/* Tutorials List */}
                    {selectedGroup?.name === group.name && (
                        <div className="flex flex-col gap-5 bg-gray-100 border rounded-lg w-full p-5 mt-3">
                            {group.tutorials.length === 0 ? (
                                <p className="text-center text-mainColor text-xl font-semibold">{t("There are no tutorials")}</p>
                            ) : (
                                group.tutorials.map((tutorial, index) => (
                                    <button
                                        key={index}
                                        className="flex items-center gap-4 text-mainColor text-xl font-bold hover:bg-blue-100 p-3 rounded-lg transition duration-200 ease-in-out"
                                        onClick={() => handleTutorialClick(tutorial)}
                                    >
                                        <div className="text-mainColor text-2xl">
                                            <PiVideoFill size={30} />
                                        </div>
                                        <div className="text-mainColor text-xl">
                                            {tutorial.title}
                                        </div>
                                    </button>
                                ))
                            )}
                        </div>
                    )}
                </div>
            ))
        )}
    </div>
    
    );
};

export default TutorialPage;
