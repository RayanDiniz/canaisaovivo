const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { spawn } = require("child_process");
const path = require("path");

const app = express();
const PORT = 3001;

// Configuração de middlewares
app.use(cors());
app.use(express.json());

// Configuração da API do YTS
const YTS_API_URL = "https://yts-am-torrent.p.rapidapi.com/list_movies.json";
const RAPIDAPI_KEY = "f4fead3718msh451d2495b506880p125f14jsn0d9fdabce3d6";

// Rota para buscar filmes
app.get("/movies", async (req, res) => {
  try {
    const { query, genre, limit = 50, page = 1 } = req.query;
    const response = await axios.get(YTS_API_URL, {
      headers: {
        "x-rapidapi-host": "yts-am-torrent.p.rapidapi.com",
        "x-rapidapi-key": RAPIDAPI_KEY,
      },
      params: {
        query_term: query || "",
        genre: genre || "",
        limit,
        page,
      },
    });

    const movies = response.data.data.movies || [];
    res.json(movies);
  } catch (error) {
    console.error("Erro ao buscar filmes:", error.message);
    res.status(500).json({ error: "Erro ao buscar filmes" });
  }
});

// Rota para stream de torrent
app.get("/stream", (req, res) => {
  const { magnet } = req.query;

  if (!magnet) {
    return res.status(400).json({ error: "Magnet link é obrigatório" });
  }

  // Inicia o Peerflix
  const engine = spawn("peerflix", ["--webplay", magnet]);

  engine.stdout.on("data", (data) => {
    console.log(`[Peerflix]: ${data}`);
  });

  engine.stderr.on("data", (data) => {
    console.error(`[Peerflix Error]: ${data}`);
  });

  engine.on("close", (code) => {
    console.log(`Peerflix encerrado com código ${code}`);
  });

  // Encaminha o stream para o cliente
  res.setHeader("Content-Type", "video/mp4");
  engine.stdout.pipe(res);
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
