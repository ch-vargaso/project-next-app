import React, { useEffect } from "react";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Link from "next/link";
import { type } from "os";
import { error } from "console";
import style1 from "../../styles/Characters.module.css";


type Props = {
  result: Data;
};

const CharactersIndex = (props: Props) => {
  const { result } = props;
  console.log("result :>> ", result);
  return (
    <div>
      <h1 className={style1.page_title} >List of Characters</h1>
      <div className={style1.characters_container}>
        {result.results &&
          result.results.map((result: Character) => {
            return (

              <div key={result.id} className={style1.character_card}>
                <Link href={`/characters/${result.id}`}>{result.name} </Link>
                <img src={result.image} alt={`cover image of ${result.name}`} className={style1.img} />
                <div className={style1.link_container} >
                  <Link href={`/characters/${result.id}`} className={style1.link_text} >Learn more</Link>
                </div>
              </div>
            );
          })}
      </div>

    </div>
  );
};

export default CharactersIndex;

//  ejemplo de Fetch de la pagina.....

type Data = {
  map(arg0: (result: Data) => React.JSX.Element): React.ReactNode;
  results: Character[] | null;
  error: null | string;
};

// let [url, setUrl] = useState("https://rickandmortyapi.com/api/character/?page=1");
// esto puede ser interesante en caso que necesite aögun id para los characters individuales...

export const getServerSideProps: GetServerSideProps<{ result: Data }> = async (context) => {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const result = await response.json();
    return { props: { result: result } };
  } catch (error) {
    console.log(error, "failed to fetch");
    return { props: { result: null } };
  }
};

// Ejemplo de Fetch de rick and Morty



// ejemplo de fetch para el trycatch....
