import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AllPlayers from './components/AllPlayers';
import SinglePlayer from './components/SinglePlayer';

const Navbar = () => (
  <nav>
    <Link to="/">To Home</Link>
    {/* Add more links as needed */}
  </nav>
);

// Remove the App component declaration
// const App = () => (
//   <BrowserRouter>
//     <Navbar />
//     <Routes>
//       <Route path="/" element={<AllPlayers />} />
//       <Route path="/player/:id" element={<SinglePlayer />} />
//     </Routes>
//   </BrowserRouter>
// );
