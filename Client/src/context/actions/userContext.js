import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import UserReducer from "../reducers/userReducer";
import UserType from "../types/userType";

const UserContext = createContext({
  currentUser: {},
});

const INITIAL_STATE = {
  currentUser: {},
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);
  const { currentUser } = state;
  const setCurrentUser = (user) => {
    dispatch({ type: UserType.SET_CURRENT_USER, payload: user });
  };
  const value = {
    currentUser,
    setCurrentUser,
  };

  useEffect(() => {
    const getUser = async () => {
      const id = localStorage.getItem("id");
      const routes = localStorage.getItem("routes");

      if (id) {
        let user = await axios.get(`http://localhost:8080/${routes}/${id}`);

        delete user.data.password;

        setCurrentUser(user.data);
      }
    };

    getUser();
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
