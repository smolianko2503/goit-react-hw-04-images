import styled from 'styled-components';

export const LoadMoreButton = styled.button`
  display: block;
  margin-left: auto;
  margin-right: auto;
  border: none;
  border-radius: 4px;
  background-color: rgb(63, 81, 181);
  color: white;
  margin-top: 20px;
  margin-bottom: 20px;

  :hover {
    background-color: green;
    color: black;
    transition-property: background-color, color;
    transition-duration: 500ms;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
`;
