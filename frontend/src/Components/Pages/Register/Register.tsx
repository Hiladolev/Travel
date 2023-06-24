import { useForm } from "react-hook-form";
import Account from "../../Models/Account";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { useState } from "react";
import { RootState } from "../../Redux/TravelApp";
import axios from "axios";
import { userLoginAction } from "../../Redux/UserReducer";
import { useDispatch, useSelector } from "react-redux";

function Register(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    <div className="Register Box">
      <h1 className="Headline">Register</h1>
      <form onSubmit={handleSubmit(addNewUser)}>
        <TextField
          label="First Name"
          variant="outlined"
          required
          {...register("firstName")}
        />
        <br /> <br />
        <TextField label="Last Name" required {...register("lastName")} />
        <br /> <br />
        <TextField
          label="Email"
          required
          {...register("email")}
          value={email.value}
          onChange={changeHandler}
        />
        {email.hasError && (
          <div style={{ color: "red" }}>Please enter a valid email</div>
        )}
        {emailAlreadyExist && (
          <div style={{ color: "red" }}>Already exist😢</div>
        )}
        <br /> <br />
        <TextField
          label="Password"
          required
          {...register("password", {
            minLength: 4,
          })}
        />
        {errors.password && (
          <div style={{ color: "red" }}>please enter at least 4 characters</div>
        )}
        <br /> <br />
        <Button color="primary" variant="contained" type="submit" size="large">
          Register
        </Button>
        <br /> <br />
        <div>
          Already a member?
          <Button
            color="primary"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Register;
