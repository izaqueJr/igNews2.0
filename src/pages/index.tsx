
import Head from 'next/head';
import styles from '../styles/home.module.scss';

export default function Home() {
  return (
    <>
      <Head >
        <title>Inicio | Ig.News</title>
      </Head>
      <h2 className={ styles.title }>Hello Next.js</h2>
    </>
  )
}
