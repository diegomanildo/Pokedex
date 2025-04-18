import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../common/Loading";
import Error from "../../common/Error";
import Header from "./Types/Header";
import Damages from "./Pokemon/Damages";
import { getType } from "../../utils/types";

const Type = () => {
  const { name } = useParams();
  const [type, setType] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTypeData = async () => {
      setIsLoading(true);
      try {
        const data = await getType(name);
        setType(data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTypeData();
  }, [name]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className="container py-4">
      <Header name={type.name} />
      <Damages types={[type.name]} />
    </div>
  );
};

export default Type;
