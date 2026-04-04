import { useState, useEffect } from "react";

function PersonModal({ isOpen, onClose, onSubmit, initialData, persons }) {
  const [form, setForm] = useState({
    fullName: "",
    nickName: "",
    dateOfBirth: "",
    gender: "MALE",
    location: "",
    personalInfo: "",
    fatherId: "",
    motherId: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{initialData ? "Update Person" : "Add Person"}</h3>

        <form onSubmit={handleSubmit}>
          <input
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            required
          />
          <input
            name="nickName"
            placeholder="Nickname"
            value={form.nickName}
            onChange={handleChange}
          />
          <input
            type="date"
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={handleChange}
          />

          <select name="gender" value={form.gender} onChange={handleChange}>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>

          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
          />
          <input
            name="personalInfo"
            placeholder="Personal Info"
            value={form.personalInfo}
            onChange={handleChange}
          />

          {/* Father Dropdown */}
          <select name="fatherId" value={form.fatherId} onChange={handleChange}>
            <option value="">Select Father</option>
            {persons.map((p) => (
              <option key={p.id} value={p.id}>
                {p.fullName} ({p.dateOfBirth})
              </option>
            ))}
          </select>

          {/* Mother Dropdown */}
          <select name="motherId" value={form.motherId} onChange={handleChange}>
            <option value="">Select Mother</option>
            {persons.map((p) => (
              <option key={p.id} value={p.id}>
                {p.fullName} ({p.dateOfBirth})
              </option>
            ))}
          </select>

          <input
            name="imageUrl"
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={handleChange}
          />

          {/* Image Preview */}
          {form.imageUrl && (
            <img src={form.imageUrl} alt="preview" className="preview-img" />
          )}

          <div className="modal-actions">
            <button type="submit">Save</button>
            <button type="button" className="cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PersonModal;
