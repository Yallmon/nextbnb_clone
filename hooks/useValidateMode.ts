/* eslint-disable import/no-anonymous-default-export */

import { myUseSelector } from "../store";
import { useDispatch } from "react-redux"
import { commonActions } from "../store/common";

export default() => {
    const dispatch = useDispatch();
    const validateMode = myUseSelector((state) => state.common.validateMode);

    const setValidateMode = (value: boolean) => {
        dispatch(commonActions.setValidateMode(value));
    }

    return { validateMode, setValidateMode };
    
}