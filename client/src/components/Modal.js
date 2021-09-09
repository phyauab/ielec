import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  border: 1px solid black;
  padding: 1rem;
  display: block;
`;

const Modal = ({ message }) => {
  return (
    <Wrapper>
      <div class="modal-content">
        <span class="close">&times;</span>
        <p>{message}</p>
      </div>
    </Wrapper>
  );
};

export default Modal;
