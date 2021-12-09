import React from "react";
import Image from "next/image";
import styles from "../styles/Header.module.scss";
import AirbnbLogoIcon from "../public/static/svg/logo/logo.svg";
import AirbnbLogoTextIcon from "../public/static/svg/logo/logo.svg";

const Header: React.FC = () => {
    return (
        <div className="container">
            <div className="header-logo-wrapper">
                <AirbnbLogoIcon className="header-logo" />
                <AirbnbLogoTextIcon />
            </div>
        </div>

    );
}

export default Header;