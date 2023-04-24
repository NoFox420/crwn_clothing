/*
default Button

inverted Button

google sign-in Button

*/

import "./button.styles.scss";

//render className according to value
const BUTTON_TYPE_CLASSES = {
  google: "google-sign-in",

  inverted: "inverted",
};

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
