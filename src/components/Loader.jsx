import React from "react";
import { styled } from "@mui/material/styles";
import { keyframes } from "@mui/system";

const animationKeys = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
const LoaderSection = styled("section")`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  opacity: 0.5;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;
const Rings = styled("div")`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  & div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid blue;
    border-radius: 50%;
    animation: ${animationKeys} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: blue transparent transparent transparent;
  }
`;

const Loader = () => {
  return (
    <LoaderSection>
      <Rings>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </Rings>
    </LoaderSection>
  );
};

export default Loader;
