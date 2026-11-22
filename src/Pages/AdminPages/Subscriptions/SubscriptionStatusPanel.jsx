import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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

const SubscriptionStatusPanel = () => {
  const auth = useAuth();
  const [restaurants, setRestaurants] = useState([]);
  const [isLoadingRestaurants, setIsLoadingRestaurants] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
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
                        {id == null ? (
                          restaurant.name ??
                          restaurant.restaurant_name ??
                          restaurant.store_name ??
                          restaurant.user?.name ??
                          `Restaurant ${index + 1}`
                        ) : (
                          <Link
                            to={`orders/${id}`}
                            state={{
                              restaurantName:
                                restaurant.name ??
                                restaurant.restaurant_name ??
                                restaurant.store_name ??
                                restaurant.user?.name,
                            }}
                            className="font-medium text-mainColor underline-offset-2 hover:underline"
                          >
                            {restaurant.name ??
                              restaurant.restaurant_name ??
                              restaurant.store_name ??
                              restaurant.user?.name ??
                              `Restaurant ${id}`}
                          </Link>
                        )}
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

    </section>
  );
};

export default SubscriptionStatusPanel;
