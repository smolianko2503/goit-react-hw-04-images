import styled from 'styled-components';
import { Field as FormikField } from 'formik';

export const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 52px;
  padding-right: 24px;
  padding-left: 24px;
  padding-top: 12px;
  padding-bottom: 12px;
  color: #fff;
  background-color: #3f51b5;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;

export const Field = styled(FormikField)`
  width: 250px;
`;

export const Button = styled.button``;
