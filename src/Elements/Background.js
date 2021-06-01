import React from "react";
import styled from "styled-components";
import { ReactComponent as Points } from "../images/puntos.svg";
const Background = () => {
  return (
    <>
      <PuntosArriba />
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fillOpacity="1"
          d="M0,96L48,117.3C96,139,192,181,288,170.7C384,160,480,96,576,85.3C672,75,768,117,864,138.7C960,160,1056,160,1152,149.3C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </Svg>
      <PuntosAbajo />
    </>
  );
};

const Svg = styled.svg`
  height: 50vh;
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 0;
  path {
    fill: rgba(135, 182, 194, 0.15);
  }
`;

const PuntosArriba = styled(Points)`
  position: fixed;
  z-index: 1;
  top: 2.5rem; /* 40px */
  left: 2.5rem; /* 40px */
`;

const PuntosAbajo = styled(Points)`
  position: fixed;
  z-index: 1;
  bottom: 2.5rem; /* 40px */
  right: 2.5rem; /* 40px */
`;

export default Background;
