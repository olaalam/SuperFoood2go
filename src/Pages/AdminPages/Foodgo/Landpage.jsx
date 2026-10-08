import React, { useEffect, useState } from "react";
import { useAuth } from "../../../Context/Auth";
import Loading from "../../../Components/Loading";
import axios from "axios";
import { ButtonAdd } from "../../../Components/Button";
import { Link } from "react-router-dom";
import { DeleteIcon, EditIcon } from "../../../Components/Icons/AllIcons";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";

const ITEMS_PER_PAGE = 6; // عدل عدد العناصر بالصفحة هنا
const TRUNCATE_LENGTH = 20; // طول الحروف قبل القطع

const Landpage = () => {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [dataChanged, setDataChanged] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openDialog, setOpenDialog] = useState(null);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://clientbcknd.food2go.online/admin/v1/client_domian",
        {
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
          },
        }
      );
      if (response.status === 200) {
        setClients(response.data.client_domain || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      auth.toastError("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dataChanged]);

  const handleOpenDialog = (id) => setOpenDialog(id);
  const handleCloseDialog = () => setOpenDialog(null);

  const handleDelete = async (id) => {
    setIsDeleting(true);
    try {
      const res = await axios.delete(
        `https://clientbcknd.food2go.online/admin/v1/client_domian/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${auth.user.token}` },
        }
      );
      if (res.status === 200) {
        auth.toastSuccess("Item deleted successfully!");
        setDataChanged((p) => !p);
        // If last item of last page removed, go to previous page
        const totalAfter = clients.length - 1;
        const lastPage = Math.max(1, Math.ceil(totalAfter / ITEMS_PER_PAGE));
        if (page > lastPage) setPage(lastPage);
      } else {
        auth.toastError("Failed to delete item");
      }
    } catch (err) {
      console.error(err);
      auth.toastError("Error deleting item");
    } finally {
      setIsDeleting(false);
      handleCloseDialog();
    }
  };

  // pagination utils
  const totalPages = Math.max(1, Math.ceil(clients.length / ITEMS_PER_PAGE));
  const paginatedClients = clients.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // truncate helper
  const truncate = (text) => {
    if (!text && text !== 0) return "-";
    const str = String(text);
    if (str.length <= TRUNCATE_LENGTH) return str;
    return str.slice(0, TRUNCATE_LENGTH) + "...";
  };

  if (isLoading) {
    return (
      <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
        <Loading />
      </div>
    );
  }

  if (!clients.length) {
    return (
      <div className="flex flex-col items-center justify-center w-full gap-4">
        <p className="text-xl font-semibold text-mainColor">No data found</p>
        <Link to="/dashboard_admin/addlandpage" className="w-40">
          <ButtonAdd isWidth="true" BgColor="mainColor" Color="white" iconColor="white" />
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-mainColor">Client</h2>
        <Link to="/dashboard_admin/addlandpage">
          <ButtonAdd isWidth="true" BgColor="mainColor" Color="white" iconColor="white" />
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full min-w-[900px] table-auto">
          <thead className="text-white bg-mainColor">
            <tr>
              <th className="px-4 py-3 text-sm font-medium text-center">#</th>
              <th className="px-4 py-3 text-sm font-medium text-center">Image</th>
              <th className="px-4 py-3 text-sm font-medium text-center">Name</th>
              <th className="px-4 py-3 text-sm font-medium text-center">Website</th>
              <th className="px-4 py-3 text-sm font-medium text-center">Facebook</th>
              <th className="px-4 py-3 text-sm font-medium text-center">App Status</th>
              <th className="px-4 py-3 text-sm font-medium text-center">Client</th>
              <th className="px-4 py-3 text-sm font-medium text-center">IOS</th>
              <th className="px-4 py-3 text-sm font-medium text-center">Android</th>
              <th className="px-4 py-3 text-sm font-medium text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedClients.map((client, idx) => (
              <tr key={client.id} className="text-center transition border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">
                  {(page - 1) * ITEMS_PER_PAGE + idx + 1}
                </td>

                <td className="px-4 py-3">
                  {client.img ? (
                    <img
                      src={client.img}
                      alt={client.alt || "image"}
                      className="object-cover mx-auto border rounded-md w-14 h-14"
                    />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </td>

                <td className="px-4 py-3 text-sm">{truncate(client.alt)}</td>

                <td className="px-4 py-3 text-sm">
                  <a
                    className="inline-block max-w-[200px] break-words text-blue-600 underline"
                    href={client.website || "#"}
                    target="_blank"
                    rel="noreferrer"
                    title={client.website || "-"}
                  >
                    {truncate(client.website)}
                  </a>
                </td>

                <td className="px-4 py-3 text-sm">
                  <a
                    className="inline-block max-w-[200px] break-words text-blue-600 underline"
                    href={client.facaebook || "#"}
                    target="_blank"
                    rel="noreferrer"
                    title={client.facaebook || "-"}
                  >
                    {truncate(client.facaebook)}
                  </a>
                </td>

                <td
                  className={`py-3 px-4 text-sm font-semibold ${
                    client.app_status ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {client.app_status ? "Active" : "Inactive"}
                </td>

                <td className="px-4 py-3 text-sm">{client.is_client ? "Yes" : "No"}</td>

                <td className="px-4 py-3 text-sm">
                  <a
                    className="inline-block max-w-[200px] break-words text-blue-600 underline"
                    href={client.ios || "#"}
                    target="_blank"
                    rel="noreferrer"
                    title={client.ios || "-"}
                  >
                    {truncate(client.ios)}
                  </a>
                </td>

                <td className="px-4 py-3 text-sm">
                  <a
                    className="inline-block max-w-[200px] break-words text-blue-600 underline"
                    href={client.android || "#"}
                    target="_blank"
                    rel="noreferrer"
                    title={client.android || "-"}
                  >
                    {truncate(client.android)}
                  </a>
                </td>

                <td className="flex items-center justify-center gap-3 px-4 py-6">
                  <Link to={`/dashboard_admin/editlandpage`} state={client}>
                    <EditIcon />
                  </Link>

                  <button
                    onClick={() => handleOpenDialog(client.id)}
                    className="p-1 rounded hover:bg-red-50"
                    aria-label={`Delete ${client.alt || "item"}`}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls (custom, no library) */}
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="text-sm text-gray-600">
          Showing {(page - 1) * ITEMS_PER_PAGE + 1} -{" "}
          {Math.min(page * ITEMS_PER_PAGE, clients.length)} of {clients.length}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            className={`px-3 py-1 rounded-md border ${
              page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
          >
            Prev
          </button>

          {/* render limited page numbers: show first, prev few, current, next few, last */}
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1;
              // show only nearby pages and first/last
              if (
                p === 1 ||
                p === totalPages ||
                (p >= page - 1 && p <= page + 1) // adjust vicinity
              ) {
                return (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    className={`px-3 py-1 rounded-md border ${
                      p === page
                        ? "bg-mainColor text-white border-mainColor"
                        : "hover:bg-gray-100"
                    }`}
                    aria-current={p === page ? "page" : undefined}
                  >
                    {p}
                  </button>
                );
              }

              // show ellipsis when skipping pages
              const nearLeft = p === page - 2;
              const nearRight = p === page + 2;
              if (nearLeft || nearRight) {
                return (
                  <span key={p} className="px-2 text-gray-500">
                    ...
                  </span>
                );
              }
              return null;
            })}
          </div>

          <button
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            className={`px-3 py-1 rounded-md border ${
              page === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Delete Dialog */}
      {openDialog && (
        <Dialog open={true} onClose={handleCloseDialog} className="relative z-10">
          <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
              <DialogTitle className="mb-4 text-lg font-semibold text-center text-gray-800">
                Confirm delete of this item?
              </DialogTitle>
              <div className="flex justify-center gap-4">
                <button
                  className="px-6 py-2 text-white rounded-md bg-mainColor"
                  onClick={() => handleDelete(openDialog)}
                  disabled={isDeleting}
                >
                  {isDeleting ? <Loading /> : "Delete"}
                </button>
                <button
                  className="px-6 py-2 text-black bg-gray-300 rounded-md"
                  onClick={handleCloseDialog}
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default Landpage;
