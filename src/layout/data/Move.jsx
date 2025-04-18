import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../common/Loading";
import Error from "../../common/Error";
import { getMove } from "../../utils/moves";
import Header from "./Moves/Header";
import Type from "./Moves/Type";

function Move() {
  const { name } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [move, setMove] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMove() {
      try {
        setIsLoading(true);
        const data = await getMove(name);
        setMove(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  
    fetchMove();
  }, [name]);

  if (error) {
    return <Error error={error} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  console.log(move);

  return (
    <div className="move container py-4">
      <Header move={move} />
      <Type move={move} />
    </div>
  );
}

export default Move;
