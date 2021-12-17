import React from "react";
import styled from 'styled-components';
import RedXIcon from "../../public/static/svg/input/red_x_icon.svg";
import GreenCheckIcon from "../../public/static/svg/input/green_check_icon.svg";
import palette from "../../styles/palette";

const Container = styled.p<{isValid: boolean}>`
    color: ${(isValid ) => (isValid ? palette.davidson_orange : palette.green)};
    display: flex;
    align-items: center;
    svg{
        margin-right: 8px;
    }
`;

interface PasswordWarningProps {
    isValid: boolean;
    text: string
    
}
 
function PasswordWarning({isValid, text}: PasswordWarningProps) {
    return ( 
        <Container isValid={isValid}>
            {isValid ? <GreenCheckIcon /> : <RedXIcon />}
            {text}

        </Container>
     );
}

export default PasswordWarning;