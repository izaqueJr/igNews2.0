import React from "react";
import {FaGithub} from "react-icons/fa";
import {FiX} from 'react-icons/fi'
import { signIn, useSession } from 'next-auth/react'

import styles from './styles.module.scss' 

const SignInButton = () => {
    const { data: session } = useSession()
    

    return session ? (
        <button
            type="button"
            className={styles.signInButton}
        > 
            <FaGithub color="#04d361"/>
           Izaque Rodrigues
           <FiX color="#737380" className={styles.closeIcon}/>
        </button>
    ) : (
        <button
        type="button"
        className={styles.signInButton}
        onClick={() => signIn('github')}	

        > 
            <FaGithub color="#eba417"/>
            Sign In with Github
        </button>
    )
}

export default SignInButton 