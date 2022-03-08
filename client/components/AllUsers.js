import React from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../store/users";

export class AllUsers extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const { users } = this.props;
    console.log("users props", this.props);

    return (
      <div className="users">
        {users.map(({ username }) => (
          //   <div key={id} className='grid-item'>
          <h2>{username}</h2>
          // {/* <h2>{firstName}</h2>
          // <h2>{lastName}</h2>
          // <h2>{email}</h2>
          // <h2>{isAdmin}</h2> */}
        ))}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    users: state.users,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapState, mapDispatch)(AllUsers);
