import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { store } from './store';
import SinglePlayer from './Components/SinglePlayer';
import PlayerList from './Components/PlayerList';
import './App.css';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <nav>
        <Link to="/" className="nav-link">Home</Link>
      </nav>
      <Routes>
        <Route path="/" element={<PlayerList />} /> 
        <Route path="/player/:id" element={<SinglePlayer />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default App;
