import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  padding: 10rem 2rem;
  @media (min-width: 768px) {
    padding: 10rem 5rem;
  }
  @media (min-width: 1024px) {
    padding: 10rem 10rem;
  }
  @media (min-width: 1440px) {
    padding: 10rem 15rem;
  }
  h1 {
    padding: 1rem 0rem;
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    @media (min-width: 1024px) {
      flex-direction: row;
    }
    p {
      flex-grow: 1;
      flex-basis: 50%;
      padding: 2rem 0rem;
      line-height: 2rem;
    }
    form {
      border: 2px solid ${(props) => props.theme.text};
      display: flex;
      flex-grow: 1;
      flex-basis: 50%;
      justify-content: center;
      max-height: 2rem;
      @media (min-width: 1024px) {
        margin: 3rem;
      }

      input {
        padding: 0.5rem;
        width: 100%;
        border: none;
        &:focus {
          outline: none;
        }
      }
      button {
        border: none;
        border-left: 2px solid ${(props) => props.theme.text};
        padding: 0rem 0.5rem;
        background: ${(props) => props.theme.body};
        color: ${(props) => props.theme.text};
        font-weight: bold;
        &:hover {
          cursor: pointer;
          background: ${(props) => props.theme.text};
          color: ${(props) => props.theme.body};
        }
      }
    }
  }
`;

const NewsLetter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Wrapper className="cenetent-center">
      <h1>Join Our NewsLetter!</h1>
      <div>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus,
          voluptatum quas eos, rem beatae veritatis voluptatem nam eum similique
          ducimus ad possimus? Deserunt non corrupti sed facilis numquam,
          consequuntur similique?
        </p>

        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="text" placeholder={"example@gmail.com"} />
          <button>Subscribe</button>
        </form>
      </div>
    </Wrapper>
  );
};

export default NewsLetter;
