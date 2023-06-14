import { GetServerSideProps } from 'next'
import React from 'react'
import styles from '../../styles/Episodes.module.css'
import { gql, useQuery } from '@apollo/client'
import GraphqlClientMainURL from '../../graphql/graphql-client';
import Link from 'next/link';

const GET_EPISODES = gql`
    query getEpisodes($page: Int, $filter: FilterEpisode){
    episodes(page:$page,
            filter: $filter){
            info{
            count
            pages
            next
            prev
            }
            results{
            id
            name
            air_date
            characters{
                id
                name
                image}
            }
            }
    }
`;

type Props = {
    data: {
        episodes: {
            results: queryEpisode[]
        }
    }
}

type queryEpisode = {
    id: string,
    name: string
    characters: Character[]
}

const Episodes = (props: Props) => {
    console.log('props :>> ', props.data.episodes);
    const data = props.data
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // const { data, loading, error } = useQuery(GET_EPISODES);
    // console.log('data :>> ', data);
    // if (loading) {
    //     return <p>loading...</p>
    // }
    // if (error) {
    //     return <p>{error.message}</p>
    // }

    return (
        <div>
            <h1 className={styles.title} >Episodes</h1>
            <table className={styles.table} >
                <tbody>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Featured Characters</th>
                    </tr>
                    {data.episodes.results.map((episode: queryEpisode) => {
                        return (
                            <tr key={episode.id} >
                                <th>{episode.id}</th>
                                <th>{episode.name}</th>
                                <th>
                                    {episode.characters.map((character: Character) => {
                                        return (
                                            <>
                                                <Link href={`/characters/${character.id}`}>
                                                    <img key={character.id} src={character.image} width={50} height={50} />
                                                    {/* <Image src={character.image}} alt={character.name} width={50} height={50} /> */}

                                                </Link>
                                            </>
                                        )

                                    })}
                                </th>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>

    )
};

export default Episodes

// ###################  BACK END ###################

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {
        query: { page },
    } = context

    const { data } = await GraphqlClientMainURL.query<Promise<Episodes>>({
        query: GET_EPISODES,
        variables: { page: + page! || 1 },
    })
    return {
        props: { data },
    }
}


//  this is the other fetch learned from Emily without using apollo client 

    // const [data, setData] = useState();

    // const getData = async () => {

    //     try {
    //         const response = await fetch('https://rickandmortyapi.com/graphql', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 query:
    //                     `query {
    //                     episodes{
    //                         results{
    //                         id
    //                         name
    //                         characters{
    //                             id
    //                             image
    //                                 }
    //                             }
    //                         }
    //                     }`
    //             })

    //         });
    //         const result = await response.json()
    //         console.log('episodes result :>> ', result)
    //         setData(result)
    //     } catch (error) {
    //         console.log('error :>> ', error);
    //     }
    // };

    // useEffect(() => {
    //     getData()
    // }, [])