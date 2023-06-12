import MainLayout from "../layouts/MainLayout";
import "../styles/globals.css";
import type { AppProps } from "next/app";

// FROM HERE IS THE EXPERIMENT.....
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  // aqußi tengo que cambiar mi URL

  cache: new InMemoryCache()
});



function MyApp({ Component, pageProps }: AppProps) {
  // console.log('holaaaa :>>')
  return (
    <ApolloProvider client={client}>
      <MainLayout>
        {/* <h1>Si escribo algo en la app va a cargar en toooda la app...</h1> */}
        <Component {...pageProps} />
      </MainLayout>
    </ApolloProvider>
  );
};

export default MyApp;

{/* si lo hago así entonces va a estar en TODAS MIS PAGINAS!!!! */ }
{ /* Component es como mi app y außi se puede poner todo lo que se quiere hacer a nivel global*/ }
