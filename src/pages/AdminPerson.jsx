// AdminPerson.jsx
import { useEffect, useState } from "react";
import {
  getAllPersons,
  createPerson,
  updatePerson,
  deletePerson,
} from "../services/personService";
import "./AdminPerson.css"; // Make sure this file exists

function AdminPerson() {
  const [persons, setPersons] = useState([]);
  const [form, setForm] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "MALE",
    location: "",
    personalInfo: "",
    fatheId: "",
    motherId: "",
    imageUrl: "",
  });

  const [editingId, setEditingId] = useState(null);

  // Fetch all persons
  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = async () => {
    const data = await getAllPersons();
    setPersons(data);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle form submit for create/update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updatePerson(editingId, form);
      } else {
        await createPerson(form);
      }
      setForm({
        fullName: "",
        dateOfBirth: "",
        gender: "MALE",
        location: "",
        personalInfo: "",
        fatheId: "",
        motherId: "",
        imageUrl: "",
      });
      setEditingId(null);
      fetchPersons();
    } catch (err) {
      console.error("Error saving person:", err);
      alert("Something went wrong!");
    }
  };

  const handleEdit = (person) => {
    setForm({
      fullName: person.fullName || "",
      dateOfBirth: person.dateOfBirth || "",
      gender: person.gender || "MALE",
      location: person.location || "",
      personalInfo: person.personalInfo || "",
      fatheId: person.fatheId || "",
      motherId: person.motherId || "",
      imageUrl: person.imageUrl || "",
    });
    setEditingId(person.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      await deletePerson(id);
      fetchPersons();
    }
  };

  return (
    <div className="admin-person-container">
      <h2>Person Management</h2>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dateOfBirth"
          value={form.dateOfBirth}
          onChange={handleChange}
          required
        />
        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
        />
        <input
          type="text"
          name="personalInfo"
          placeholder="Personal Info"
          value={form.personalInfo}
          onChange={handleChange}
        />
        <input
          type="number"
          name="fatheId"
          placeholder="Father ID"
          value={form.fatheId}
          onChange={handleChange}
        />
        <input
          type="number"
          name="motherId"
          placeholder="Mother ID"
          value={form.motherId}
          onChange={handleChange}
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={handleChange}
        />
        <button type="submit">{editingId ? "Update" : "Create"}</button>
      </form>

      {/* Person list */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((person) => (
            <tr key={person.id}>
              <td>{person.id}</td>
              <td>{person.fullName}</td>
              <td>{person.dateOfBirth}</td>
              <td>{person.gender}</td>
              <td>{person.location}</td>
              <td>
                <button onClick={() => handleEdit(person)}>Edit</button>
                <button onClick={() => handleDelete(person.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPerson;
