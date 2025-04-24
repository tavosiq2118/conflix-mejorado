// src/api/wordpress.js
export async function fetchWordpressMovies() {
  const res = await fetch("https://tusitio.com/wp-json/wp/v2/pelicula?per_page=10");
  const data = await res.json();

  return data.map((post) => ({
    id: post.id,
    title: post.title.rendered,
    sinopsis: post.acf?.sinopsis,
    trailer: post.acf?.trailer_url,
    poster: post.acf?.poster_url,
    backdrop: post.acf?.backdrop_url,
    clasificacion: post.acf?.clasificacion,
  }));
}
