import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import LoginSignUp from "./components/LoginSignUp/LoginSignUp";
import UserCard from "./components/UserCard/UserCard";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/Login" element={<LoginSignUp/>} />
                <Route path="/" element={<UserCard />} />
            </Routes>
        </Router>
    );
}

export default App;
