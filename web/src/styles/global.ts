import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --white-900: rgba(255,255,255,0.9);
    --white-200: rgba(255,255,255,0.2);
    
    --gray-400: #c0d1e2;
    --gray-800: #38434f;
    --gray-900: #1d2226;
  }

  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing:border-box;
  }
  body {
    background-color: #000;
  }

  body, input, p {
    font-family: Helvetica, sans-serif;
    color: var(--white-900);
  }

  img {
    border-radius: 10px;
  }
`;
