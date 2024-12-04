import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './store';
import SinglePlayer from './Components/SinglePlayer';
import PlayerList from './Components/PlayerList';
import './App.css';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PlayerList />} /> 
        <Route path="/player/:id" element={<SinglePlayer />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default App;
