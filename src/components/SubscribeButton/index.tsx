import React from "react";
import styles from './styles.module.scss' 
import { useSession, signIn } from 'next-auth/react';
import { getStripeJs } from "../../services/stripe.js";
import { api } from './../../services/api';
interface SubsribeButtonProps {
    priceId: string;
}

const SubsribeButton = ({ priceId } : SubsribeButtonProps) => {
    const { data: session } = useSession()

    async function handleSubscribe() {
        if (!session) {
          signIn('github')
          return
        }
    
        try {
          const response = await api .post('/subscribe')
    
          const { sessionId } = response.data
    
          const stripe = await getStripeJs()
    
          await stripe.redirectToCheckout({ sessionId })
    
        } catch (err) {
          console.log("Erro")
          alert(err.message)
        }
      }

    return (
        <button 
            type="button"
            onClick={handleSubscribe}
            className={styles.subscribeButton}
        >
            Subscribe now
        </button>

    )
}

export default SubsribeButton