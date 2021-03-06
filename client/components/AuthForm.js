import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';


/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;
  if (displayName === 'Sign Up') {
    return (
      <div>
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor='firstName'>
              <small>First Name</small>
            </label>
            <input name='firstName' type='text' />
          </div>
          <div>
            <label htmlFor='lastName'>
              <small>Last Name</small>
            </label>
            <input name='lastName' type='text' />
          </div>
          <div>
            <label htmlFor='email'>
              <small>Email</small>
            </label>
            <input name='email' type='text' />
          </div>
          <div>
            <label htmlFor='username'>
              <small>Username</small>
            </label>
            <input name='username' type='text' />
          </div>
          <div>
            <label htmlFor='password'>
              <small>Password</small>
            </label>
            <input name='password' type='password' />
          </div>
          <div>
            <button type='submit'>{displayName}</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor='username'>
              <small>Username</small>
            </label>
            <input name='username' type='text' />
          </div>
          <div>
            <label htmlFor='password'>
              <small>Password</small>
            </label>
            <input name='password' type='password' />
          </div>
          <div>
            <button type='submit'>{displayName}</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
    );
  }
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error,
  };
};

const mapDispatchLogin = (dispatch) => {

  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      dispatch(authenticate(username, password, formName));
    },
  };
};


const mapDispatchSignup = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value; 
      const firstName = evt.target.firstName.value;
      const lastName = evt.target.lastName.value;
      const email = evt.target.email.value
      dispatch(authenticate(username, password, formName, firstName, lastName, email));
    },
  };
};

export const Login = connect(mapLogin, mapDispatchLogin)(AuthForm);
export const Signup = connect(mapSignup, mapDispatchSignup)(AuthForm);
