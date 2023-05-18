import React from "react";
import Card from "./Card";

export default function Cards(props) {
  const {data} = props

  return (
    <div>
      {data &&
        data.map((item, idx) => {
          return <Card
            title={item.title}
            description={item.description}
            media_type={item.media_type}
            nasa_id={item.nasa_id}
            link={item.link}
            thumbnail={item.thumbnail}
            date_created={item.date_created}
            key={idx}
          />;
        })}
    </div>
  );
}
