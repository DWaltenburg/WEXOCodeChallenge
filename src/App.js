import './App.css';
import { Routes, Route} from "react-router-dom";
import Genre from "./routes/Genre";
import Home from "./routes/Home";
import MyNavbar from './Navbar';
function App() {
  return (
    <>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genre" element={<Genre />} />
      </Routes>
    </>
  );
}
export default App;