import { useState } from 'react';
import tvaovivoLogo from '/tv-ao-vivo.svg';
import './App.css';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentChannel, setCurrentChannel] = useState(null);

  const channels = [
    {
      name: "Rede Globo",
      logo: "./assets/canais/globo.png",
      url: "https://reidoscanais.tv/embed/?id=globoma-tvmirantessaoluis"
    },
    {
      name: "SBT",
      logo: "./assets/canais/sbt.png",
      url: "https://reidoscanais.tv/embed/?id=sbt"
    },
    {
      name: "Band",
      logo: "./assets/canais/band.png",
      url: "https://reidoscanais.tv/embed/?id=band"
    },
    {
      name: "Record",
      logo: "./assets/canais/record.png",
      url: "https://reidoscanais.tv/embed/?id=record"
    },
    {
      name: "RedeTV",
      logo: "./assets/canais/redetv.png",
      url: "https://reidoscanais.tv/embed/?id=redetv"
    },
    {
      name: "TV Cultura",
      logo: "./assets/canais/tvcultura.png",
      url: "https://reidoscanais.tv/embed/?id=tvcultura"
    },
    {
      name: "TV Brasil",
      logo: "./assets/canais/tvbrasil.png",
      url: "https://reidoscanais.tv/embed/?id=tvbrasil"
    },
    {
      name: "Globo News",
      logo: "./assets/canais/globonews.png",
      url: "https://reidoscanais.tv/embed/?id=globonews"
    },
    {
      name: "CNN BR",
      logo: "./assets/canais/cnnbr.png",
      url: "https://reidoscanais.tv/embed/?id=cnnbr"
    },
    {
      name: "Band News",
      logo: "./assets/canais/bandnews.png",
      url: "https://reidoscanais.tv/embed/?id=bandnews"
    },
    {
      name: "ESPN",
      logo: "./assets/canais/espn.png",
      url: "https://reidoscanais.tv/embed/?id=espn"
    },
    {
      name: "SporTV",
      logo: "./assets/canais/sportv.png",
      url: "https://reidoscanais.tv/embed/?id=sportv"
    },
    {
      name: "SporTV 2",
      logo: "./assets/canais/sportv.png",
      url: "https://reidoscanais.tv/embed/?id=sportv2"
    },
    {
      name: "SporTV 3",
      logo: "./assets/canais/sportv.png",
      url: "https://reidoscanais.tv/embed/?id=sportv3"
    },
    {
      name: "SporTV 4",
      logo: "./assets/canais/sportv.png",
      url: "https://reidoscanais.tv/embed/?id=sportv4"
    },
    {
      name: "Premiere Clubes",
      logo: "./assets/canais/premiere.png",
      url: "https://reidoscanais.tv/embed/?id=premiereclubes"
    },
    {
      name: "Premiere 2",
      logo: "./assets/canais/premiere.png",
      url: "https://reidoscanais.tv/embed/?id=premiere2"
    },
    {
      name: "Premiere 3",
      logo: "./assets/canais/premiere.png",
      url: "https://reidoscanais.tv/embed/?id=premiere3"
    },
    {
      name: "Premiere 4",
      logo: "./assets/canais/premiere.png",
      url: "https://reidoscanais.tv/embed/?id=premiere4"
    },
    {
      name: "Premiere 5",
      logo: "./assets/canais/premiere.png",
      url: "https://reidoscanais.tv/embed/?id=premiere5"
    }
  ];
  
  

  const openModal = (channel) => {
    setCurrentChannel(channel);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setCurrentChannel(null);
  };

  return (
    <>
      <div>
        <a href="/" target="">
          <img src={tvaovivoLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h2>Lista de Canais Ao Vivo:</h2>
      <div className="card-container">
        {channels.map((channel, index) => (
          <div className="card" key={index}>
            <img src={channel.logo} alt={channel.name} />
            <h2>{channel.name}</h2>
            <button onClick={() => openModal(channel)}>Assistir</button>
          </div>
        ))}
      </div>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-head">
              <h2>{currentChannel.name}</h2>
              <span className="close" onClick={closeModal}>&times;</span>
            </div>
            <iframe src={currentChannel.url} allowFullScreen></iframe>
          </div>
        </div>
      )}
    </>
  );
}

export default App;

