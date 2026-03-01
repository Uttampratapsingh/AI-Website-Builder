import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config/firebase.js";

export const googleAuth = async () => {
  const response = await signInWithPopup(auth, provider);
  console.log("Google Sign-In Response:", response);

  const { data } = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`,
    {
      name: response.user.displayName,
      email: response.user.email,
      avatar: response.user.photoURL,
    },
    {
      withCredentials: true,
    }
  );
  console.log("Backend Google Auth Response:", data);

  return {
    user_name: response.user.displayName,
    user: data.user,
  };
};