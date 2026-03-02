import axios from "axios";

export const deployWebsite = async (id) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/website/deploy/${id}`,
    { withCredentials: true }
  );

  if (!response.data?.url) {
    throw new Error("Failed to deploy website");
  }

  return response.data.url;
};