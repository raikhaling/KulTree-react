import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">Khaling Kul Tree</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/tree">Tree</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/tree-interactive">Tree-interactive</Link>
      </div>
    </nav>
  );
}

export default Navbar;
