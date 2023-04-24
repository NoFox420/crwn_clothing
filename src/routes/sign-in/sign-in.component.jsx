import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

//importing the sign in method
import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

function SignIn() {
  //run on mount and get response after authenticating user
  useEffect(() => {
    (async () => {
      const response = await getRedirectResult(auth);
      //create doc reference if object returned is not null
      if (response) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
      }
    })();
  }, []);

  //creating async func to log user credentials
  const logGoogleUser = async () => {
    //get value
    const { user } = await signInWithGooglePopup();
    //get unique user id from user object
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>

      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button>
      {/* displaying the component */}
      <SignUpForm />
    </div>
  );
}

export default SignIn;
