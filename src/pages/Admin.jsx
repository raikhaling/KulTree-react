// Admin.jsx
import Navbar from "../components/Navbar";
import "./Admin.css";
import AdminPerson from "./AdminPerson";

function Admin() {
  return (
    <div className="admin-container">
      <Navbar />
      <h2>Admin Dashboard</h2>
      <AdminPerson></AdminPerson>
    </div>
  );
}

export default Admin;
