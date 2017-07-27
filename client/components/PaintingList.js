import React from "react";
import styled from "styled-components";
import PaintingLink from "./PaintingLink";
import { likePainting } from "@api";

const Paintings = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
`;

const PaintingList = props => {
  return (
    <Paintings>
      {props.paintings.map(painting =>
        <PaintingLink
          painting={painting}
          key={painting._id}
          likePainting={likePainting}
        />
      )}
    </Paintings>
  );
};

export default PaintingList;
