import React, { Component } from 'react';
import  { editProduct } from '../store/singleProduct';
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
      price: 0,
      imageUrl: ""
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
    const { name, description, price, imageUrl } = this.state;
    return (
      <div>
        <h2>Edit product here:</h2>
        <form id='edit-product-form' onSubmit={handleSubmit}>
          <label htmlFor='name'>Name:</label>
       
          <input name='name' onChange={handleChange} value={name} />
          
          <label htmlFor='description'>Description:</label>
       
          <input
            name='description'
            onChange={handleChange}
            value={description}
          />
          <label htmlFor='price'>Price:</label>
       
          <input
            name='price'
            onChange={handleChange}
            value={price}
          />

          <label htmlFor='imageUrl'>Image:</label>
          <input
          name='imageUrl'
          onChange={handleChange}
          value={imageUrl}
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

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    editProduct: (product) => dispatch(editProduct(product, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
