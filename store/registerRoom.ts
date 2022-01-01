import {createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {BedType} from "../types/room";


type RegisterRoomState = {
    largeBuildingType : string | null;
    buildingType : string | null;
    roomType: string | null;
    isSetUpForGuest: boolean | null;
    maximumGuestCount: number;
    bedroomCount: number;
    bedCount: number;
    bedList: {id: number; beds: {type: BedType; count: number}}[];
    publicBedList: {type: BedType; count: number}[];
};

const initialState: RegisterRoomState = {
    largeBuildingType: null,
    buildingType: null,
    roomType: null,
    isSetUpForGuest: null,
    maximumGuestCount: 1,
    bedroomCount: 0,
    bedCount: 1,
    bedList: [],
    publicBedList: [],
};

const registerRoom = createSlice({
    name: "registerRoom",
    initialState,
    reducers: {
        setLargeBuildingType(state, action: PayloadAction<string>) {
            if (action.payload === "") {
              state.largeBuildingType = null;
            }
            state.largeBuildingType = action.payload;
            return state;
          },
        setBuildingType(state, action: PayloadAction<string>) {
            if (action.payload === "") {
                state.buildingType = null;
              }
              state.buildingType = action.payload;
              return state;
        },
        setRoomType(state, action: PayloadAction<"entire" | "private" | "public">) {
            state.roomType = action.payload;
            return state;
        },
        setIsSetUpForGuest(state, action: PayloadAction<boolean>) {
            state.isSetUpForGuest = action.payload;
            return state;
        },
        setMaximumGuestCount(state, action: PayloadAction<number>) {
            state.maximumGuestCount = action.payload;
            return state;
        },
        setBedroomCount(state, action: PayloadAction<number>) {
            const bedroomCount = action.payload;
            state.bedroomCount = bedroomCount;
            // state.bedList = Array.from(Array(bedroomCount), (_, index) => ({
            //     id: index + 1,
            //     beds: [],
            // }));
            return state;
        },
        setBedCount(state, action: PayloadAction<number>) {
            state.bedCount = action.payload;
            return state;
        },
    },
});

export const registerRoomActions = {... registerRoom.actions};

export default registerRoom;