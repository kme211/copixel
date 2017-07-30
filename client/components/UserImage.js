import React from "react";
import styled from "styled-components";

const Image = styled.img`
  border-radius: 50%;
  vertical-align: middle;
  width: 28px;
  height: 28px;
  margin: 0;
  @media (min-width: 800px) {
    margin: 0 10px 0 0;
  }
`;

const UserImage = ({ picture, ...props }) => <Image src={picture} alt="user image" {...props} />;

export default UserImage;
