import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import TablePage from "../pages/TablePage";
import PdfPage from "../pages/PdfPage";
// import FormPage from "../pages/FormPage";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/table" element={<TablePage />} />
        <Route path="/pdf" element={<PdfPage />} />
        {/* <Route path="/form" element={<FormPage />} /> */}
      </Routes>
    </Router>
  );
}
