import React, { useState }from "react";
import HamburgerIcon from "../public/static/svg/header/hamburger.svg";
import OutsideClickHandler from "react-outside-click-handler";

import { logoutAPI } from "../lib/api/auth";
import { userActions } from "../store/user";
import { useDispatch } from "react-redux";
import { myUseSelector } from "../store";


 
const HeaderUserProfile= () => {
    const [isUsermenuOpened, setIsUsermenuOpened] = useState(false);
    const dispatch = useDispatch();
    const userProfileImage = myUseSelector((state) => state.user.profileImage);

    const logout = async () => {
        try{
          await logoutAPI();
          dispatch(userActions.initUser());
        }catch(e) {
          console.log("Error");
        }
      }
    return ( <>
        <OutsideClickHandler 
            onOutsideClick={() => {
                if(isUsermenuOpened) {setIsUsermenuOpened(false);}
            }}>              
            <button className="header-user-profile" type="button" onClick={() => setIsUsermenuOpened(!isUsermenuOpened)}>
                <HamburgerIcon />
                <img src={userProfileImage} className="header-user-profile-image" alt="" />
            </button>
            {isUsermenuOpened && (
                <ul className="header-usermenu">
                <li>숙소 관리</li>
                <li>숙소 등록하기</li>
                <div className="header-usermenu-divider" />
                <li onClick={logout}>로그 아웃</li>
                </ul>
            )}
        </OutsideClickHandler>
    </>
     );
}
 
export default HeaderUserProfile;