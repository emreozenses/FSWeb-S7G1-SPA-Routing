import React, { useState, useEffect } from "react";
import axios from "axios";
import { Switch, Route, Link } from "react-router-dom";

import Film from "./Filmler/Film";
import FilmListesi from "./Filmler/FilmListesi";
import KaydedilenlerListesi from "./Filmler/KaydedilenlerListesi";

export default function App() {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const FilmleriAl = () => {
      axios
        .get("http://localhost:5001/api/filmler") // Burayı Postman'le çalışın
        .then((response) => {
          console.log("filmler:", response.data);
          setMovieList(response.data);
          // Bu kısmı log statementlarıyla çalışın
          // ve burdan gelen response'u 'movieList' e aktarın
        })
        .catch((error) => {
          console.error("Sunucu Hatası", error);
        });
    };
    FilmleriAl();
  }, []);

  const kaydedilenlerListesineEkle = (movie) => {
    const film = saved.find((item) => item.id == movie.id);
    if (!film) {
      setSaved([...saved, movie]);
    }

    // Burası esnek. Aynı filmin birden fazla kez "saved" e eklenmesini engelleyin
  };

  return (
    <div>
      <KaydedilenlerListesi list={saved} />

      <div>
        <Switch>
          <Route exact path="/">
            <FilmListesi movies={movieList} />
          </Route>
          <Route exact path="/filmler/:id">
            <Film kaydedilenlerListesineEkle={kaydedilenlerListesineEkle} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
