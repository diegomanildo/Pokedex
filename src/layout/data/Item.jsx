import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItem } from "../../utils/items";
import Loading from "../../common/Loading";
import Error from "../../common/Error";
import Header from "./Items/Header";
import Description from "./Items/Description";

const Item = () => {
  const { name } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItemData = async () => {
      setIsLoading(true);
      try {
        const data = await getItem(name);
        setItem(data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItemData();
  }, [name]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div>
      <Header item={item} />

      <div className="card p-4 mt-3 w-100 text-center shadow">
        <header className="d-flex flex-column align-items-center">
          <img
            src={item.sprites.default}
            alt={`${item.name} sprite`}
            width="150px"
          />
        </header>
      </div>
      <Description item={item} />
    </div>
  );
};

export default Item;
