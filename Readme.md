# NASA Api Database

## ¿Como buscar la info?

```javascript
// Hace el fetch, buscando segun sea la query, trayendo solo imagen y video. Trae 10 elementos por pagina y se le puede indicar el numero de pagina para que haga un paginado desde el back
fetch(
  `https://images-api.nasa.gov/search?q=${search}&media_type=image,video&page_size=5&page=${page}`
)
  .then((response) => response.json()) // Parsea la respuesta a JSON
  .then(async (data) => {
    // Si trae una respuesta
    if (data.collection) {
      let promisifiedGetFiles = [];
      let fileData = [];

      // Para cada elemento de la respuesta:
      data.collection.items.forEach((i, idx) => {
        // Crea un objeto file con la info básica
        let file = {
          title: i.data[0].title,
          description: i.data[0].description,
          media_type: i.data[0].media_type,
          nasa_id: i.data[0].nasa_id,
          date_created: moment(i.data[0].date_created).format("L"),
        };
        // Y lo pushea al array de archivos
        fileData.push(file);

        // Tambien pushea una promesa al array de archivos promisificados. Esto se hace para luego poder usar el Promise.all y resolver todas las promesas en paralelo
        promisifiedGetFiles.push(
          // Busca la info que tiene en la propiedad href, que trae un array de links
          fetch(`${i.href}`)
            .then((response) => response.json())
            .then((data) => {
              // Cuando trae el array, busca el indice que contiene la media en el tamaño grande, y toma el primer y unico valor, para convertirlo de array a cadena de texto
              fileData[idx].link = data.filter((link) =>
                link.includes("large")
              )[0];
              // Y luego va a buscar el subtitulo, en caso de que sea un archivo de video
              if (fileData[idx].media_type === "video") {
                fileData[idx].subtitle = data.filter((link) =>
                  link.includes(".vtt")
                )[0];
              }
            })
        );
      });

      // Finalmente, como las promesas no se ejecutan por si solas, ejecutamos todas las promesas que guardamos en el objeto promisifiedGetFiles de una unica vez y en paralelo (en lugar de hacerlo de manera secuencial, lo que nos llevaria demasiado tiempo resolver, ya que son varias promesas encadenadas)
      await Promise.all(promisifiedGetFiles);

      // Luego seteamos el estado con la info que trajimos

      /*
            Codigo para setear el estado
          */
    } else {
      window.alert("No hay media con ese ID");
    }
  });
```

## ¿Como renderizamos la Info?

````javascript
      <video width="100%" height="auto" controls>
        <source src="http://images-assets.nasa.gov/video/JPL-20190606-TECHf-0001-Mars Chopper Ready for a Spin on Mars/JPL-20190606-TECHf-0001-Mars Chopper Ready for a Spin on Mars~orig.mp4"></source>
        <track
          src="http://images-assets.nasa.gov/video/JPL-20190606-TECHf-0001-Mars Chopper Ready for a Spin on Mars/JPL-20190606-TECHf-0001-Mars Chopper Ready for a Spin on Mars.vtt"
          kind="subtitles"
          srcLang="en"
          label="Original"
        ></track>
      </video>
      ```
````

## Dependencias utilizadas, ademas de las implementadas por Vite

- Moment.js: Se utiliza para formatear fechas

```
npm i moment
```
