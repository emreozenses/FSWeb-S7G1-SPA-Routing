import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function KaydedilenlerListesi(props) {
  return (
    <div className="saved-list">
      <h3>Kaydedilen Filmler:</h3>

      {props.list.map((movie) => (
        <Link to={"/filmler/" + movie.id}>
          <span className="saved-movie">{movie.title}</span>
        </Link>
      ))}

      <NavLink
        exact
        to="/"
        className={(isActive) => (isActive ? "hide" : null)}
      >
        <button className="home-button">Anasayfa</button>
      </NavLink>
    </div>
  );
}
