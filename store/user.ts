import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../types/reduxState";
import { UserType } from "../types/user";

// 초기 상태 변수로 지정
const initialState: UserState = {
    id: 0,
    email: "",
    lastname: "",
    firstname: "",
    birthday: "",
    isLogged: false,
    profileImage: "",
};

const user = createSlice({ // Slice Reducer 생성
    name: "user",
    initialState,
    reducers: {
        setLoggedUser(state, action: PayloadAction<UserType>) {
            state = {...action.payload, isLogged: true};
            return state;
        },
    },
});

export const userActions = {...user.actions};
export default user;