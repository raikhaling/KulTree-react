import { useEffect, useState } from "react";
import {
  getAllPersons,
  createPerson,
  updatePerson,
  deletePerson,
} from "../../services/personService";
import PersonModal from "./PersonModal";
import "./AdminPerson.css";

function AdminPerson() {
  const [persons, setPersons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = async () => {
    const data = await getAllPersons();
    setPersons(data);
  };

  const handleSubmit = async (form) => {
    if (editingPerson) {
      await updatePerson(editingPerson.id, form);
    } else {
      await createPerson(form);
    }
    setIsModalOpen(false);
    setEditingPerson(null);
    fetchPersons();
  };

  const handleEdit = (person) => {
    setEditingPerson(person);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this person?")) {
      await deletePerson(id);
      fetchPersons();
    }
  };
  const filteredPersons = persons.filter((p) => {
    const matchesSearch =
      p.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.nickName?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGender = genderFilter === "" || p.gender === genderFilter;

    const matchesLocation =
      locationFilter === "" ||
      p.location?.toLowerCase().includes(locationFilter.toLowerCase());

    return matchesSearch && matchesGender && matchesLocation;
  });

  return (
    <div className="admin-person-container">
      <div className="header">
        <h2>Person Management</h2>
        <button
          className="add-btn"
          onClick={() => {
            setEditingPerson(null);
            setIsModalOpen(true);
          }}
        >
          + Add Person
        </button>
      </div>
      <div className="filters">
        <input
          type="text"
          placeholder="🔍 Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
        >
          <option value="">All Genders</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>

        <input
          type="text"
          placeholder="📍 Filter by location"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        />

        <button
          className="clear-btn"
          onClick={() => {
            setSearchTerm("");
            setGenderFilter("");
            setLocationFilter("");
          }}
        >
          Clear
        </button>
      </div>

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Nickname</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredPersons.map((p) => (
              <tr key={p.id}>
                <td>{p.fullName}</td>
                <td>{p.nickName}</td>
                <td>{p.dateOfBirth}</td>
                <td>{p.gender}</td>
                <td>{p.location}</td>
                <td>
                  <button onClick={() => handleEdit(p)}>Edit</button>
                  <button onClick={() => handleDelete(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <PersonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingPerson}
        persons={persons}
      />
    </div>
  );
}

export default AdminPerson;
