import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginSignUp from "./components/LoginSignUp/LoginSignUp";
import Home from "./pages/Home/Home";
import Logout from "./components/Logout/Logout";
import CarHistory from "./pages/CarHistory/CarHistory";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./pages/Profile/Profile";
import EditUser from "./components/EditUser/EditUser";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginSignUp />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/:id/edit" element={<EditUser />} />
                <Route path="/vehicle-history/:registration" element={<CarHistory />} />
            </Routes>
        </Router>
    );
}

export default App;
