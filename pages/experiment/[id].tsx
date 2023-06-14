import React from 'react'
import { gql } from '@apollo/client'

const GET_CHARACTER = gql`
    query getCharacter(id:$id){
        id
        name 
        status
        species
        gender
        origin
        image
        episode{
            id
            name 
            air_date
        }
    }
`;
//  esto es algo en lo que se puede trabjaar más adelante...
//  esta sería la URL para seguir trabajando...   https://www.youtube.com/watch?v=VLhJ4rVdY3c&t=1802s
// este sería el código para seguir trabajando...   https://github.com/michaelDonchenko/rick-morty-api-nextjs/blob/main/gql/queries/characters.ts


type Props = {

}

const CharacterQL = (props: Props) => {
    return (
        <div>Character with GraphQL</div>

    )
}

export default CharacterQL