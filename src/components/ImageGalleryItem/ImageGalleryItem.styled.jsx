import styled from 'styled-components';

export const GalleryItem = styled.li`
  :hover,
  :focus {
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
    transition-property: box-shadow;
    transition-duration: 250ms;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

export const Image = styled.img`
  display: block;
  width: 240px;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
`;
