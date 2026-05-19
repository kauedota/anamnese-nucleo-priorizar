import Anamnese from "./pages/Anamnese";
import Admin from "./pages/Admin";
import "./index.css";

function App() {
  const rotaAtual = window.location.pathname;

  if (rotaAtual === "/admin") {
    return <Admin />;
  }

  return <Anamnese />;
}

export default App;