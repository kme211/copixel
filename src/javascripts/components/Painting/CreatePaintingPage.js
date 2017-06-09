import React, { Component } from 'react';
import Inner from '../common/Inner';
import Input from '../common/Input';
import SubmitButton from '../common/SubmitButton';
import axios from 'axios';
import {toastr} from 'react-redux-toastr';

class CreatePaintingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: null,
      height: null
    };

    this.submitForm = this.submitForm.bind(this);
    this.updateForm = this.updateForm.bind(this);
  }

  submitForm(e) {
    e.preventDefault();

    axios
      .post('/api/v1/painting/create', this.state)
      .then((res) => {
        const toastrOptions = { timeOut: 4000 };
        toastr.success('New painting started!', 'Have fun! :-)', toastrOptions);
        this.props.history.push(res.data.sectionURI);
      })
      .catch((err) => {
        toastr.error('Oops, something went wrong!');
        this.props.history.replace('/create');
      });
  }

  updateForm(e) {
    console.log()
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { width, height } = this.state;
    return (
      <Inner>
        <h2>Create Painting</h2>
        <form>
          <Input 
            onChange={this.updateForm} 
            label="Width"
            type="number" 
            name="width" 
            placeholder="Number of blocks across..." 
            min={1} 
            max={5} 
            value={width || ''}/>
          <Input 
            onChange={this.updateForm} 
            label="Height"
            type="number" name="height" 
            placeholder="Number of blocks down..." 
            min={1} 
            max={5} 
            value={height || ''}/>
          <SubmitButton onClick={this.submitForm} value="Create"/>
        </form>
      </Inner>
    );
  }
}

export default CreatePaintingPage;