import React from "react";
import styled, {css} from 'styled-components';
import { myUseSelector } from "../../store";
import palette from "../../styles/palette";

const Container = styled.div<{isValid: boolean; validateMode: boolean}>`
  select{
    width: 100%;
    height: 100%;
    background-color: white;
    border: 1px solid ${palette.gray_eb};
    padding: 0 11px;
    border-radius: 4px;
    outline: none;
    -webkit-apperarance: none;
    background-image: url("/static/svg/selector/selector_down_arrow.svg");
    background-position: right 11px center;
    background-repeat: no-repeat;
    font-size: 16px;
    &: focus {
        border-color: ${palette.dark_cyan};
    }
  }
  ${({isValid, validateMode}) => validateMode &&
    css`
        select {
            border-color: ${isValid ? palette.dark_cyan : palette.tawny} !important;
            background-color: ${isValid ? "white" : palette.snow};

        }    
    `
  }
`;

interface Iprops extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options?: string[];
    disabledOptions?: string[];
    isValid?: boolean;
}

function Selector({options = [], disabledOptions=[], isValid, ...props}:Iprops) {

    const validateMode = myUseSelector((state) => state.common.validateMode);

    return <Container isValid={!!isValid} validateMode={validateMode}>
        <select {...props}>
            {disabledOptions.map((option, index) => (
                <option key={index} value={option} disabled>
                    {option}
                </option>
            ))}
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </Container>
}

export default Selector;