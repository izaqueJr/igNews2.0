import React from "react";
import styles from './styles.module.scss' 

interface SubsribeButtonProps {
    priceId: string;
}


const SubsribeButton = ({ priceId } : SubsribeButtonProps) => {
    console.log(priceId)
    return (
        <button 
            type="button"
            className={styles.subscribeButton}
        >
            Subscribe now
        </button>

    )
}

export default SubsribeButton