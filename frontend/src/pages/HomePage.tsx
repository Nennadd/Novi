import { useAppSelector, useAppDispatch } from "../store";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";

export const HomePage = () => {
  const { userInfo: user } = useAppSelector((state) => state.auth);

  const [logoutApi, { isLoading }] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const logoutUser = async () => {
    try {
      await logoutApi("").unwrap();
      dispatch(logout());
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <>
      {user && (
        <button
          className="btn logout-btn"
          disabled={isLoading}
          style={{ position: "absolute", top: "0.5rem", right: "2rem" }}
          onClick={logoutUser}
        >
          Log out
        </button>
      )}
      {user && (
        <h1>
          Welcome, {user.data.name} {user.data.lastname}
        </h1>
      )}
    </>
  );
};
