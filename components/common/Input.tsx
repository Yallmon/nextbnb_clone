import React from "react";
import styled, {css} from 'styled-components';
import palette from "../../styles/palette";
import {myUseSelector} from "../../store";
import useValidateMode from "../../hooks/useValidateMode";
interface InputContainerProps {
  iconExist: boolean;
  isValid: boolean;
  useValidation?: boolean;
};

const Container = styled.div<InputContainerProps>`
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
  .input-error-message {
    margin-top: 8px;
    font-weight: 600;
    font-size: 14px;
    color: ${palette.tawny};
  }
  ${({useValidation, isValid}) => // Props 중에서 useValidation, isValid를 받아오는 형식이라, 객체로 감싸 주어야 함.
    useValidation &&
    !isValid &&
    css`
      input {
        background-color: ${palette.orange};
        & :focus {
          border-color: ${palette.orange};
        }
      }
  `};
  ${({useValidation, isValid}) =>
    useValidation &&
    isValid &&
    css`
     input {
       border-color: ${palette.dark_cyan};
     } 
    `
  };
`;

interface Iprops extends React.InputHTMLAttributes<HTMLInputElement>{
    icon?: JSX.Element; // Input HTML 속성에 추가된 icon 속성, JSX Element 타입, ?: 로 undefined 가능
    isValid?: boolean;
    useValidation?: boolean;
    errorMessage?: string;
}
function Input({
  icon,
  isValid = false,
  useValidation = true,
  errorMessage,
  ...props
  }:Iprops) {
    const { validateMode } = useValidateMode();
    // const validateMode = myUseSelector((state) => state.common.validateMode);

    return <Container iconExist={!!icon} isValid={isValid} useValidation={validateMode && useValidation}>
        <input {...props} />
        <div className="input-icon-wrapper">
          {icon}
          {useValidation && validateMode && !isValid && errorMessage && (
            <p className="input-error-message">{errorMessage}</p>
          )}
        </div>
    </Container>
}
export default Input