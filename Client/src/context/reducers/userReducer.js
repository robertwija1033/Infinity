import UserType from "../types/userType";

const UserReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case UserType.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

export default UserReducer;
