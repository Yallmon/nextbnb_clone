import Link from "next/link";
import React from "react";
import Button from "../../common/Button";
import SearchIcon from "../../../public/static/svg/button/white_search.svg"
import { myUseSelector } from "../../../store";
import queryString from "query-string";

function SearchRoomButton() {
    const searchRoom = myUseSelector((state) => state.searchRoom);
    const roomListHref = "/room?" + queryString.stringify(searchRoom);

    return ( <Link href="#">
        <a> 
            <Button icon={<SearchIcon/>} color="amaranth" width="89px" onClick={() => {alert(roomListHref)}}> 검색 </Button>
        </a>
    </Link> );
}

export default SearchRoomButton;