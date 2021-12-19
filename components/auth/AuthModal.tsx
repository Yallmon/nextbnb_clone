import React from "react";
import { myUseSelector, RootState } from "../../store";
import SignUpModal from "./SignUpModal";
import LoginModal from "./LoginModal";

interface Iprops {
    closeModal: (event: React.MouseEvent<HTMLDivElement>) => void;
    // closeModal: () => void;
};
function AuthModal({closeModal}: Iprops) {
    const authMode = myUseSelector((state: RootState) => state.auth.authMode);
    return ( 
        <div>
            {authMode === "signup" && <SignUpModal closeModal={closeModal}/> }
            {authMode === "login" && <LoginModal closeModal={closeModal}/> }
        </div>
    );
}

export default AuthModal;