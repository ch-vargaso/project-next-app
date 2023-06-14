import { ApolloClient, InMemoryCache } from "@apollo/client";

const graphqlClientMainURL = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql",
    // aqußi tengo que cambiar mi URL
    cache: new InMemoryCache()
});

export default graphqlClientMainURL