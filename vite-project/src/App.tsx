import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainPage from "./pages/MainPage";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./layouts/ProtectedRoute";
// import ResetPassword from "./pages/Temp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/main"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/reset-password/:token" element={<ResetPassword />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
