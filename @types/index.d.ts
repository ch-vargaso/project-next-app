interface Data{
    message: string
}
type id = any

type Character = {
    created: string,
        episode: [string],
        gender: string,
        id: string ,
        image: string,
        location: {
            name: string,
            url: string
        }
        name: string,
        origin: {
            name: string,
            url: string | null
        },
        species: string,
        status: string,
        type: string | null,
        url: string
}

type Episode = {
    id: string,
    name: string,
    air_date: string,
    episode: string,
    characters: [string],
    url: string
    created: string
}

type Episodes = {
    episodes: {
        results: {
            id: string,
            name: string,
            characters: {
                id: string,
                image: string
            }
        }
    }
}

