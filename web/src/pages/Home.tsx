import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Link to="/" >Home</Link>
      <Link to="/filmes" >Filmes</Link>
      <Link to="/aovivo">Ao Vivo</Link>
      <Link to="/flix">Peer Flix</Link>
    </div>
  )
}

export default Home