import { Link, NavLink } from "react-router-dom";
import { BarChart3, Plus } from "lucide-react";

export default function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <BarChart3 size={24} />
        <span>InstaWeb Labs Private Limited</span>
      </Link>
      <nav>
        <NavLink to="/" className="nav-link">
          Dashboard
        </NavLink>
        <NavLink to="/add" className="button button-primary">
          <Plus size={18} />
          Add Lead
        </NavLink>
      </nav>
    </header>
  );
}
