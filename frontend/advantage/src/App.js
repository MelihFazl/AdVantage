import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/home-page";
import { LoginPage } from "./pages/login-page";
import { AboutUsPage } from "./pages/about-us-page";
import { FaqPage } from "./pages/faq-page";
import { SignUpPage } from "./pages/sign-up-page";
import { ForgotPasswordPage } from "./pages/forgot-password-page";
import { NoPage } from "./pages/no-page";
import { TeamMemberHomePage } from "./pages/team-member-pages/team-member-home";
import { TeamMemberTextualAnalysisPage } from "./pages/team-member-pages/team-member-textual-analysis";
import { TeamMemberImageAnalysisPage} from "./pages/team-member-pages/team-member-image-analysis";
import {DenemePage} from "./pages/deneme";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/deneme" element={<DenemePage />} />
        <Route
          path="/team-member"
          element={<TeamMemberHomePage></TeamMemberHomePage>}
        ></Route>
        <Route
          path="/team-member/text-analysis"
          element={
            <TeamMemberTextualAnalysisPage></TeamMemberTextualAnalysisPage>
          }
        ></Route>
        <Route
          path="/team-member/image-analysis"
          element={<TeamMemberImageAnalysisPage></TeamMemberImageAnalysisPage>}
        ></Route>
        <Route path="*" element={<NoPage />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
