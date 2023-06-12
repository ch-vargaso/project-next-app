import React, { useEffect, useState } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from "@apollo/client";
import { GetServerSideProps } from 'next';
import { type } from 'os';
import GraphqlClientMainURL from '../../graphql/graphql-client';

const GET_EPISODES = gql`
 query GetEpisodes{
   episodes{
        results{
        id
        name
        characters{
            id
            image 
            }
        }
    }
 }
`;


type Props = {
    data: {
        episodes: {
            // map(arg0: (episode: queryEpisode) => null): React.ReactNode;
            results: queryEpisode[]
        }
    }
    result: any
}

type queryEpisode = {
    id: string,
    name: string
    characters: [
        id: string,
        image: string
    ]
}

const IndexGraphQL = (props: Props) => {
    const { data, loading, error } = useQuery(GET_EPISODES);
    console.log('props :>> ', props);
    const { result } = props
    console.log('data :>> ', data);
    // const episodes = result.data.episodes.results
    // console.log('episodes :>> ', episodes);

    // console.log('data :>> ', data); undefined...

    if (loading) {
        return <p>loading...</p>;
    }
    if (error) {
        return <p>{error.message}</p>
    }

    return (
        <div>
            <div>
                <h2>hola</h2>
                {data.episodes.results && data.episodes.results.map((episode: any) => {
                    console.log('episode after map :>> ', episode.name);
                    <div key={episode.id}>
                        <p>{episode.name}</p>
                        <h2>hola</h2>
                    </div>
                })}
                {/* {props.data.episodes.results && props.data.episodes.results.map((episode: queryEpisode) => {
                    <div key={episode.id} >
                        <h2>{episode.name}</h2>

                        <p>{episode.name}</p>
                        <h2>My first Apollo app 🚀</h2>
                    </div>

                })
                } */}
            </div>
        </div>
    )
}


export default IndexGraphQL


export const getServerSideProps: GetServerSideProps = async (context) => {
    const {
        query: { page },
    } = context

    const { data } = await GraphqlClientMainURL.query<Promise<Episodes>>({
        query: GET_EPISODES,
        // variables: { page: +page || 1 },
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