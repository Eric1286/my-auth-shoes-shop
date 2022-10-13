import { auth } from "../lib/firebase";

const userApi = {
  getMe: () => {
    // call API to get current user
    return new Promise((resovle, reject) => {
      // wait 500ms, assume that we're fetching data
      setTimeout(() => {
        const { currentUser } = auth;
        resovle({
          id: currentUser.uid,
          name: currentUser.displayName,
          email: currentUser.email,
          photoUrl: currentUser.photoURL,
        });
      }, 500);
    });
  },
};

export default userApi;
