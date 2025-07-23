import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SplashPage from "./SplashPage";
import LandingPage from "./LandingPage";
import MapView from "./MapView";
import Header from "./Header";

function App() {
  return (
    <Router>
       <Header /> 
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/map" element={<MapView />} />
      </Routes>
    </Router>
  );
}

export default App;

