import React, { Component } from 'react';
import  { editProduct } from '../store/products';
import { fetchSingleProduct } from '../store/singleProduct';
import { connect } from 'react-redux';

export class EditProduct extends Component {
  constructor(props) {
    // console.log("constructor props", props)
    super(props);
    //console.log('PROPS!', this.props)
    this.state = {
      name: "",
      description: "",
      price: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.editProduct({ ...this.props.product, ...this.state });
  }

  render() {
    //console.log("Edit Product props", this.props)
    const { handleSubmit, handleChange } = this;
    return (
      <div>
        <h2>Edit product here:</h2>
        <form id='edit-product-form' onSubmit={handleSubmit}>
          <label htmlFor='name'>Name:</label>
          &nbsp;
          <input name='name' onChange={handleChange} value={this.state.name ?? ""} />
          &nbsp;&nbsp;
          <label htmlFor='description'>Description:</label>
          &nbsp;
          <input
            name='description'
            onChange={handleChange}
            value={this.state.description ?? ""}
          />
          <label htmlFor='price'>Price:</label>
          &nbsp;
          <input
            name='price'
            onChange={handleChange}
            value={this.state.price ?? 0}
          />
          &nbsp;&nbsp; <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editProduct: (product) => dispatch(editProduct(product, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
