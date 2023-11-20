import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginSignUp from "./components/LoginSignUp/LoginSignUp";
import UserCard from "./components/UserCard/UserCard";
import Home from "./pages/Home/Home";
import Logout from "./components/Logout/Logout";
import Navigation from "./components/Navbar/Navbar";
import CarHistory from "./pages/CarHistory/CarHistory";

function App() {
    return (
        <Router>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginSignUp />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/profile" element={<UserCard />} />
                <Route path="/vehicle-history/:registration" element={<CarHistory />} />
            </Routes>
        </Router>
    );
}

export default App;
