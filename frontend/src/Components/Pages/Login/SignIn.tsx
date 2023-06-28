import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import Account from "../../Models/Account";
import { useState } from "react";
import { adminLoginAction, userLoginAction } from "../../Redux/UserReducer";
import { useDispatch } from "react-redux";

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const [emailNotExist, setEmailNotExist] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const dispatch = useDispatch();

  const [email, setEmail] = useState({
    value: "",
    hasError: false,
  });

  const changeHandler = (e: any) => {
    const inputValue = e.target.value.trim().toLowerCase();
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Account>();

  const login = async (existingAccount: Account) => {
    try {
      //check if email exist in the system
      const emailResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/users/checkIfEmailExist`,
        { email: existingAccount.email }
      );
      if (emailResponse.data) {
        setEmailNotExist(false);
        const userMatched = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/v1/users/login`,
          existingAccount
        );
        if (userMatched.data) {
          setWrongPassword(false);
          const userInfo = userMatched.data;
          const admin: boolean = userInfo.role === "admin";
          if (admin) {
            dispatch(
              adminLoginAction(
                userInfo.firstName,
                userInfo.lastName,
                userInfo.role
              )
            );
          } else {
            dispatch(
              userLoginAction(
                userInfo.firstName,
                userInfo.lastName,
                userInfo.role,
                userInfo.id
              )
            );
          }
        } else {
          setWrongPassword(true);
        }
      } else {
        setEmailNotExist(true);
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(login)} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              {...register("email")}
              value={email.value}
              onChange={changeHandler}
            />
            {email.hasError && (
              <div style={{ color: "red" }}>Please enter a valid email</div>
            )}
            {emailNotExist && (
              <div style={{ color: "red" }}>Please check your Email</div>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password", {
                minLength: 4,
              })}
            />{" "}
            {errors.password && (
              <div style={{ color: "red" }}>
                please enter at least 4 characters
              </div>
            )}
            {wrongPassword && (
              <div style={{ color: "red" }}>Wrong password</div>
            )}
            <br />
            <br />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Link
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/register")}
              variant="body2"
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
