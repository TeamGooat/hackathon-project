import { BrowserRouter, Route, Routes } from "react-router-dom";
import CollabPage from "./pages/CollabPage";
import ForumPage from "./pages/ForumPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forum" element={<ForumPage />} />
                <Route path="/collab" element={<CollabPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
