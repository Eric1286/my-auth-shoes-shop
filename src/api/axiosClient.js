import axios from "axios";
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

const getFirebaseToken = async () => {
  const { currentUser } = auth;
  if (currentUser) return currentUser.getIdToken();

  // Not logged in
  const hasRememberedAccount = localStorage.getItem("firebaseRememberAccount");
  if (!hasRememberedAccount) return null;

  // Logged in but current user is not fetched -> wait 10s

  return new Promise((resolve, reject) => {
    const waitTimer = setTimeout(() => {
      reject(null);
    }, 10000);
    const unregisterAuthObserver = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        reject(null);
      }
      const token = await user.getIdToken();
      console.log(token);
      resolve(token);
      clearTimeout(waitTimer);
    });
    unregisterAuthObserver();
  });
};

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { "Content-Type": "application/json" },
});
axiosClient.interceptors.request.use(async (config) => {
  // Handle token here
  /*  const { currentUser } = auth;
  if (currentUser) {
    const token = await currentUser.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  } */

  const token = await getFirebaseToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
  },
  (err) => {
    // Handle errors
    throw err;
  }
);
export default axiosClient;
