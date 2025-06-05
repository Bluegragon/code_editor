import { Routes, Route, Link } from "react-router-dom";
import Home from "./routes/home.jsx";
import { UIStateProvider } from "./providers/EditorProvider.jsx";

function App() {
  return (
    <div>
      <UIStateProvider>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </UIStateProvider>
    </div>
  );
}

export default App;
