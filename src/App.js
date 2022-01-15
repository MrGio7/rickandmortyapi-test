import { Route, Routes } from "react-router-dom";
import { Characters, Character, Search, Navigation, Liked } from "./components";
import "./styles/app.scss";

function App() {
  return (
    <>
      <header>
        <Search />
        <Navigation />
      </header>
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/character/:characterId" element={<Character />} />
        <Route path="/liked" element={<Liked />} />
      </Routes>
    </>
  );
}

export default App;
