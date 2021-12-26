import { UserType } from "./user";

export type UserState = UserType & {
    isLogged: boolean;
};

export type CommonState = {
    validateMode: boolean;
};

export type SearchRoomState = {
    location: string;
    latitude: number;
    longitude: number;
    checkInDate: string | null;
    checkOutDate: string | null;
    adultCount: number;
    childrenCount: number;
    infantsCount: number;
};