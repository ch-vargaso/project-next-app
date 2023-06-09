import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import MainLayout from '../layouts/MainLayout'

const Home: NextPage = () => {
  return (

    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.title}>
          Welcome to Rick and Morty with <a href="https://nextjs.org">Next.js!</a>
        </h2>
      </main>
    </div>
  )
};

export default Home
