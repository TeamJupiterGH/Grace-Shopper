import axios from "axios";

const TOKEN = "token";

//ACTION TYPE
const SET_USERS = "SET_USERS";

//ACTION CREATOR
export const setUsers = (users) => {
  return {
    type: SET_USERS,
    users,
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    try {
      const { data } = await axios.get("/api/users", {
        headers: {
            authorization: token,
      }
    });
      dispatch(setUsers(data));
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = [];

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
        console.log('users reducer-->', action.users)
      return action.users;
    default:
      return state;
  }
}
