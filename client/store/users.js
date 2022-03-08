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
    try {
      const { data } = await axios.get("/api/users");
      dispatch(setUsers(data));
      console.log('userssss', data)
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
