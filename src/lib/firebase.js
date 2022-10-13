import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  /*  projectId: "my-shop-f91c9",
  storageBucket: "my-shop-f91c9.appspot.com",
  messagingSenderId: "365612600200",
  appId: "1:365612600200:web:bb15a5e831425e6d2ec83d",
  measurementId: "G-G5VQ329HSM", */
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  try {
    const data = await signInWithPopup(auth, provider);

    localStorage.setItem(
      "firebaseRememberAccount",
      JSON.stringify(data.user.providerData)
    );
  } catch (err) {
    console.log(err);
  }
};
export const signOutHandler = async () => {
  await signOut(auth);
  localStorage.removeItem("firebaseRememberAccount");
};
