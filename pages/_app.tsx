import MainLayout from "../layouts/MainLayout";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  // console.log('holaaaa :>>')
  return (
    <MainLayout>
      {/* <h1>Si escribo algo en la app va a cargar en toooda la app...</h1> */}
      <Component {...pageProps} />
    </MainLayout>
  );
}

export default MyApp;

{/* si lo hago así entonces va a estar en TODAS MIS PAGINAS!!!! */ }
{ /* Component es como mi app y außi se puede poner todo lo que se quiere hacer a nivel global*/ }
