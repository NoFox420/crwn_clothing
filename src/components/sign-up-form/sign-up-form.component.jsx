import { useState } from "react";
import { useDispatch } from "react-redux";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import "./sign-up-form.styles.scss";
import { signUpStart } from "../../store/user/user.action";

//initialized object for input values
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  //setting formFields with passing in values from inputs
  const [formFields, setFormFields] = useState(defaultFormFields);

  //destructuring off values for further use
  const { displayName, email, password, confirmPassword } = formFields;

  const dispatch = useDispatch();

  //resetting sign up form after submit
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    //check if passwords match
    if (password !== confirmPassword) {
      //display alert message
      alert("passwords do not match");
      //exit function and don't continue
      return;
    }

    //create user
    try {
      //calling firebase server and passing in values from formFields
      dispatch(signUpStart(email, password, displayName));
      resetFormFields();
    } catch (error) {
      //what to do if email already in database
      if (error.code === "auth/email-already-in-use") {
        alert("cannot create user, email already in use");
      } else {
        //looging the error if failed
        console.log("user creation encountered an error", error);
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
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      {/* using onSubmit handler to determine what button press will do*/}
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName" //will come through in the event to identify what input changed
          value={displayName} //value from formFields is shown in input
        />

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

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        {/* adding type submit to submit the form */}
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
