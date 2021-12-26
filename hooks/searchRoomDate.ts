import { useDispatch } from "react-redux";
import { myUseSelector } from "../store"
import { searchRoomActions } from "../store/searchRoom";

const useSearchRoomDate = () => {
    const checkInDate = myUseSelector((state) => state.searchRoom.checkInDate);
    const checkOutDate= myUseSelector((state) => state.searchRoom.checkOutDate);

    const dispatch = useDispatch();

    const setCheckInDateDispatch = (date: Date | null) => {
        if(date) {
            dispatch(searchRoomActions.setStartDate(date.toISOString()));
        } else {
            dispatch(searchRoomActions.setStartDate(null));
        }
    };

    const setCheckOutDateDispatch = (date: Date | null) => {
        if(date) {
            dispatch(searchRoomActions.setEndDate(date.toISOString()));
        } else {
            dispatch(searchRoomActions.setStartDate(null));
        }
    };

    return {
        checkInDate: checkInDate ? new Date(checkInDate) : null,
        checkOutDate: checkOutDate ? new Date(checkOutDate) : null,
        setCheckInDateDispatch,
        setCheckOutDateDispatch
    };
};

export default useSearchRoomDate;