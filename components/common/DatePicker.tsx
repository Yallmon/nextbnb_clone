import React from 'react';
import styled from 'styled-components';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
// import ko from 'date-fns/esm/locale/ko/index.js';
import "react-datepicker/dist/react-datepicker.css"

const Container = styled.div`
  width: 100%;
  height: 100%;
  .react-datepicker {
      padding: 16px 32px;
      background-color: white;
      box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 20px !important;
  }
  
`;


interface Iprops extends ReactDatePickerProps {

};

function DatePicker({...props}: Iprops) {
    return ( <Container>
        <ReactDatePicker {...props} disabledKeyboardNavigation  />
    </Container> );
}

export default DatePicker;
