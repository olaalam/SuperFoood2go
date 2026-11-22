import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";
import Loading from "../../../Components/Loading";
import { useAuth } from "../../../Context/Auth";

const API_BASE = "https://clientbcknd.food2go.online/admin/v1/subscription";

const ORDER_STATUSES = [
  ["pending", "Pending"],
  ["confirmed", "Confirmed"],
  ["processing", "Processing"],
  ["out_for_delivery", "Out for delivery"],
  ["delivered", "Delivered"],
  ["returned", "Returned"],
  ["faild_to_deliver", "Failed to deliver"],
  ["refund", "Refund"],
  ["canceled", "Canceled"],
  ["scheduled", "Scheduled"],
  ["cancel_customer", "Canceled by customer"],
  ["canceled_by_admin", "Canceled by admin"],
];

const SubscriptionOrdersCountPage = () => {
  const { restaurantId } = useParams();
  const { state } = useLocation();
  const auth = useAuth();
  const [date, setDate] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [counts, setCounts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrdersCount = useCallback(async (startDate = "", endDate = "") => {
    setIsLoading(true);
    setCounts(null);
    try {
      const params = {};
      if (startDate) params.date = startDate;
      if (endDate) params.date_to = endDate;

      const response = await axios.get(
        `${API_BASE}/orders_count/${restaurantId}`,
        {
          headers: { Authorization: `Bearer ${auth.user?.token}` },
          params,
        }
      );
      setCounts(response.data?.data ?? response.data);
    } catch (error) {
      console.error("Error fetching subscription order count:", error);
      auth.toastError(
        error.response?.data?.message || "Failed to load orders count."
      );
    } finally {
      setIsLoading(false);
    }
  }, [auth.toastError, auth.user?.token, restaurantId]);

  useEffect(() => {
    fetchOrdersCount();
  }, [fetchOrdersCount]);

  const handleFilter = (event) => {
    event.preventDefault();
    fetchOrdersCount(date, dateTo);
  };

  return (
    <section className="w-full rounded-lg bg-white p-4 shadow-sm sm:p-6">
      <Link
        to=".."
        className="mb-5 inline-flex items-center gap-2 font-medium text-mainColor hover:underline"
      >
        <span aria-hidden="true">&larr;</span> Back to restaurants
      </Link>

      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-mainColor">
            {state?.restaurantName || `Restaurant ${restaurantId}`}
          </h1>
          <p className="mt-1 text-gray-600">Orders summary</p>
        </div>
        <p className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
          Restaurant ID: {restaurantId}
        </p>
      </div>

      <form
        onSubmit={handleFilter}
        className="mb-6 grid grid-cols-1 items-end gap-4 rounded-lg bg-gray-50 p-4 sm:grid-cols-3"
      >
        <label className="flex flex-col gap-1 text-sm text-gray-700">
          Date from
          <input
            type="date"
            value={date}
            max={dateTo || undefined}
            onChange={(event) => setDate(event.target.value)}
            className="rounded border border-gray-300 bg-white p-2"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-gray-700">
          Date to
          <input
            type="date"
            value={dateTo}
            min={date || undefined}
            onChange={(event) => setDateTo(event.target.value)}
            className="rounded border border-gray-300 bg-white p-2"
          />
        </label>
        <button
          type="submit"
          disabled={isLoading}
          className="rounded bg-mainColor px-4 py-2 font-medium text-white disabled:opacity-60"
        >
          {isLoading ? "Loading..." : "Apply filter"}
        </button>
      </form>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loading />
        </div>
      ) : counts ? (
        <>
          <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-lg border border-mainColor/20 bg-mainColor/5 p-4">
              <p className="text-sm text-gray-600">Total orders</p>
              <p className="mt-2 text-3xl font-bold text-mainColor">
                {counts.orders ?? 0}
              </p>
            </article>
            {ORDER_STATUSES.map(([key, label]) => (
              <article
                key={key}
                className="rounded-lg border border-gray-200 bg-white p-4"
              >
                <p className="text-sm text-gray-600">{label}</p>
                <p className="mt-2 text-2xl font-semibold text-gray-900">
                  {counts[key] ?? 0}
                </p>
              </article>
            ))}
          </div>

          {(counts.start || counts.end) && (
            <p className="text-sm text-gray-500">
              Showing orders from {counts.start || "—"} to {counts.end || "—"}
            </p>
          )}
        </>
      ) : (
        <p className="py-8 text-center text-gray-600">
          No orders count data available.
        </p>
      )}
    </section>
  );
};

export default SubscriptionOrdersCountPage;
