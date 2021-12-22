import React from "react";
import styled, { css } from 'styled-components';
import { myUseSelector } from "../../store";
import WarningIcon from "../../public/static/svg/selector/warning.svg"

const Container = styled.div<{isValid: boolean; validateMode: boolean}>`
  
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
            {options.map((option, index) => {
                <label key={index}>
                    <input type="radio" checked={value === option.value} onChange={() => onChange && onChange(option.value)} />
                    <span>
                        {option.label}
                        <span className="radio-description">{option.description}</span>
                    </span>
                </label>
            })}
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