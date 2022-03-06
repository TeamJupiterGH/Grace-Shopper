import React from "react";
import { connect } from "react-redux";

class Confirmation extends React.Component {
  render() {
    <div>
      <h1> THANK YOU FOR YOUR ORDER!</h1>
    </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    orderStatus: state.checkout,
  };
};

export default connect(mapStateToProps)(Confirmation);
