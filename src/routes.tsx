import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPassword from "./pages/ResetPasswordPage";
import DashboardPage from "./pages/DashboardPage";
import UsersPage from "./pages/UsersPage";
import ProfileEditPage from "./pages/EditProfilePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/users/edit/:id" element={<ProfileEditPage/>} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;
