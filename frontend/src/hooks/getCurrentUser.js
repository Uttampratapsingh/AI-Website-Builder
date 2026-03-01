import { useEffect } from "react";
import axios from "axios";
import { setLoading, setUserData } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const useCurrentUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    const currentUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/me`,
          { withCredentials: true }
        );

        dispatch(setUserData(response.data.user));
      } catch (error) {
        console.error("Error fetching current user:", error);
        dispatch(setLoading(false));
      }finally {
        dispatch(setLoading(false));
      }
    };
    currentUser();
  }, [dispatch]);
};

export default useCurrentUser;