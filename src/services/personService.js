// services/personService.js
import API from "./api";

export const getAllPersons = async () => {
  const response = await API.get("/admin/person");
  return response.data.data; // because your ApiResponse wraps data
};

export const getPerson = async (id) => {
  const response = await API.get(`/admin/person/${id}`);
  return response.data.data;
};

export const createPerson = async (person) => {
  const response = await API.post("/admin/person", person);
  return response.data.data;
};

export const updatePerson = async (id, person) => {
  const response = await API.put(`/admin/person/${id}`, person);
  return response.data.data;
};

export const deletePerson = async (id) => {
  const response = await API.delete(`/admin/person/${id}`);
  return response.data.message; // No data returned
};
