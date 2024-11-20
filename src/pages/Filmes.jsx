import React, { useEffect, useState } from "react";
import axios from "axios";
import TorrentVideoPlayer from "../components/TorrentVideoPlayer";

const Filmes = () => {
  const [movies, setMovies] = useState([]); // Lista de filmes
  const [selectedMovie, setSelectedMovie] = useState(null); // Filme selecionado

  // Busca os filmes na API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "https://917d239b-cf53-4bb4-9e8e-563356c5f6c0-00-1qntiyq2y1jsb.kirk.replit.dev/api/all/Movies"
        );
        // Certifica-se de que estamos lidando com o array correto dentro da resposta
        setMovies(response.data[0] || []); // A API parece retornar um array dentro de outro array
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div style={styles.container}>
      {selectedMovie ? (
        // Exibe o reprodutor de vídeo se um filme for selecionado
        <div>
          <button
            onClick={() => setSelectedMovie(null)}
            style={styles.backButton}
          >
            Voltar à lista
          </button>
          <TorrentVideoPlayer torrentLink={selectedMovie} />
        </div>
      ) : (
        // Exibe a lista de filmes
        <div style={styles.list}>
          <h1 style={styles.heading}>Lista de Filmes</h1>
          <ul style={styles.movieList}>
            {movies.map((movie, index) => (
              <li
                key={index}
                style={styles.movieItem}
                onClick={() => setSelectedMovie(movie.Magnet)}
              >
                <img
                  src={
                    movie.Poster ||
                    "https://via.placeholder.com/200x300?text=No+Image"
                  }
                  alt={movie.Name}
                  style={styles.poster}
                />
                <div style={styles.movieInfo}>
                  <h3 style={styles.title}>{movie.Name}</h3>
                  <p style={styles.language}>Idioma: {movie.Language}</p>
                  <p style={styles.size}>Tamanho: {movie.Size}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  },
  list: {
    margin: "0 auto",
    maxWidth: "800px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  movieList: {
    listStyle: "none",
    padding: 0,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },
  movieItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textAlign: "center",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    transition: "transform 0.2s",
  },
  poster: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
  },
  movieInfo: {
    padding: "10px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "10px 0 5px",
  },
  year: {
    fontSize: "14px",
    color: "#555",
  },
  size: {
    fontSize: "14px",
    color: "#555",
  },
  backButton: {
    display: "inline-block",
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "20px",
  },
};
export default Filmes;
