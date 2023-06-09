import React, { ReactNode } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

type Props = { children: ReactNode, contentStyle?: string }

const MainLayout = (props: Props) => {
    return (
        <>
            <Navbar />
            {/* <div>MainLayout mostrando...</div> */}
            <div >
                {/* no aplica al Navbar porque no está dentro de las propiedades */}
                {props.children}
                {/* parece props.children son las aplicaciones generales... */}
            </div>
            <Footer />
            {/* tocaría hacer un footer que se crea de otro componente */}

        </>
    )
}

export default MainLayout