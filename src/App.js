import "./App.css";
import { Routes, Route } from "react-router-dom";
import "firebase/compat/auth";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";

import Layout from "./components/Layout/Layout";
import { publicRoutes } from "./routes/Routes";
import { useDispatch } from "react-redux";
import { getMe } from "./lib/store";
import { unwrapResult } from "@reduxjs/toolkit";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unregisterAuthObserver = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        // user logs out
        console.log("user is not logged in");
        return;
      }
      try {
        //   console.log("logged in user");
        // const token = await user.getIdToken();
        const result = await dispatch(getMe());
        const currentUser = unwrapResult(result);
        console.log("logged in user: ", currentUser);
      } catch (err) {
        console.log(err);
      }
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);
  return (
    <>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Component = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Component />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </>
  );
}

export default App;
