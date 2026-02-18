import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";


import NavBar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import Menu from "./pages/menu";
import Galeria from "./pages/galeria";
import Historia from "./pages/historia";
import Kontakt from "./pages/kontakt";


function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/historia" element={<Historia />} />
        <Route path="/kontakt" element={<Kontakt />} />
      </Routes>
      
      <Footer />
    </main>
  );
}

export default App;