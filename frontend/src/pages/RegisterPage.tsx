import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { UserData } from "../types/UserTypes";
import { toast } from "react-toastify";
import { BaseButton } from "../components/BaseButton";
import { FormWrapper } from "../components/FormWrapper";
import { BaseInput } from "../components/BaseInput";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerHandler = async (e: React.FormEvent): Promise<unknown> => {
    e.preventDefault();

    if (!name) return toast.error("Name is required !");
    if (!lastname) return toast.error("Lastname is required !");

    if (!validateEmail(email)) {
      return toast.error("Invalid email");
    }

    if (password.length < 6)
      return toast.error("Password must be at least 6 characters long");

    try {
      const response: UserData = await register({
        name,
        lastname,
        email,
        password,
      }).unwrap();
      dispatch(setCredentials({ ...response }));
      navigate("/");
    } catch (err: any) {
      toast.error(err?.data?.message || err.message);
    }
  };

  const validateEmail = (email: string): boolean => {
    const regex = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;
    return regex.test(email);
  };

  return (
    <>
      <h1>Sign Up</h1>
      <FormWrapper>
        <BaseInput
          type="text"
          title="Name"
          value={name}
          placeholder="Enter name..."
          required={true}
          setData={setName}
        />
        <BaseInput
          type="text"
          title="Lastname"
          value={lastname}
          placeholder="Enter lastname..."
          required={true}
          setData={setLastname}
        />
        <BaseInput
          type="email"
          title="Email"
          value={email}
          placeholder="Enter email..."
          required={true}
          setData={setEmail}
        />
        <BaseInput
          type="password"
          title="Password"
          value={password}
          placeholder="Enter password..."
          required={true}
          setData={setPassword}
        />
        <BaseButton
          disabled={isLoading}
          type="button"
          onClick={registerHandler}
        >
          Submit
        </BaseButton>
        <small>
          Already have an account ? <Link to="/login">login here</Link>
        </small>
      </FormWrapper>
    </>
  );
};
