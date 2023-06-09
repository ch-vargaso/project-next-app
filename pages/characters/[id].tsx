import { useRouter } from "next/router";
import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from "next";
import React from "react";
import Link from "next/link";
import { type } from "os";
import characterCard from "../../styles/Character.module.css";

type Props = {
  result: Character;
};

const character = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  // const character = (props: Props) => {
  const router = useRouter();
  const character = props.result;
  const { id }: id = router.query;
  const nextId: string = (parseInt(id) + 1).toString();
  const prevId: string = (parseInt(id) - 1).toString();
  console.log("character :>> ", character);

  return (
    <div className={characterCard.page_container} >
      <br />
      {/* <button className={characterCard.bt} >
        <Link href={`/characters/`}>Back to Characters</Link>
      </button> */}
      <Link href={`/characters/`}>
        <button className={characterCard.bt} >Back to Characters</button>
      </Link>
      <div key={character.id} className={characterCard.card_container}>
        <div className={characterCard.card}>
          <img src={character.image} alt={`cover image of ${character.name}`} />
          <div className={characterCard.info}>
            <h2>{character.name}</h2>
            <p>Gender: {character.gender}</p>
            <p>Species: {character.species}</p>
            <p>Status: {character.status}</p>
            <p>Origin:{character.origin.name}</p>
            <p>Appears:{character.episode.length} episodes</p>
          </div>
        </div>
        <div>
          <Link href={`/characters/${prevId}`}>
            <button className={characterCard.bt} >Previous</button>
          </Link>

          <Link href={`/characters/${nextId}`}>
            <button className={characterCard.bt} >Next</button>
          </Link>

        </div>
      </div>
    </div>
  );
};
export default character;

// backend ############################################

// Este sería el ejemplo con una variación limitada de objetos que yo mismo definí porque conozco cuantos objetos voy a tener de mi API
// pero y que pasa si no sé cuantos objetos voy a recibir??????
// para eso está este segundo ejemplo tomado de 'Net Ninja' en YouTube = Next.js Tutorial #12,#13 

// export const getStaticPaths: GetStaticPaths = async () => {
//   const paths = [];
//   for (let i = 1; i <= 20; i++) {
//     const id = i.toString();
//     const path = `characters/${id}`;
//     paths.push({ params: { id } });
//     console.log("currentIds :>> ", paths);
//   }
//   return {
//     paths,
//     fallback: false,
//   };
// };

// Aquí es el ejemplo tomado donde juego con el número de datos dados por la API ...

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  const data = await response.json();
  console.log('data to build all the fetches :>> ', data);
  const paths = data.results.map((character: { id: { toString: () => string; }; }) => {
    return {
      params: {
        id: character.id.toString()
      }
    }
  })
  return {
    paths,
    fallback: false
  }
};


export const getStaticProps: GetStaticProps<{ result: Character }> = async (context) => {
  const id = context.params!.id;
  console.log("this is the id of one character :>> ", id);
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${id}`
    );
    const result = await response.json();
    return { props: { result: result } };
  } catch (error) {
    console.log("error :>> ", error);
    return { props: { result: null } };
  }
};
