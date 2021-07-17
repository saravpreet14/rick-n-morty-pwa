import { useState } from "react";
import styles from "../styles/authPage.module.css";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import Navbar from '../components/navbar/navbar'
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
import {isAuth, authenticate} from '../lib/auth';
import { useRouter } from 'next/router';

export default function Auth(props) {
  const Router = useRouter();
  const [formData, setFormData] = useState({
    isSignUp: false,
    username: "",
    password: "",
    usernameError: false,
    passwordError: false,
    usernameErrorMessage: "",
    passwordErrorMessage: "",
    showPassword: true,
  });

  if(typeof window !== 'undefined') {
    isAuth().then(isVaild => {
      if(isVaild) {
          Router.push('/');
      }
    });
  }

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
    const usernameRegex = /@/;
    const usernameError = !usernameRegex.test(formData.username.toLowerCase());
    const passwordError = formData.password.length < 8;
    setFormData((prevData) => ({
      ...prevData,
      usernameError: usernameError,
      passwordError: passwordError,
      usernameErrorMessage: usernameError ? "Enter a vaild username" : "",
      passwordErrorMessage: passwordError
        ? "Enter password of length atleast 8"
        : "",
    }));
    if (!usernameError && !passwordError) {
      // form is valid
      authenticate(formData.username, formData.password).then(isValid => {
          if(isValid) {
            Router.push('/');
          }
          else {
            setFormData(prevData => ({
              ...prevData,
              passwordErrorMessage: 'Enter a valid username or password!',
              passwordError: true,
              usernameError: true,
            }))
          }
      });
    }
  }

  return (
    <Navbar>
    <Container maxWidth="xs" className={styles.main} >
      <h1 className={styles.heading} >Login to Rick and Morty</h1>
      <form className={styles.root} noValidate autoComplete="off">
        <FormControl
          variant="outlined"
          fullWidth
        >
          <InputLabel
            htmlFor="outlined-adornment-password"
            error={formData.usernameError}
          >
            Username
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-username"
            value={formData.username}
            onChange={handleChange("username")}
            labelWidth={70}
            error={formData.usernameError}
          />
          <FormHelperText
            id="outlined-username-helper-text"
            error={formData.usernameError}
          >
            {formData.usernameErrorMessage}
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
        <div className={styles.button}>
            <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => formSubmit()}
            >
            Sign {formData.isSignUp ? "Up" : "In"}
            </Button>
        </div>
        {/* <p
          className={styles.authToggle}
          onClick={() => handlePropInversion("isSignUp")}
        >
          {formData.isSignUp
            ? "Already a user? Sign In"
            : "Don't have an account? Sign Up"}
        </p> */}
      </form>
    </Container>
    </Navbar>
  );
}