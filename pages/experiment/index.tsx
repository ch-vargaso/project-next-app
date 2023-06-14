import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React from 'react'
import { gql, useQuery } from '@apollo/client'
import style1 from "../../styles/Characters.module.css";
import Link from 'next/link';
import Pagination from '../../components/Pagination';
import { useRouter } from 'next/router';
import Character from '../characters/[id]';
import graphqlClientMainURL from '../../graphql/graphql-client';



const GET_CHARACTERS = gql`
  query getCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
        prev
        next
      }
      results {
        id
        name
        image
      }
    }
  }
`
//  es posible que para los personjaes individuales tenga que cambiar este query porque sino no voy a tener los datos para tener resultado que quiero---
//  del filter---: se adhirio porque se necesitaba buscar... como para una barra de búsqueda... esos filtros se hacen en la parte de los paréntesis iniciales...
// en este caso: ($page: Int, $filter: FilterCharacter) esto varia con cada API... depende de las posibilidades de la API 


type Characters = {
    info: Info
    results: Character[]
    data: any
}

type Props = Characters

// const Characters: React.FC<{ data: Characters }> = ({ data }) => {

const AllCharacters = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    console.log('data from server :>> ', data.characters.info)
    const { next, pages, prev, count } = data.characters.info
    const router = useRouter();
    const pathname = router.pathname

    // const { data, loading, error } = useQuery(GET_CHARACTERS, {
    //     variables: { page: pages}
    // });
    // if (loading) {
    //     return <p>loading...</p>
    // }
    // if (error) {
    //     return <p>{error.message}</p>
    // }
    // if (!data) {
    //     return <p>No data avialable...</p>
    // }
    // console.log(data.characters);

    // console.log('router from Index :>> ', router);

    return (
        <div>
            <h1 className={style1.page_title} >List of Characters</h1>
            <Pagination count={count} next={next} prev={prev} pages={pages} router={router} pathname={pathname} />

            <div className={style1.characters_container} >
                {data.characters.results.map((character: Character) => {
                    return (
                        <div key={character.id} className={style1.character_card}>
                            <p>{character.name} </p>
                            <img src={character.image} alt={`cover image of ${character.name}`} className={style1.img} />

                            <div className={style1.link_container} >
                                <Link href={`/characters/${character.id}`} className={style1.link_text} >Learn more</Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
};

export default AllCharacters

// ########### BACK END ########## 

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {
        query: { page }
        //  hay que estar pendiente de esto porque así se puede manejar todas las variaciones del query...
    } = context
    console.log('context.query.page :>> ', context.query.page);
    try {
        const { data } = await graphqlClientMainURL.query<Promise<Characters>>({
            query: GET_CHARACTERS,
            variables: { page: +page! || 1 }
            // cno el  + se pasa de string to number . If I don´t have a number || se pone en la pagina 1
        })
        return {
            props: { data: data }

        }
    } catch (error) {
        return { props: { data: null } }
    }
};

