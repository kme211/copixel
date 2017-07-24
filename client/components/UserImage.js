import React from "react";
import styled, { css } from "styled-components";

const styles = ({ margin }) => css`
  border-radius: 50%;
  vertical-align: middle;
  width: 28px;
  height: 28px;
  margin: ${margin ? margin : 0};
`

const Image = styled.img`${styles}`;

const UserImage = ({ picture, ...props }) => <Image src={picture} alt="user image" {...props} />;

export default UserImage;
