import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import Account from "../../Models/Account";
import { useState } from "react";
import { adminLoginAction, userLoginAction } from "../../Redux/UserReducer";
import { useDispatch } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState({
    value: "",
    hasError: false,
    text: "",
  });

  const [email, setEmail] = useState({
    value: "",
    hasError: false,
    text: "",
  });

  const changeHandler = (e: any) => {
    const inputValue = e.target.value.trim().toLowerCase();
    let hasError = false;
    let text = "";
    if (
      !/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
        inputValue
      )
    ) {
      hasError = true;
      text = "Please enter a valid email";
    }
    setEmail((currentValue) => ({
      ...currentValue,
      value: e.target.value,
      hasError,
      text,
    }));
  };
  const passwordChangeHandler = (e: any) => {
    const inputValue = e.target.value;
    let hasError = false;
    let text = "";
    if (inputValue.length < 4) {
      hasError = true;
      text = "please enter at least 4 characters";
    }
    setPassword((currentValue) => ({
      ...currentValue,
      value: e.target.value,
      hasError,
      text,
    }));
  };
  const { register, handleSubmit } = useForm<Account>();

  const login = async (existingAccount: Account) => {
    try {
      //check if email exist in the system
      const emailResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/users/checkIfEmailExist`,
        { email: existingAccount.email }
      );
      if (emailResponse.data) {
        const userMatched = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/v1/users/login`,
          existingAccount
        );
        if (userMatched.data) {
          setEmail({ ...email, hasError: false, text: "" });
          setPassword({ ...password, hasError: false, text: "" });
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
            navigate("/");
          } else {
            dispatch(
              userLoginAction(
                userInfo.firstName,
                userInfo.lastName,
                userInfo.role,
                userInfo.id
              )
            );
            navigate("/");
          }
        } else {
          setPassword({
            ...password,
            hasError: true,
            text: "Wrong password😢",
          });
        }
      } else {
        setEmail({ ...email, hasError: true, text: "Email doesn't exist😢" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
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
          Log in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(login)}
          sx={{ mt: 1, textAlign: "center" }}
        >
          <TextField
            margin="normal"
            label="Email Address"
            required
            {...register("email")}
            fullWidth
            id="email"
            name="email"
            autoComplete="email"
            value={email.value}
            onChange={changeHandler}
            helperText={email.hasError && email.text}
            error={email.hasError}
          />
          <TextField
            margin="normal"
            required
            {...register("password", {
              minLength: 4,
            })}
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password.value}
            onChange={passwordChangeHandler}
            helperText={password.hasError && password.text}
            error={password.hasError}
          />
          <br />
          <br />
          <Button type="submit" fullWidth variant="contained" sx={{ mb: 2 }}>
            Sign In
          </Button>
          <Link
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/register")}
            variant="body2"
          >
            {"Don't have an account? Register"}
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
