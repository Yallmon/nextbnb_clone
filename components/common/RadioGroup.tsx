import React from "react";
import styled, { css } from 'styled-components';
import { myUseSelector } from "../../store";
import WarningIcon from "../../public/static/svg/selector/warning.svg"
import palette from "../../styles/palette";

const Container = styled.div<{isValid: boolean; validateMode: boolean}>`
  .radio-label {
      font-size: 16px;
      font-weight: 600;
      color: ${palette.gray_76};
      margin-bottom: 32px;
  }
  .radio-list-wrapper {
      &:after {
          display: block;
          content: "";
          clear: both;
      }
  }
  label {
      float: left;
      margin-bottom: 24px;
      font-size: 16px;
      line-height: 1.2;
      cursor: pointer;
      clear: both;
      &:last-child {
          margin-bottom: 0;
      }
  }
  input[type="radio"] {
      width: 16px;
      height: 16px;
      margin: 0;
      position: relative;
      margin-right: 12px;
      flex-shrink: 0;
      font-size: 16px;
      -webkit-appearance: none;
      border: 1px solid ${palette.gray_b0};
      border-radius: 50%;
      outline: none;
      cursor: pointer;
      ${({validateMode, isValid}) => {
          if(validateMode) {
              if(!isValid) {
                  return css`
                    border-color: ${palette.tawny};
                    background-color: ${palette.snow};
                  `;
              }
              return css`
                border-color: ${palette.dark_cyan};
              `;
          }
          return undefined;
      }}
  }
  input[type="radio"]:checked {
      background-color: ${palette.dark_cyan};
      border: 0;
  }
  input[type="radio"]:checked:after {
      content: "";
      width: 6px;
      height: 6px;
      margin: auto;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: white;
      border-radius: 50%;
      display: block;
  }
  .radio-description {
      display: block;
      margin-top: 5px;
      margin-left: 28px;
  }
`;

interface Iprops extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    value?: any;
    options?: {label: string; value: any; description?: string}[];
    onChange?: (value: any) => (void);
    isValid?: boolean;
    errorMessage?: string;
};

function RadioGroup({
    label,
    value,
    options = [],
    onChange,
    isValid,
    errorMessage = "옵션을 선택하세요.",
}: Iprops
) {
    const validateMode = myUseSelector((state) => state.common.validateMode);

    return ( <Container isValid={!!isValid} validateMode={validateMode}>
        <p className="radio-label">{label}</p>
        <div className="radio-list-wrapper">
            {options.map((option, index) => (
                <label key={index}>
                    <input type="radio" checked={value === option.value} onChange={() => onChange && onChange(option.value)} />
                    <span>
                        {option.label}
                        <span className="radio-description">{option.description}</span>
                    </span>
                </label>
            ))}
        </div>
        {validateMode && !isValid && (
            <div className="radio-group-wrapper">
                <WarningIcon />
                <p>{errorMessage}</p>
            </div>
        )}
    </Container> );
}

export default React.memo(RadioGroup);