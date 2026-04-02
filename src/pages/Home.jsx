import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <Navbar />

      <section className="hero">
        <h1>Khaling Lineage System</h1>
        <p>Manage and visualize family relationships using API-driven data.</p>
        <div className="hero-buttons">
          <Link to="/tree" className="btn btn-blue">
            View Tree
          </Link>
          <Link to="/admin" className="btn btn-green">
            Admin Panel
          </Link>
        </div>
      </section>

      <section className="about">
        <h2>About</h2>
        <p>
          This app is built with React frontend and Spring Boot backend APIs to
          manage and visualize family relationships.
        </p>
      </section>

      <section className="features">
        <div className="feature">
          <h3>👤 Manage Persons</h3>
          <p>Add, update, and delete family members.</p>
        </div>
        <div className="feature">
          <h3>🌳 Tree Visualization</h3>
          <p>View relationships in tree format.</p>
        </div>
        <div className="feature">
          <h3>🔗 API Driven</h3>
          <p>Connected to backend REST APIs.</p>
        </div>
      </section>

      <footer>
        <p>© 2026 KhalingTree App</p>
        <p>Contact: rainabinkhyal@email.com</p>
      </footer>
    </div>
  );
}

export default Home;
