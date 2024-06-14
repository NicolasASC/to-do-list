import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    font-family: 'Figtree', sans-serif;
    box-sizing: border-box;
  }
  
  body {
    width: 100vw;
    min-height: 100vh;
    background-image: linear-gradient(to top, #09203f 0%, #537895 100%);
  }

  button{
    transition: 0.5s ease;
  }

  button:hover{
    scale: 1.15;
  }

`;

export default Global;