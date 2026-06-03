import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddLead from "./pages/AddLead.jsx";
import EditLead from "./pages/EditLead.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="page-shell">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddLead />} />
          <Route path="/edit/:id" element={<EditLead />} />
        </Routes>
      </main>
    </>
  );
}
