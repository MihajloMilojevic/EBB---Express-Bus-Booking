import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Authors from "./pages/authors";
import Instructions from "./pages/instructions";
import NotFound from "./pages/404";
import CancelReservation from "./pages/cancelReservation";
import CreateBus from "./pages/createBus";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Home />} />
          <Route path="/instructions" exect element={<Instructions />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/bus" element={<CreateBus />} />
          <Route path="/cancel/:id" element={<CancelReservation />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
