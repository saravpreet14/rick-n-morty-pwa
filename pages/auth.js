import { useState } from "react";
import styles from "../styles/authPage.module.css";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import {
  InputAdornment,
  IconButton,
  Container,
  OutlinedInput,
  InputLabel,
  FormControl,
  FormHelperText,
  Button,
} from "@material-ui/core";
import clsx from "clsx";

const classes = {};

export default function Auth(props) {
  const [formData, setFormData] = useState({
    isSignUp: true,
    email: "",
    password: "",
    emailError: false,
    passwordError: false,
    emailErrorMessage: "",
    passwordErrorMessage: "",
    showPassword: true,
  });

  const handleChange = (prop) => (event) => {
    setFormData((prevData) => ({ ...prevData, [prop]: event.target.value }));
  };

  const handlePropInversion = (prop) => {
    setFormData((prevData) => ({ ...prevData, [prop]: !prevData[prop] }));
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function formSubmit() {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailError = !emailRegex.test(formData.email.toLowerCase());
    const passwordError = formData.password.length < 8;
    setFormData((prevData) => ({
      ...prevData,
      emailError: emailError,
      passwordError: passwordError,
      emailErrorMessage: emailError ? "Enter a vaild Email" : "",
      passwordErrorMessage: passwordError
        ? "Enter password of length atleast 8"
        : "",
    }));
    if (!emailError && !passwordError) {
      // form is valid
    }
  }

  return (
    <Container maxWidth="xs">
      <h1>Sign {formData.isSignUp ? "Up" : "In"}</h1>
      <form className={styles.root} noValidate autoComplete="off">
        <FormControl
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
          fullWidth
        >
          <InputLabel
            htmlFor="outlined-adornment-password"
            error={formData.emailError}
          >
            Email
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-email"
            value={formData.email}
            onChange={handleChange("email")}
            labelWidth={70}
            error={formData.emailError}
          />
          <FormHelperText
            id="outlined-email-helper-text"
            error={formData.emailError}
          >
            {formData.emailErrorMessage}
          </FormHelperText>
        </FormControl>
        <br />
        <br />
        <FormControl className={styles.marginTop} variant="outlined" fullWidth>
          <InputLabel
            htmlFor="outlined-adornment-password"
            error={formData.passwordError}
          >
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            // type="password"
            type={formData.showPassword ? "text" : "password"}
            onChange={handleChange("password")}
            labelWidth={70}
            error={formData.passwordError}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => handlePropInversion("showPassword")}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {formData.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText
            id="outlined-password-helper-text"
            error={formData.passwordError}
          >
            {formData.passwordErrorMessage}
          </FormHelperText>
        </FormControl>
        <br />
        <br />
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => formSubmit()}
        >
          Sign {formData.isSignUp ? "Up" : "In"}
        </Button>
        <p
          className={styles.authToggle}
          onClick={() => handlePropInversion("isSignUp")}
        >
          {formData.isSignUp
            ? "Already a user? Sign In"
            : "Don't have an account? Sign Up"}
        </p>
      </form>
    </Container>
  );
}
