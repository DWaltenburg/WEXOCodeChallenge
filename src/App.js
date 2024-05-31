import './App.css';
import { Routes, Route} from "react-router-dom";
import Genre from "./routes/Genre";
import Home from "./routes/Home";
import Navbar from './Navbar';
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genre" element={<Genre />} />
      </Routes>
    </>
  );
}
export default App;