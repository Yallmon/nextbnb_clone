import React, { useState } from "react";
import Link from "next/link";
// Styles
import styled from 'styled-components';
import palette from "../styles/palette";

import AirbnbLogoIcon from "../public/static/svg/logo/airbnb_logo.svg";
import AirbnbLogoTextIcon from "../public/static/svg/logo/airbnb_logo_text.svg";


import { myUseSelector } from "../store";
import { useDispatch } from "react-redux";

import { logoutAPI } from "../lib/api/auth";
import { userActions } from "../store/user";
import HeaderAuth from "./HeaderAuths";
import HeaderUserProfile from "./HeaderUserProfile";


const Container = styled.div`
  position: sticky; // Header는 위에 붙어있다.
  top: 0;
  width: 100%;
  height: 80px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 80px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
  z-index: 10;

  .header-logo-wrapper {
    display: flex;
    align-items: center;
    .header-logo {
      margin-right: 6px;
    }
  }

  .header-auth-buttons {
    .header-sign-up-button {
      height: 42px;
      margin-right: 8px;
      padding: 0 16px;
      border: 0;
      border-radius: 21px;
      background-color: white;
      cursor: pointer;
      outline: none;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
    .header-login-button {
      height: 42px;
      padding: 0 16px;
      border: 0;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
      border-radius: 21px;
      background-color: white;
      cursor: pointer;
      outline: none;
      &:hover {
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
      }
    }
  }
  .header-user-profile {
    display: flex;
    align-items: center;
    height: 42px;
    padding: 0 6px 0 16px;
    border: 0;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
    border-radius: 21px;
    background-color: white;
    cursor: pointer;
    outline: none;
    &:hover{
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
    }
    .header-user-profile-image {
      margin-left: 8px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
  .header-logo-wrapper + div {
    position: relative;
  }
  .header-usermenu {
    position: absolute;
    right: 0;
    top: 52px;
    width: 240px;
    padding: 8px 0;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    background-color: white;
    li {
      display: flex;
      align-items: center;
      width: 100%;
      height: 42px;
      padding: 0 16px;
      cursor: pointer;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
    .header-usermenu-divider {
        width: 100%;
        height: 1px;
        margin: 8px 0;
        background-color: ${palette.gray_dd};
      }
  }
`;

const Header: React.FC = () => {
    const user = myUseSelector((state) => state.user);
    const dispatch = useDispatch();
    
    

    return (
        <Container>
            <Link href="/">
                <a className="header-logo-wrapper">
                    <AirbnbLogoIcon className="header-logo" />
                    <AirbnbLogoTextIcon />
                </a>
            </Link>
            {!user.isLogged && (
              <HeaderAuth/> // Optimization: Component 분리
            )}
            {user.isLogged && (
              <HeaderUserProfile />
            )

            }
        </Container>
    );
   
}

export default Header;