import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./pages/register/index.jsx";
import Login from "./pages/login/index.jsx";
import Header from "./components/header/index.jsx";

function App() {
  return (
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App