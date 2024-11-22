import { useState, useEffect } from "react";
import TorrentVideoPlayer from "../components/TorrentVideoPlayer"; // Importando o componente de reprodução

// Tipagem dos dados do filme
interface Torrent {
  url: string;
  quality: string;
  type: string;
}

interface Movie {
  id: number;
  title: string;
  medium_cover_image: string;
  torrents: Torrent[];
}

const Filmes: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMagnet, setSelectedMagnet] = useState<string | null>(null);

  useEffect(() => {
    // Função para buscar dados da API
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "https://yts-am-torrent.p.rapidapi.com/list_movies.json",
          {
            method: "GET",
            headers: {
              "x-rapidapi-key": "f4fead3718msh451d2495b506880p125f14jsn0d9fdabce3d6",
              "x-rapidapi-host": "yts-am-torrent.p.rapidapi.com",
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setMovies(data.data.movies || []); // Atualiza o estado com os filmes
      } catch (error) {
        console.error("Erro ao buscar Filmes:", error);
      }
    };

    fetchMovies();
  }, []);

  // Função para lidar com o clique em um filme
  const handleMovieClick = (magnetLink: string) => {
    setSelectedMagnet(magnetLink); // Passa o magnet para o player
  };

  // Renderiza a lista de filmes
  return (
    <div>
      <h1>Lista de Filmes</h1>
      {selectedMagnet ? (
        <TorrentVideoPlayer magnetLink={selectedMagnet} />
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <div>
                <img
                  src={movie.medium_cover_image}
                  alt={movie.title}
                  style={{ width: "100px", height: "150px" }}
                />
                <h3>{movie.title}</h3>
                {movie.torrents[0] && (
                  <button onClick={() => handleMovieClick(movie.torrents[0].url)}>
                    Assistir
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Filmes;