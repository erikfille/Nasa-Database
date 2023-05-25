import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Detail() {
  const [detailData, setDetailData] = useState({});

  const { nasa_id } = useParams();

  console.log(nasa_id);

  useEffect(() => {
    fetch(`https://images-api.nasa.gov/assets/${nasa_id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Data", data);
        setDetailData(data);
      });
  });

  return (
    <div>
      {/* <h3>{title}</h3>
      <h4>{description}</h4>
      <h5> Tipo de Archivo: {media_type}</h5>
      <img src={thumbnail} />
      {media_type === "video" ? (
        <video width="100%" height="auto" controls>
          <source src={link}></source>
        </video>
      ) : null} */}
    </div>
  );
}
