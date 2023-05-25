import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import moment from "moment/moment";
import NavBar from "./components/NavBar/NavBar";
import Cards from "./components/Cards";
import Detail from "./components/Detail";
import { hardcodedData } from "../modeloDeDatos.js";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  let search = "Mars";
  let page = "1";

  useEffect(() => {
    // hardcodedData.forEach((e) => {
    //   let formattedDate = moment(e.date_created).format("L");
    //   e.date_created = formattedDate;
    //   console.log(e);
    // });

    fetch(
      `https://images-api.nasa.gov/search?q=${search}&media_type=image,video&page_size=15&page=${page}`
    )
      .then((response) => response.json())
      .then(async (data) => {
        if (data.collection) {
          let promisifiedGetFiles = [];
          let fileData = [];

          data.collection.items.forEach((i, idx) => {
            let file = {
              title: i.data[0].title,
              description: i.data[0].description,
              media_type: i.data[0].media_type,
              thumbnail: i.links[0].href,
              nasa_id: i.data[0].nasa_id,
              date_created: moment(i.data[0].date_created).format("L"),
            };
            fileData.push(file);
            promisifiedGetFiles.push(
              fetch(`${i.href}`)
                .then((response) => response.json())
                .then((data) => {
                  fileData[idx].link = data.filter((link) =>
                    link.includes("large")
                  )[0];
                  if (fileData[idx].media_type === "video") {
                    fileData[idx].subtitle = data.filter((link) =>
                      link.includes(".vtt")
                    )[0];
                  }
                })
            );
          });
          await Promise.all(promisifiedGetFiles);

          setData(fileData);
          
        } else {
          window.alert("No hay media con ese ID");
        }
      });
  }, []);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Cards data={data} />} />
        <Route path="/detail/:nasa_id" element={<Detail />} />
      </Routes>
    </>
  );
}

export default App;
