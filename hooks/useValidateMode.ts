import { myUseSelector } from "../store";
import { useDispatch } from "react-redux"
import { commonActions } from "../store/common";

function useValidate() {
    const dispatch = useDispatch();
    const validateMode = myUseSelector((state) => state.common.validateMode);

    const setValidateMode = (value: boolean) => {
        dispatch(commonActions.setValidateMode(value));
    }

    return { validateMode, setValidateMode };
};

export default useValidate;