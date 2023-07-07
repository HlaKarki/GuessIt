import './App.css';
import LandingPage from "./pages/landing/landingPage";
import GameplayPage from "./pages/gameplay/gameplayPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<LandingPage />}></Route>
              <Route path="/play" element={<GameplayPage />}></Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
