import React from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../store/users";

export class AllUsers extends React.Component {
  componentDidMount() {
    this.props.getUsers();
    // co(this.props.isLoggedIn) {
    //     this.props.getUsers()
    // }
  }

  render() {
    const { users } = this.props || [];
    console.log("users props", this.props);

    return (
      <div className="users">
          
    {this.props.isAdmin ? (
        <ul>
        {users.map(({ id, username, firstName, lastName, email, isAdmin }) => (
            <li key={id}>
                <h3>{firstName} {lastName}</h3>
                <h3>Username: {username}</h3>
                <h3>Email: {email}</h3>
            </li>
    ))} </ul>
        ) : (
            <div></div>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    users: state.users,
    user: state.auth,
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.isAdmin
  };
};

const mapDispatch = (dispatch) => {
  return {
    getUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapState, mapDispatch)(AllUsers);
