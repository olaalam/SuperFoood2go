import React from "react";
import styled from "styled-components";

const CheckBox = ({ handleClick, checked }) => {
  return (
    <StyledWrapper>
      <label className="switch">
        <input type="checkbox" onClick={handleClick} checked={checked} readOnly />
        <span className="slider" />
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .switch {
    font-size: 10px;
    position: relative;
    display: inline-block;
    width: 62px;
    height: 25px;
  }

  .switch input {
    opacity: 0; 
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    transition: 0.4s;
    border-radius: 30px;
    border: 1px solid #ccc;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 30px; 
    width: 30px;  
    border-radius: 16px;
    left: 0px; 
    top: -4px; 
    background-color: white;
    box-shadow: 0 2px 5px #999999;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #9E090F;
    border: 1px solid transparent;
  }

  input:checked + .slider:before {
    transform: translateX(32px); 
  }
`;

export default CheckBox;
