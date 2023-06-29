import { Navigate } from "react-router-dom";
import { HomePage } from "./HomePage";
import { useAppSelector } from "../store";

export const PrivateHomePage = () => {
  const { userInfo } = useAppSelector((state) => state.auth);

  return userInfo ? <HomePage /> : <Navigate to="/register" replace />;
};
