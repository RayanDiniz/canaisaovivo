import { useEffect, useState } from "react";
import WebTorrent from "webtorrent";
import { Player } from "react-video";

// Definição das props para o componente
interface TorrentVideoPlayerProps {
  torrentLink: string;
}

const TorrentVideoPlayer: React.FC<TorrentVideoPlayerProps> = ({ torrentLink }) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    const client = new WebTorrent();

    // Adiciona o torrent
    client.add(torrentLink, (torrent) => {
      // Localiza o primeiro arquivo de vídeo
      const file = torrent.files.find(
        (file) => file.name.endsWith(".mp4") || file.name.endsWith(".mkv")
      );

      if (file) {
        // Cria uma URL para o vídeo
        file.getBlobURL((err, url) => {
          if (err) {
            console.error("Erro ao carregar o vídeo:", err);
          } else {
            setVideoUrl(url);
          }
        });
      }
    });

    // Cleanup para evitar vazamentos de memória
    return () => {
      client.destroy();
    };
  }, [torrentLink]);

  return (
    <div>
      {videoUrl ? (
        <Player
          src={videoUrl}
          controls
          width="100%"
          height="auto"
          style={{ border: "1px solid #ddd", borderRadius: "8px" }}
        />
      ) : (
        <p>Carregando vídeo...</p>
      )}
    </div>
  );
};

export default TorrentVideoPlayer;