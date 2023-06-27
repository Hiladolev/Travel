import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { RootState } from "../../Redux/TravelApp";
import axios from "axios";
import { userLoginAction } from "../../Redux/UserReducer";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Account from "../../Models/Account";
import { useNavigate } from "react-router-dom";

function SignUp(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailValid = "Please enter a valid email";
  const emailExist = "Already exist😢";
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  );
  //Email Validation
  const [emailAlreadyExist, setEmailAlreadyExist] = useState<boolean>(false);
  const [email, setEmail] = useState({
    value: "",
    hasError: false,
  });
  const changeHandler = (e: any) => {
    const inputValue: any = e.target.value.trim().toLowerCase();
    let hasError = false;
    if (
      !/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
        inputValue
      )
    ) {
      hasError = true;
    }
    setEmail((currentValue) => ({
      ...currentValue,
      value: e.target.value,
      hasError,
    }));
  };
  //Use Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Account>();

  // TODO remove, this demo shouldn't need to reset the theme.
  const defaultTheme = createTheme();

  const addNewUser = async (newAccount: Account) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/users/checkIfEmailExist",
        { email: newAccount.email }
      );
      if (response.data) {
        setEmailAlreadyExist(true);
      } else {
        setEmailAlreadyExist(false);
        await axios
          .post("http://localhost:4000/api/v1/users/register", newAccount)
          .then((response) => {
            dispatch(
              userLoginAction(
                newAccount.firstName,
                newAccount.lastName,
                "user",
                response.data.insertId
              )
            );
          });
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(addNewUser)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  {...register("firstName")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  {...register("lastName")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email.value}
                  onChange={changeHandler}
                  //   error={text === ""}
                  {...register("email")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register("password", {
                    minLength: 4,
                  })}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default SignUp;
