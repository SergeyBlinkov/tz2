import styled from "styled-components";

export const Button = styled.button<{darkGray:boolean}>`
      width: 130px;
      height: 40px;
      border: 1px solid #DDE3EE;
      border-radius: 10px;
      background: ${(props) => props.darkGray ? '#DDE3EE' : 'transparent'};
    
    `
export const LogoComponent = styled.div`
  width: 132px;
  height: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  gap: 6px;
  font-size: 18px;

  img {
    width: 39px;
    height: 39px;
  }
`
export const FindButton = styled.button<{darkGray:boolean}>`
  width: 158px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border-radius: 8px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  background: ${(props) => !props.darkGray ? "#B7BAC1" : "rgba(92, 135, 219, 1)"};
`

export const InputStyle = styled.input`
  background: #fff;
  border-radius: 10px;
  padding-left: 5px;
  text-decoration: none;
  outline: none;
  height: 40px;
`