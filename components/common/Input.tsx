import React from "react";
import styled from 'styled-components';
import palette from "../../styles/palette";


const Container = styled.div<{iconExist: boolean}>`
  input {
    position: relative;
    width: 100%;
    height: 46px;
    padding: ${({iconExist}) => (iconExist? "0 44px 0 11px": "0 11px")};
    border: 1px solid $gray_eb;
    border-radius: 4px;
    font-size: 16px;
    outline: none;
    ::placeholder {
      color: ${palette.gray_76};
    }
    & :focus {
        border-color: ${palette.dark_cyan} !important;
    }
  }
  .input-icon-wrapper {
    position: absolute;
    top: 0;
    right: 11px;
    height: 46px;
    display: flex;
    align-items: center;
  }
`;

interface Iprops extends React.InputHTMLAttributes<HTMLInputElement>{
    icon?: JSX.Element; // Input HTML 속성에 추가된 icon 속성, JSX Element 타입, ?: 로 undefined 가능
}
function Input({icon, ...props}:Iprops) {
    return <Container iconExist={!!icon}>
        <input {...props} />
        <div className="input-icon-wrapper">{icon}</div>
    </Container>
}
export default Input