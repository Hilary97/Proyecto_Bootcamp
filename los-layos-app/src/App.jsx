import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext.jsx";
import { Particulas } from "./components/Particulas.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { AdminPage } from "./pages/AdminPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Particulas />
        <div className="relative z-10 min-h-screen text-ivory font-sans">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
