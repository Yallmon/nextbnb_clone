import React from "react";
import Link from "next/link";
import styles from "../styles/Header.module.scss";
import AirbnbLogoIcon from "../public/static/svg/logo/airbnb_logo.svg";
import AirbnbLogoTextIcon from "../public/static/svg/logo/airbnb_logo_text.svg";

const Header: React.FC = () => {
    console.log(styles);
    return (
        <div className={styles.container}>
            <Link href="/">
                <a className={styles["header-logo-wrapper"]}>
                    <AirbnbLogoIcon className="header-logo" />
                    <AirbnbLogoTextIcon />
                </a>
            </Link>
            <div className={styles["header-auth-buttons"]}>
                <button className={styles["header-sign-up-button"]}>
                    회원가입
                </button>
                <button className={styles["header-login-button"]}>
                    로그인
                </button>
            </div>
        </div>

    );
    
}

export default Header;