import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import "./sign-in-form.styles.scss";

//initialized object for input values
const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  //setting formFields with passing in values from inputs
  const [formFields, setFormFields] = useState(defaultFormFields);

  //destructuring off values for further use
  const { email, password } = formFields;

  //resetting sign up form after submit
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  //creating async func to log user credentials
  const signInWithGoogle = async () => {
    //get value
    const { user } = await signInWithGooglePopup();
    //get unique user id from user object
    await createUserDocumentFromAuth(user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    //sign in user
    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password for email");
          //once condition apply don't look for any else
          break;

        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        default:
          console.log(error);
      }
    }
  };

  //what happens when input values change
  //takes input event when values change
  const handleChange = (event) => {
    //structuring the identifier and values off from event object
    const { name, value } = event.target;
    //setting formFields updating only the changed values
    //[name]: will be filled with name value of input
    //value will be the actual value thats in the input
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      {/* using onSubmit handler to determine what button press will do*/}
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <div className="buttons-container">
          {/* adding type submit to submit the form */}
          <Button type="submit">Sign In</Button>
          {/*buttons are always type submit inside forms, prevent submit with type=button */}
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
