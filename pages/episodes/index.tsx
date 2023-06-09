import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import styles from '../../styles/Episodes.module.css'


type Props = {
    result: any
}

const episodes = (props: Props) => {
    const { result } = props
    const episodes = result.results
    console.log('result :>> ', result);
    return (
        <div>
            <h1 className={styles.title} >Episodes</h1>
            <table className={styles.table} >
                <tbody>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Fearuted Characters</th>
                    </tr>
                    {episodes && episodes.map((episode: Episode) => {
                        const characters = episode.characters
                        return (
                            <tr key={episode.id}>
                                <th>{episode.id}</th>
                                <td>{episode.name}</td>
                                {/* <td>{episode.created}</td> */}
                                <td>

                                </td>
                            </tr>
                        )


                    })}
                    <tr>
                        <th>hola</th>
                        <td>kmkmkm</td>
                        <td>kokok
                            {/* <div>
                            <img src="" alt="" />
                        </div> */}
                            {/* aquí hago la lista de imagenes pequeñas... */}
                        </td>


                    </tr>

                    <tr>

                    </tr>

                </tbody>
            </table>
        </div>

    )
}

export default episodes


// here is the backend... 




export const getServerSideProps: GetServerSideProps<{ result: Episode }> = async () => {
    try {
        const response = await fetch("https://rickandmortyapi.com/api/episode");
        const result = await response.json();
        return { props: { result: result } }
    } catch (error) {
        console.log('failed to fetch:>> ', error);
        return { props: { result: null } }
    }
}

// export const getStaticPaths: GetStaticPaths = async (context) => {
//     console.log('context :>> ', context);
//     const urls = episodes
//     const paths = []
//     for (let 0 =; i <= episodes.length; i++) {
//         const url = i.toString()
//         const path = ``
//     }
// }

// export const getStaticProps: GetStaticProps<{ result: Character }> = async () => {
    
// }
