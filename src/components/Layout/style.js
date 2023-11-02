import styled from "@emotion/styled";
import { Box } from "@mui/material";

const View = styled(Box)`
  display: flex;
  height: 100vh;
  a {
    text-decoration: none;
    color: rgba(0, 0, 0, 0.87);
  }
  h2 {
    padding: 1rem;
    color: rgba(0, 0, 0, 0.87);
    display: flex;
  }

  li {
    list-style-type: none;
  }

  & .layout--children-wrapper {
    width: 80%;
    height: 80%;
    background: white;
    border-radius: 0.5rem;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    boxshadow:
      0px 2px 1px -1px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14),
      0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  }

  & .layout--wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f5f5f5;
  }
`;

export default View;
