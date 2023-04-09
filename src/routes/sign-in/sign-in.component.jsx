//importing the sign in method
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

function SignIn() {
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
    </div>
  );
}

export default SignIn;
