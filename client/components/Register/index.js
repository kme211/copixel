import React, { Component } from "react";
import styled from "styled-components";
import Inner from "@components/Inner";
import Input from "@components/Input";
import SubmitButton from "@components/SubmitButton";
import { createUser } from "@api";

const isEmail = str => /^\w+@\w+\.\w+$/.test(str);

const Wrapper = styled.div`
  position: fixed;
  top: 0; 
  left: 0;
  display: flex;
  justify-conent: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 5;
`;

const RegisterInner = styled(Inner)`
  background: white;
  padding: 1em;
`;

const Header = styled.h2`
  font-size: 2em;
  margin: 0;
`;

class Register extends Component {
  state = {
    err: null,
    firstName: "",
    lastName: "",
    email: "",
    validationErrors: {},
    saving: false
  };

  async componentDidMount() {
    const { err, profile } = await this.props.auth.getProfile();
    const [connection, id] = profile.sub.split("|");
    this.constantProfileData = {
      connection,
      id,
      picture: profile.picture
    };
    this.setState({
      err,
      firstName: profile.given_name,
      lastName: profile.family_name,
      email: profile.email
    });
  }

  updateForm = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validateForm = () => {
    const { email, firstName, lastName } = this.state;
    const validationErrors = {};
    if (!email || !isEmail(email.trim()))
      validationErrors.email = "You must supply a valid email address.";
    if (!firstName)
      validationErrors.firstName = "You must supply a first name.";
    if (!lastName) validationErrors.lastName = "You must supply a last name.";
    this.setState({ validationErrors });
  };

  submitForm = async e => {
    e.preventDefault();
    this.validateForm();
    if (Object.keys(this.state.validationErrors).length) return;
    const { firstName, lastName, email } = this.state;
    const data = Object.assign({}, this.constantProfileData, {
      firstName,
      lastName,
      email
    });
    this.setState({ saving: true });
    const response = await createUser(data);
    this.props.setUser(response.data);
  };

  render() {
    const {
      validationErrors,
      firstName,
      lastName,
      email
    } = this.state;

    return (
      <Wrapper>
      <RegisterInner sceneBody>
        <Header>Almost there!</Header>
        <p>Just need to confirm few details.</p>
        <form onSubmit={this.submitForm}>
          <Input
            type="text"
            value={firstName}
            label="First name*"
            id="firstName"
            name="firstName"
            onChange={this.updateForm}
            error={validationErrors.firstName}
            placeholder="Please enter a first name"
            required
          />
          <Input
            type="text"
            value={lastName}
            label="Last name*"
            id="lastName"
            name="lastName"
            onChange={this.updateForm}
            error={validationErrors.lastName}
            placeholder="Please enter a last name"
            required
          />
          <Input
            type="text"
            value={email}
            label="Email*"
            id="email"
            name="email"
            onChange={this.updateForm}
            error={validationErrors.email}
            placeholder="Please enter an email"
            required
          />
          <p>*All fields are required.</p>
          <SubmitButton value={this.state.saving ? "Saving..." : "Save my info!"} onClick={this.submitForm} />
        </form>
      </RegisterInner>
      </Wrapper>
    );
  }
}

export default Register;
