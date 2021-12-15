import { configureStore } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE, MakeStore } from "next-redux-wrapper"; // Next.js에서 Redux를 활용하기 위해 사용
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { combineReducers } from "redux";
import user from "./user";

const rootReducer = combineReducers({
    user: user.reducer,
});

export type RootState = ReturnType<typeof rootReducer>; // 타입스크립트(암기) : 외부에서 State 접근할 때 type 사용

let initialRootState: RootState;

const reducer = (state: any, action: any) => {
    if(action.type === HYDRATE){
        if(state === initialRootState) {
            return {
                ...state,
                ...action.payload
            };
        }
        return state;
    }
    return rootReducer(state, action);
}

export const myUseSelector: TypedUseSelectorHook<RootState> = useSelector;

const initStore: MakeStore<any> = () => {
    const store = configureStore({
        reducer,
        devTools: true,
    });
    initialRootState = store.getState();
    return store;
};

export const wrapper = createWrapper(initStore);