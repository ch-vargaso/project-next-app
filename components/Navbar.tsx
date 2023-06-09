import Link from 'next/link'
import React from 'react'
import style_navbar from '../styles/navbar.module.css'

type Props = {}
type active = any

const Navbar = (props: Props) => {
  return (
    <div className={style_navbar.container} >
      <Link href="/">Home</Link>
      <Link href="/characters/">Characters</Link>
      <Link href="/episodes/">Episodes</Link>
      {/* <Link href="/episodes/"
        className={({active: active}) => active ? style_navbar.hola : style_navbar.adios}
      >Episodes</Link> */}
    </div >
  )
}

export default Navbar