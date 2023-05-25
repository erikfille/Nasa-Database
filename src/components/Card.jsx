import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

export default function Card(props) {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.image}>
            <span className={styles.tag}>{props.media_type}</span>
            <img className={styles.image} src={props.thumbnail} />
          </div>
          <div className={styles.date}>
            <span>{props.date_created}</span>
          </div>
        </div>
        <div className={styles.info}>
          <Link to={`detail/${props.nasa_id}`} className="block">
            <span className={styles.title}>{props.title}</span>
          </Link>
          <p className={styles.description}>{props.description}</p>
        </div>
      </div>
    </div>

    // <div>
    //   <h3>{props.title}</h3>
    //   <h4>{props.description}</h4>
    //   <h5> Tipo de Archivo: {props.media_type}</h5>
    //   <img src={props.thumbnail} />
    //   {props.media_type === "video" ? (
    //     <video width="100%" height="auto" controls>
    //       <source src={props.link}></source>
    //     </video>
    //   ) : null}
    // </div>
  );
}
