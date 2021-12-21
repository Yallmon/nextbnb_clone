import React from "react";
import { useDispatch } from "react-redux";
import useModal from "../hooks/useModal";
import { authActions } from "../store/auth";
import AuthModal from "./auth/AuthModal";
 
const HeaderAuth = () => {
    const {openModalPortal, ModalPortal, closeModalPortal} = useModal();

    const dispatch = useDispatch();


    return ( <> 
        <div className="header-auth-buttons">
        <button className="header-sign-up-button" onClick={() => {
        dispatch(authActions.setAuthMode("signup"));
        openModalPortal();
        }}>
            회원가입
        </button>
        <button className="header-login-button"
        onClick={() => {
            dispatch(authActions.setAuthMode("login"));
            openModalPortal();
        }}
        >
            로그인
        </button>
        <ModalPortal>
            <AuthModal closeModal = {closeModalPortal}/>
        </ModalPortal>
    </div>
    </> );

}
 
export default HeaderAuth;