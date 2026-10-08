import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../Context/Auth';
import Loading from '../../../Components/Loading';
import axios from 'axios';
import { Button } from '../../../Components/Button';
import { useNavigate } from 'react-router-dom';

const DomainRequestPage = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [domains, setDomains] = useState([]);
    const [activeTab, setActiveTab] = useState("pending");
    const [showPopup, setShowPopup] = useState(false);
    const [selectedDomain, setSelectedDomain] = useState(null);
    const [selectedOption, setSelectedOption] = useState("");
    const [rejectReason, setRejectReason] = useState("");
    const [price, setPrice] = useState("");

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(' https://clientbcknd.food2go.online/admin/v1/domains', {
                headers: {
                    Authorization: `Bearer ${auth.user.token}`,
                },
            });
            if (response.status === 200) {
                console.log(response.data)
                setDomains(response.data.domains);
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

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleRejectReasonChange = (e) => {
        setRejectReason(e.target.value);
    };

    const openPopup = (domain) => {
        setSelectedDomain(domain);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setSelectedDomain(null);
        setSelectedOption("");
        setRejectReason("");
    };

    const handleDone = async () => {
        if (selectedOption === "Reject" && !rejectReason.trim()) {
            auth.toastError("Please provide a reason for rejection.");
            return;
        }
    
        try {
            if (selectedOption === "Approve") {
                console.log("Token:", auth.user.token); // Debug token
    
                const response = await axios.put(
                    ` https://clientbcknd.food2go.online/admin/v1/domains/approve/${selectedDomain.id}`,
                    {price}, // No body required
                    {
                        headers: {
                            Authorization: `Bearer ${auth.user.token}`, // Ensure token is correct
                            "Content-Type": "application/json",
                        },
                    }
                );
    
                if (response.status === 200) {
                    auth.toastSuccess("Domain Approved successfully.");
                    fetchData();
                }
            } else if (selectedOption === "Reject") {
                const formData = { rejected_reason: rejectReason };
    
                const response = await axios.put(
                    ` https://clientbcknd.food2go.online/admin/v1/domains/rejected/${selectedDomain.id}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${auth.user.token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
    
                if (response.status === 200) {
                    auth.toastSuccess("Domain Rejected successfully.");
                    fetchData();
                }
            }
        } catch (error) {
            console.error("Error updating domain status:", error?.response?.data || error.message);
            if (error.response?.status === 401) {
                auth.toastError("Unauthorized: Please check your login session or token.");
            }
        } finally {
            closePopup();
        }
    };
    
    if (isLoading) {
        return (
            <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
                <Loading />
            </div>
        );
    }

    if (!domains.length) {
        return (
            <div className="text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center">
                No domain requests data available
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="flex w-full gap-5 mb-5">
                <div className="sm:w-1/4">
                    <Button
                        Text="Pending"
                        Width="full"
                        px="px-1"
                        Size="text-lg"
                        BgColor={activeTab === "pending" ? "bg-mainColor" : "bg-white"}
                        Color={activeTab === "pending" ? "text-white" : "text-mainColor"}
                        handleClick={() => setActiveTab("pending")}
                    />
                </div>
                <div className="sm:w-1/4">
                    <Button
                        Text="Approved"
                        Width="full"
                        px="px-1"
                        Size="text-lg"
                        BgColor={activeTab === "Approved" ? "bg-mainColor" : "bg-white"}
                        Color={activeTab === "Approved" ? "text-white" : "text-mainColor"}
                        handleClick={() => setActiveTab("Approved")}
                    />
                </div>
                <div className="sm:w-1/4">
                    <Button
                        Text="Rejected"
                        Width="full"
                        px="px-1"
                        Size="text-lg"
                        BgColor={activeTab === "Rejected" ? "bg-mainColor" : "bg-white"}
                        Color={activeTab === "Rejected" ? "text-white" : "text-mainColor"}
                        handleClick={() => setActiveTab("Rejected")}
                    />
                </div>
            </div>

            {activeTab === "pending" && domains && (
                      <div className="w-full flex items-center justify-between mt-4 overflow-x-auto">
                      <table className="w-full sm:min-w-0">
                          <thead className="w-full">
                              <tr className="w-full border-b-2">
                                  <th className="min-w-[80px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">#</th>
                                  <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Domain</th>
                                  <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Store</th>
                                  <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Store Activity</th>
                                  <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">User</th>
                                  <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Phone</th>
                                  <th className="min-w-[100px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Action</th>
                              </tr>
                          </thead>
                          <tbody className="w-full">
                              {domains.filter(domain => domain.status === null).map((domain, index) => (
                                  <tr className="w-full border-b-2" key={domain.id}>
                                      <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                          {index + 1}
                                      </td>
                                      <td className="min-w-[100px] sm:min-w-[100px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                          {domain?.name || '_'}
                                      </td>
                                      <td className="min-w-[100px] sm:min-w-[100px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                          {domain.store?.store_name || '_'}
                                      </td>
                                      <td className="min-w-[100px] sm:min-w-[100px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                          {domain.store?.activity?.name || '_'}
                                      </td>
                                      <td className="min-w-[100px] sm:min-w-[100px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                          {domain.user?.name || '_'}
                                      </td>
                                      <td className="min-w-[100px] sm:min-w-[100px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                          {domain.user?.phone || '_'}
                                      </td>
                                      <td className="min-w-[100px] sm:min-w-[100px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                            <button
                                                onClick={() =>{
                                                    // setSelectedDomain(domain)
                                                    openPopup(domain)}}
                                                className="bg-mainColor text-white py-1 px-4 rounded shadow hover:bg-mainColor-dark transition"
                                            >
                                                Pending
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === "Approved" && domains && (
                <div className="w-full flex items-center justify-between mt-4 overflow-x-auto">
                      <table className="w-full sm:min-w-0">
                          <thead className="w-full">
                              <tr className="w-full border-b-2">
                                  <th className="min-w-[80px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">#</th>
                                  <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Domain</th>
                                  <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Store</th>
                                  <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Store Activity</th>
                                  <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">User</th>
                                  <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Phone</th>
                                  <th className="min-w-[100px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Status</th>
                              </tr>
                          </thead>
                          <tbody className="w-full">
                              {domains.filter(domain => domain.status === 1).map((domain, index) => (
                                  <tr className="w-full border-b-2" key={domain.id}>
                                      <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                          {index + 1}
                                      </td>
                                      <td className="min-w-[100px] sm:min-w-[100px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                          {domain?.name || '_'}
                                      </td>
                                      <td className="min-w-[100px] sm:min-w-[100px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                          {domain.store?.store_name || '_'}
                                      </td>
                                      <td className="min-w-[100px] sm:min-w-[100px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                          {domain.store?.activity?.name || '_'}
                                      </td>
                                      <td className="min-w-[100px] sm:min-w-[100px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                          {domain.user?.name || '_'}
                                      </td>
                                      <td className="min-w-[100px] sm:min-w-[100px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                          {domain.user?.phone || '_'}
                                      </td>
                                      <td className="min-w-[100px] sm:min-w-[100px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                        {domain.status === 1 ? (
                                            <span className="text-green-600 font-semibold">Approved</span>
                                        ) : '_'}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === "Rejected" && domains && (
                <div className="w-full flex items-center justify-between mt-4 overflow-x-auto">
                 <table className="w-full sm:min-w-0">
                     <thead className="w-full">
                         <tr className="w-full border-b-2">
                             <th className="min-w-[80px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">#</th>
                             <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Domain</th>
                             <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Store</th>
                             <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Store Activity</th>
                             <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">User</th>
                             <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Phone</th>
                             <th className="min-w-[100px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Status</th>
                         </tr>
                     </thead>
                     <tbody className="w-full">
                         {domains.filter(domain => domain.status === 0).map((domain, index) => (
                             <tr className="w-full border-b-2" key={domain.id}>
                                 <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                     {index + 1}
                                 </td>
                                 <td className="min-w-[100px] sm:min-w-[100px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                     {domain?.name || '_'}
                                 </td>
                                 <td className="min-w-[100px] sm:min-w-[100px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                     {domain.store?.store_name || '_'}
                                 </td>
                                 <td className="min-w-[100px] sm:min-w-[100px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                          {domain.store?.activity?.name || '_'}
                                </td>
                                <td className="min-w-[100px] sm:min-w-[100px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                    {domain.user?.name || '_'}
                                </td>
                                <td className="min-w-[100px] sm:min-w-[100px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                    {domain.user?.phone || '_'}
                                </td>
                                 <td className="min-w-[100px] sm:min-w-[100px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                   {domain.status === 0 ? (
                                       <span className="text-red-600 font-semibold">Rejected</span>
                                   ) : '_'}
                                   </td>
                               </tr>
                           ))}
                   </tbody>
               </table>
                </div>
            )}

            {showPopup && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-2xl text-mainColor font-semibold mb-6">Choose Action</h2>
                        <div className="flex flex-col gap-4">
                            <label className="flex items-center gap-2 text-mainColor text-xl cursor-pointer">
                                <input
                                    type="radio"
                                    value="Approve"
                                    checked={selectedOption === "Approve"}
                                    onChange={handleOptionChange}
                                    className="w-6 h-6 cursor-pointer"
                                />
                                Approve
                            </label>
                            <label className="flex items-center gap-2 text-mainColor text-xl cursor-pointer">
                                <input
                                    type="radio"
                                    value="Reject"
                                    checked={selectedOption === "Reject"}
                                    onChange={handleOptionChange}
                                    className="w-6 h-6 cursor-pointer"
                                />
                                Reject
                            </label>
                            {selectedOption === "Approve" && (
                                <div className="flex flex-col">
                                    <label className="text-mainColor mb-2 font-medium" htmlFor="price">
                                        Enter the price of domain:
                                    </label>
                                    <input
                                        id="price"
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded"
                                        placeholder="Enter Price"
                                    />
                                </div>
                            )}

                            {selectedOption === "Reject" && (
                                <div className="flex flex-col">
                                    <label className="text-mainColor mb-2 font-medium" htmlFor="rejectReason">
                                        Reason for Rejection:
                                    </label>
                                    <input
                                        id="rejectReason"
                                        type="text"
                                        value={rejectReason}
                                        onChange={handleRejectReasonChange}
                                        className="w-full p-2 border border-gray-300 rounded"
                                        placeholder="Enter rejection reason"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="mt-6 flex justify-between">
                            <button
                                onClick={handleDone}
                                className="bg-mainColor text-white py-2 px-4 rounded shadow hover:bg-mainColor-dark transition"
                            >
                                Done
                            </button>
                            <button
                                onClick={closePopup}
                                className="text-red-600 py-2 px-4 hover:underline"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DomainRequestPage;
