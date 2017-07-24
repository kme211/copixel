import React from "react";
import styled from "styled-components";
import PaintingLink from "./PaintingLink";

const Paintings = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
`;

const PaintingList = (props) => {
  console.log(props.paintings)
  return (
    <Paintings>
      {props.paintings.map(painting =>
        <PaintingLink painting={painting} key={painting._id} />
      )}
    </Paintings>
  );
};

export default PaintingList;
