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
import { adminLoginAction, userLoginAction } from "../../Redux/UserReducer";
import { useDispatch } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          setError("password", {
            type: "incorrect",
            message: "Wrong password😢",
          });
        }
      } else {
        setError("email", {
          type: "notExist",
          message: "Email doesn't exist😢",
        });
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
          noValidate
          onSubmit={handleSubmit(login)}
          sx={{ mt: 1, textAlign: "center" }}
        >
          <TextField
            margin="normal"
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
          <TextField
            margin="normal"
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
