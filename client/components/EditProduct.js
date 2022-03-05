import React, { Component } from 'react';

export class EditProduct extends Component {
  constructor(props) {
      console.log("constructor props", props)
    super(props);
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = { ...this.props.product };
  }

  componentDidMount() {}

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    //this.props.editProduct({ ...this.state });
  }

  render() {
    console.log("Edit Product props", this.props)
    const { handleSubmit, handleChange } = this;
    return (
      <div>
        <h2>Edit product here:</h2>
        <form id='edit-product-form' onSubmit={handleSubmit}>
          <label htmlFor='name'>Name:</label>
          &nbsp;
          <input name='name' onChange={handleChange} value={this.state.name} />
          &nbsp;&nbsp;
          <label htmlFor='description'>Description:</label>
          &nbsp;
          <input
            name='description'
            onChange={handleChange}
            value={this.state.description}
          />
          <label htmlFor='price'>Price:</label>
          &nbsp;
          <input
            name='price'
            onChange={handleChange}
            value={this.state.price}
          />
          &nbsp;&nbsp; <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}
