import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import StartPage from "./pages/StartPage/StartPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/weather" element={<HomePage />} />
    </Routes>
  );
}

export default App;
