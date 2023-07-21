import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./pages/register/index.jsx";
import Login from "./pages/login/index.jsx";
import Header from "./components/header/index.jsx";
import Home from "./pages/home";
import CreateCollection from "./pages/createCollection";
import InnerCollection from "./components/innerColection";

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Home/>} />
                <Route path="/create-collection" element={<CreateCollection />} />
                <Route path="/collection/:id" component={InnerCollection} />
            </Routes>
        </BrowserRouter>
    )
}

export default App