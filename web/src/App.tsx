import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
//import Filmes from './pages/Filmes'
import Aovivo from './pages/Aovivo'
import Flix from './pages/Flix';
import Home from './pages/Home';
import Filmes from './pages/Filmes';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filmes" element={<Filmes />} />
        <Route path="/aovivo" element={<Aovivo />} />
        <Route path="/flix" element={<Flix />} />
      </Routes>
    </Router>
  );
}

export default App;
