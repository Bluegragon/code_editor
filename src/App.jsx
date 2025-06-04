import { Routes, Route, Link } from "react-router-dom";
import Home from "./routes/home.jsx"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
      
      </Routes>
    </div>
  );
}

export default App;

