import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginSignUp from "./components/LoginSignUp/LoginSignUp";
import Home from "./pages/Home/Home";
import Logout from "./components/Logout/Logout";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./pages/Profile/Profile";
import EditUser from "./components/EditUser/EditUser";
import RegisterOwnership from "./pages/RegisterOwnership/RegisterOwnership";

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
                <Route path="/register-ownership/:registration" element={<RegisterOwnership />} />
            </Routes>
        </Router>
    );
}

export default App;
