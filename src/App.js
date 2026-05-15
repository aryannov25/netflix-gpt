import "./App.css";
import Body from "./components/Body";
import Toast from "./components/Toast";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <Body />
      <Toast />
    </AppProvider>
  );
}

export default App;
