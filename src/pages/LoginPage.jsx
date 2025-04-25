import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { login } from "../services/authService";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (username, password) => {
    if (login(username, password)) {
      navigate("/table");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <LoginForm onLogin={handleLogin} />
    </div>
  );
}
