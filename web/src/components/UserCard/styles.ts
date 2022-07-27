import styled from 'styled-components';
import { Link } from 'react-router-dom';

type ContainerProps = {
  isClickable?: boolean;
};

export const Container = styled(Link).withConfig({
  /**
   * shouldForwardProp is used here to avoid a custom Prop
   * to be passed to DOM and throws an error on console
   *
   * See more: https://styled-components.com/docs/api#shouldforwardprop
   */
  shouldForwardProp: prop => prop.toString() !== 'isClickable',
})<ContainerProps>`
  text-decoration: none;
  width: 100%;
  min-height: 20rem;
  border-radius: 20px;
  background-color: var(--gray-900);
  padding: 1.5rem;
  transition: filter 0.2s;
  cursor: ${({ isClickable }) => (isClickable ? 'pointer' : 'initial')};

  :hover {
    filter: brightness(1.1);
  }

  img {
    width: 100%;
    object-fit: cover;
    margin-bottom: 0.625rem;
  }

  p + p {
    margin-top: 0.3125rem;
  }

  p:last-child {
    word-break: break-all;
  }
`;
