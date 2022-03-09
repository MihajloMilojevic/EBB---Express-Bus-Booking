import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Authors from "./pages/authors";
import Instructions from "./pages/instructions";
import NotFound from "./pages/404";
import Nav from "./components/nav";

function App() {
  return (
    <BrowserRouter>
      <Nav/>
      <Routes>
          <Route index element={<Home />} />
          <Route path="/instructions" exect element={<Instructions />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
