import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../Context/Auth";
import Loading from "../../../Components/Loading";

const API_BASE = "https://clientbcknd.food2go.online/admin/v1/subscription";

const getRestaurants = (payload) => {
  const candidates = [
    payload?.user_subscription,
    payload?.status_list,
    payload?.restaurants,
    payload?.restaurant,
    payload?.status,
    payload?.users,
    payload?.data?.status_list,
    payload?.data?.restaurants,
    payload?.data,
    payload,
  ];

  return candidates.find(Array.isArray) ?? null;
};

const getRestaurantStatus = (restaurant) => {
  const value = restaurant.is_active ?? restaurant.status ?? restaurant.active;
  return value === true || value === 1 || value === "1" || value === "true";
};

const getOrdersCount = (payload) => {
  if (typeof payload === "number" || typeof payload === "string") {
    return payload;
  }

  const count =
    payload?.orders_count ??
    payload?.order_count ??
    payload?.count ??
    payload?.total_orders ??
    payload?.data?.orders_count ??
    payload?.data?.count;

  return count ?? JSON.stringify(payload);
};

const SubscriptionStatusPanel = () => {
  const auth = useAuth();
  const [restaurants, setRestaurants] = useState([]);
  const [isLoadingRestaurants, setIsLoadingRestaurants] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState("");
  const [date, setDate] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [ordersCount, setOrdersCount] = useState(null);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const token = auth.user?.token;
  const toastError = auth.toastError;
  const toastSuccess = auth.toastSuccess;

  const fetchRestaurants = useCallback(async () => {
    setIsLoadingRestaurants(true);
    try {
      const response = await axios.get(`${API_BASE}/status_list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = getRestaurants(response.data);
      if (!result) {
        throw new Error("Unexpected restaurant status list response");
      }
      setRestaurants(result);
    } catch (error) {
      console.error("Error fetching restaurant subscription statuses:", error);
      toastError(
        error.response?.data?.message || "Failed to load restaurant statuses."
      );
    } finally {
      setIsLoadingRestaurants(false);
    }
  }, [token, toastError]);

  const fetchOrdersCount = useCallback(async (filters = {}) => {
    if (!filters.restaurantId) {
      setOrdersCount(null);
      return;
    }

    setIsLoadingOrders(true);
    try {
      const path = `/orders_count/${filters.restaurantId}`;
      const params = {};
      if (filters.date) params.date = filters.date;
      if (filters.dateTo) params.date_to = filters.dateTo;

      const response = await axios.get(`${API_BASE}${path}`, {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      setOrdersCount(getOrdersCount(response.data));
    } catch (error) {
      console.error("Error fetching subscription order count:", error);
      toastError(
        error.response?.data?.message || "Failed to load orders count."
      );
    } finally {
      setIsLoadingOrders(false);
    }
  }, [token, toastError]);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  const handleStatusChange = async (id, checked) => {
    setUpdatingId(id);
    try {
      await axios.put(
        `${API_BASE}/status/${id}`,
        { is_active: checked },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRestaurants((current) =>
        current.map((item) =>
          (item.id ?? item.restaurant_id ?? item.store_id) === id
            ? { ...item, is_active: checked }
            : item
        )
      );
      toastSuccess("Restaurant subscription status updated.");
    } catch (error) {
      console.error("Error updating restaurant subscription status:", error);
      toastError(
        error.response?.data?.message || "Failed to update restaurant status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const handleOrdersFilter = (event) => {
    event.preventDefault();
    fetchOrdersCount({
      restaurantId: selectedRestaurantId,
      date,
      dateTo,
    });
  };

  return (
    <section className="mb-10 flex w-full flex-col gap-8 rounded-lg bg-white p-4 shadow-sm sm:p-6">
      <div>
        <h2 className="mb-4 text-xl font-semibold text-mainColor">
          Restaurant Subscription Status
        </h2>
        {isLoadingRestaurants ? (
          <div className="flex justify-center py-6">
            <Loading />
          </div>
        ) : restaurants.length === 0 ? (
          <p className="py-4 text-center text-gray-600">
            No restaurant statuses available.
          </p>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2">
                  <th className="min-w-[60px] pb-3 text-center font-medium text-mainColor">#</th>
                  <th className="min-w-[180px] pb-3 text-center font-medium text-mainColor">Restaurant</th>
                  <th className="min-w-[130px] pb-3 text-center font-medium text-mainColor">Status</th>
                </tr>
              </thead>
              <tbody>
                {restaurants.map((restaurant, index) => {
                  const id =
                    restaurant.id ?? restaurant.restaurant_id ?? restaurant.store_id;
                  const active = getRestaurantStatus(restaurant);
                  return (
                    <tr className="border-b" key={id ?? index}>
                      <td className="py-3 text-center">{index + 1}</td>
                      <td className="py-3 text-center">
                        {restaurant.name ??
                          restaurant.restaurant_name ??
                          restaurant.store_name ??
                          restaurant.user?.name ??
                          `Restaurant ${id ?? index + 1}`}
                      </td>
                      <td className="py-3 text-center">
                        <label className="inline-flex cursor-pointer items-center justify-center gap-2">
                          <input
                            type="checkbox"
                            checked={active}
                            disabled={id == null || updatingId === id}
                            onChange={(event) =>
                              handleStatusChange(id, event.target.checked)
                            }
                            className="h-4 w-4 accent-mainColor"
                          />
                          <span>{active ? "Active" : "Inactive"}</span>
                        </label>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="border-t pt-6">
        <h2 className="mb-4 text-xl font-semibold text-mainColor">
          Subscription Orders Count
        </h2>
        <form
          onSubmit={handleOrdersFilter}
          className="mb-5 grid grid-cols-1 items-end gap-4 md:grid-cols-4"
        >
          <label className="flex flex-col gap-1 text-sm text-gray-700">
            Restaurant
            <select
              value={selectedRestaurantId}
              required
              onChange={(event) => {
                setSelectedRestaurantId(event.target.value);
                setOrdersCount(null);
              }}
              className="rounded border border-gray-300 p-2"
            >
              <option value="">All restaurants</option>
              {restaurants.map((restaurant, index) => {
                const id =
                  restaurant.id ?? restaurant.restaurant_id ?? restaurant.store_id;
                if (id == null) return null;
                return (
                  <option key={id} value={id}>
                    {restaurant.name ??
                      restaurant.restaurant_name ??
                      restaurant.store_name ??
                      `Restaurant ${index + 1}`}
                  </option>
                );
              })}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm text-gray-700">
            Date from
            <input
              type="date"
              value={date}
              onChange={(event) => {
                setDate(event.target.value);
                setOrdersCount(null);
              }}
              className="rounded border border-gray-300 p-2"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm text-gray-700">
            Date to
            <input
              type="date"
              value={dateTo}
              onChange={(event) => {
                setDateTo(event.target.value);
                setOrdersCount(null);
              }}
              className="rounded border border-gray-300 p-2"
            />
          </label>
          <button
            type="submit"
            disabled={isLoadingOrders || !selectedRestaurantId}
            className="rounded bg-mainColor px-4 py-2 text-white disabled:opacity-60"
          >
            {isLoadingOrders ? "Loading..." : "Apply filter"}
          </button>
        </form>
        <div className="rounded bg-gray-50 p-4">
          <span className="font-medium text-gray-700">Orders count: </span>
          {isLoadingOrders ? (
            <span>Loading...</span>
          ) : ordersCount === null ? (
            <span>Select a restaurant and apply the filter.</span>
          ) : (
            <span>{ordersCount}</span>
          )}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionStatusPanel;
