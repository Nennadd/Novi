import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useAppSelector, useAppDispatch } from "../store";
import { UserData } from "../types/UserTypes";
import { toast } from "react-toastify";
import { BaseInput } from "../components/BaseInput";
import { BaseButton } from "../components/BaseButton";
import { FormWrapper } from "../components/FormWrapper";

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const loginHandler = async (e: React.FormEvent): Promise<unknown> => {
    e.preventDefault();

    if (!email || !password) return toast.error("All fields are required");

    try {
      const response: UserData = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...response }));
      navigate("/");
    } catch (err: any) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return (
    <>
      <h1>Sign In</h1>
      <FormWrapper>
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
        <BaseButton disabled={isLoading} type="button" onClick={loginHandler}>
          Log In
        </BaseButton>
        <small>
          Don't have an account ? <Link to="/register">register here</Link>
        </small>
      </FormWrapper>
    </>
  );
};
