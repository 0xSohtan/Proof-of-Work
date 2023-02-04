import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function pow() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Proof of Work</title>
                <meta name="description" content="Proof of Work" />
            </Head>
            <div>
                Proof of Work
            </div>
        </div>
    )
};