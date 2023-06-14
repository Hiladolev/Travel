import { Button, TextField } from "@mui/material";
import { AccountBox, Password } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useEffect, useState } from "react";
import Account from "../../Models/Account";
import { useForm } from "react-hook-form";
import axios from "axios";
import { travel } from "../../Redux/TravelApp";
// import { downloadUsersAction } from "../../Redux/UserReducer";

function Login(): JSX.Element {
  const navigate = useNavigate();
  const [emailNotExist, setEmailNotExist] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);

  // useEffect(() => {
  //   if (travel.getState().users.allUsers.length < 1) {
  //     console.log("getting data from backend....");
  //     axios
  //       .post("http://localhost:4000/api/v1/users/allUsers")
  //       .then((response) => {
  //         travel.dispatch(downloadUsersAction(response.data));
  //       });
  //   }
  // }, []);

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
    travel.getState().users.allUsers.find((item) => {
      if (item.email === existingAccount.email) {
        setEmailNotExist(false);
        if (item.password === existingAccount.password) {
          setWrongPassword(false);
          localStorage.setItem("account", JSON.stringify(existingAccount));
          axios
            .post("http://localhost:4000/api/v1/users/login", existingAccount)
            .then((response) => navigate("/"));
        } else {
          setWrongPassword(true);
        }
        return true;
      } else {
        setEmailNotExist(true);
        return false;
      }
    });
  };

  return (
    <div className="Login Box">
      <h1 className="Headline">Login</h1>
      <form onSubmit={handleSubmit(login)}>
        <AccountBox style={{ fontSize: 40, margin: 10 }} />
        <TextField
          label="Email"
          variant="outlined"
          required
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
        <br />
        <br />
        <Password style={{ fontSize: 40, margin: 10 }} />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          required
          {...register("password", {
            minLength: 4,
          })}
        />
        {errors.password && (
          <div style={{ color: "red" }}>please enter at least 4 characters</div>
        )}
        {wrongPassword && <div style={{ color: "red" }}>Wrong password</div>}
        <br />
        <br />
        <Button size="large" color="primary" type="submit" variant="contained">
          Login
        </Button>
      </form>
      <br /> <br />
      <div>Don't have an account?</div>
      <Button color="primary">Register Now</Button>
      <br /> <br />
    </div>
  );
}

export default Login;
