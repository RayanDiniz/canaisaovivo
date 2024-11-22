import React, { useState, useEffect } from "react";

interface Movie {
  id: number;
  title: string;
  torrents: { url: string }[];
}

const Flix: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentMagnet, setCurrentMagnet] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:3001/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);


  const convertToMagnetURI = (link: string): string | null => {
    try {
      const torrentHash = link.split('/').pop(); // Obtém o hash do torrent do link

      if (!torrentHash || torrentHash.length !== 40) {
        throw new Error('Hash inválido no link de torrent.');
      }

      let magnet = `magnet:?xt=urn:btih:${torrentHash}`;
   
      return magnet;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  };

  const handlePlay = (link: string) => {
    let magnet = convertToMagnetURI(link)
    setCurrentMagnet(`http://localhost:3001/stream?magnet=${encodeURIComponent(magnet)}`);
  };

  return (
    <div>
      <h1>Filmes</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            {movie.title} - <button onClick={() => handlePlay(movie.torrents[0].url)}>Assistir</button>
          </li>
        ))}
      </ul>
      {currentMagnet && (
        <video controls autoPlay style={{ width: "100%" }}>
          <source src={currentMagnet} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default Flix;