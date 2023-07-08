import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import axios from "axios";
import { userLoginAction } from "../../Redux/UserReducer";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Account from "../../Models/Account";
import { useNavigate } from "react-router-dom";

function SignUp(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //Email Validation
  const [email, setEmail] = useState({
    value: "",
    hasError: false,
    text: "",
  });
  const changeHandler = (e: any) => {
    const inputValue: any = e.target.value.trim().toLowerCase();
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
  //Use Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Account>();

  const addNewUser = async (newAccount: Account) => {
    console.log(newAccount);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/users/checkIfEmailExist`,
        { email: newAccount.email }
      );
      if (response.data) {
        setEmail({ ...email, text: "Already exist😢" });
      } else {
        setEmail({ ...email, hasError: false, text: "" });
        await axios
          .post(
            `${process.env.REACT_APP_API_URL}/api/v1/users/register`,
            newAccount
          )
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
            </Grid>
            <Grid item xs={12}>
              <TextField
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
                helperText={
                  errors.password && "please enter at least 4 characters"
                }
                error={errors.password && true}
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

          <Link href="/login" variant="body2">
            Already have an account? Sign in
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
export default SignUp;
