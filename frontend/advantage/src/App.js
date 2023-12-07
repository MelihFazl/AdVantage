import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/home-page";
import { LoginPage } from "./pages/login-page";
import { AboutUsPage } from "./pages/about-us-page";
import { FaqPage } from "./pages/faq-page";
import { SignUpPage } from "./pages/sign-up-page";
import { NoPage } from "./pages/no-page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
