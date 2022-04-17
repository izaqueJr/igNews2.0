import React from "react";
import SignInButton from "../sigInButton";
import styles from './styles.module.scss' 

const Header = () => {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="logo" />

                <nav>
                    <a className={styles.active} href="">Home</a>
                    
                    <a href="">Posts</a>
                </nav>

                <SignInButton />
            </div>
        </header>
    );
}

export default Header 