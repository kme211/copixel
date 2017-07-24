import React, { Component } from "react";
import Inner from "../../components/Inner";
import Input from "../../components/Input";
import SubmitButton from "../../components/SubmitButton";
import Toggle from "../../components/Toggle";
import { toastr } from "react-redux-toastr";
import { createPainting } from '@api';

class CreatePaintingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: null,
      height: null,
      isPublic: true
    };

    this.submitForm = this.submitForm.bind(this);
    this.updateForm = this.updateForm.bind(this);
  }

  submitForm(e) {
    e.preventDefault();

    createPainting(this.state)
      .then(res => {
        const toastrOptions = { timeOut: 4000 };
        toastr.success("New painting started!", "Have fun! :-)", toastrOptions);
        this.props.history.push(res.data.sectionURI);
      })
      .catch(err => {
        toastr.error("Oops, something went wrong!");
        this.props.history.replace("/create");
      });
  }

  updateForm(e) {
    const value = e.target.value === "true" ? true : (e.target.value === "false" ? false : e.target.value);
    console.log(e.target.value, value);
    this.setState({
      [e.target.name]: value
    });
  }

  render() {
    const { isPublic, width, height } = this.state;
    return (
      <Inner>
        <h2>Create new painting</h2>
        <form>
          <Input
            onChange={this.updateForm}
            label="Width"
            type="number"
            name="width"
            placeholder="Number of blocks across..."
            min={1}
            max={5}
            value={width || ""}
          />
          <Input
            onChange={this.updateForm}
            label="Height"
            type="number"
            name="height"
            placeholder="Number of blocks down..."
            min={1}
            max={5}
            value={height || ""}
          />
          <Toggle
            onChange={this.updateForm}
            value1="true"
            value2="false"
            label1="Public"
            label2="Private"
            icon1="eye"
            icon2="eye-blocked"
            name="isPublic"
            checkedItem={isPublic ? "true" : "false"}
          />

          <SubmitButton onClick={this.submitForm} value="Create" />
        </form>
      </Inner>
    );
  }
}

export default CreatePaintingPage;
