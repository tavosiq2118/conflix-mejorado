// src/components/HeroWP.jsx
import { useEffect, useState } from "react";
import { fetchWordpressMovies } from "../api/wordpress";

export default function HeroWP() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchWordpressMovies().then((data) => {
      setMovie(data[0]); // mostrar la primera película del listado
    });
  }, []);

  if (!movie) return <div className="text-white">Cargando película destacada...</div>;

  return (
    <div className="relative h-screen w-full overflow-hidden text-white bg-black">
      <video
        className="absolute w-full h-full object-cover"
        src={movie.trailer}
        autoPlay
        loop
        muted
      />
      <div className="relative z-10 p-8 max-w-2xl mt-24">
        <h1 className="text-4xl font-bold">{movie.title}</h1>
        <p className="mt-4 text-lg">{movie.sinopsis}</p>
        <p className="mt-2 font-semibold">Clasificación: {movie.clasificacion}</p>
        <div className="mt-4 flex gap-4">
          <a href={`/pelicula/${movie.id}`} className="bg-red-600 px-4 py-2 rounded">
            ▶ Ver ahora
          </a>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-0" />
    </div>
  );
}
