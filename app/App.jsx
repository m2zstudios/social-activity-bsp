import { BrowserRouter } from "react-router-dom";
import RoutesConfig from "./routes";
import { SettingsProvider } from "../Context/SettingsContext";

function App() {
  return (
    <SettingsProvider>
      <BrowserRouter>
        <RoutesConfig />
      </BrowserRouter>
    </SettingsProvider>
  );
}

export default App;
