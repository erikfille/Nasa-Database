import { useState, useEffect } from "react";
import moment from "moment/moment";
import Cards from "./components/Cards";
import { hardcodedData } from "../modeloDeDatos.js";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    hardcodedData.forEach((e) => {
      let formattedDate = moment(e.date_created).format("L");
      e.date_created = formattedDate;
      console.log(e);
    });
    setData(hardcodedData);
  }, []);

  return (
    <>
      <Cards data={data} />
    </>
  );
}

export default App;
