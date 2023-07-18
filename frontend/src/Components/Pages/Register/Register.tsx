import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { userLoginAction } from "../../Redux/UserReducer";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Account from "../../Models/Account";
import { useNavigate } from "react-router-dom";

function Register(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //Email Validation

  //Use Form
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Account>();

  const requiredTemplate = {
    required: {
      value: true,
      message: "Required",
    },
  };
  const addNewUser = async (newAccount: Account) => {
    console.log(newAccount);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/users/checkIfEmailExist`,
        { email: newAccount.email }
      );
      if (response.data) {
        setError("email", {
          type: "alreadyExist",
          message: "Email Already exist😢",
        });
      } else {
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
                response.data
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
          Register
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(addNewUser)}
          sx={{ mt: 3, textAlign: "center" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                {...register("firstName", requiredTemplate)}
                helperText={errors.firstName?.message}
                error={!!errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                {...register("lastName", requiredTemplate)}
                helperText={errors.lastName?.message}
                error={!!errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email Address"
                {...register("email", {
                  ...requiredTemplate,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                helperText={errors.email?.message}
                error={!!errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("password", {
                  ...requiredTemplate,
                  minLength: {
                    value: 4,
                    message: "please enter at least 4 characters",
                  },
                })}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                helperText={errors.password?.message}
                error={!!errors.password}
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

          <Link
            style={{ cursor: "pointer" }}
            variant="body2"
            onClick={() => navigate("/login")}
          >
            Already have an account? Log in
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
export default Register;
