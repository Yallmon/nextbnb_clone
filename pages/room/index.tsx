import React from "react";
import { GetServerSideProps } from "next";
import RoomMain from "./RoomMain";


export const getServerSideProps: GetServerSideProps = async (context) => {
    const query = context.query;
    console.log(query);
    return {
        props: {},
    };
};

function index() {
    return ( <RoomMain /> );
}


export default index;