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
import { TeamMemberImageAnalysisPage } from "./pages/team-member-pages/team-member-image-analysis";
import { CompanyManageTeams } from "./pages/company-pages/company-manage-teams";
import { CompanySubscription } from "./pages/company-pages/company-subscription";
import { PricingPage } from "./pages/pricing-page";
import { ForbiddenPage } from "./pages/forbidden-page";
import { ExpiredPage } from "./pages/expired-page";
import { MemberSettingsPage } from "./pages/team-member-pages/settings-page";
import { AdminSettingsPage } from "./pages/company-pages/settings-page";
import ReserPasswordPage from "./pages/reset-password";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/team-member"
          element={<TeamMemberHomePage></TeamMemberHomePage>}
        ></Route>
        <Route
          path="/company/manageTeams"
          element={<CompanyManageTeams></CompanyManageTeams>}
        ></Route>
        <Route
          path="/company/subscription"
          element={<CompanySubscription></CompanySubscription>}
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
        <Route
          path="/team-member/settings"
          element={<MemberSettingsPage></MemberSettingsPage>}
        ></Route>
        <Route
          path="/company/settings"
          element={<AdminSettingsPage></AdminSettingsPage>}
        ></Route>
        <Route
          path="/forbidden"
          element={<ForbiddenPage></ForbiddenPage>}
        ></Route>
        <Route
          path="/session-expired"
          element={<ExpiredPage></ExpiredPage>}
        ></Route>
        <Route
          path="/reset-password"
          element={<ReserPasswordPage></ReserPasswordPage>}
        ></Route>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
