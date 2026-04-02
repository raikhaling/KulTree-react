import API from "./api"; // your axios instance

// Fetch tree by root ID
export const getTreeById = async (rootId) => {
  try {
    const response = await API.get(`/tree/${rootId}`);
    return response.data.data; // the TreeNode object
  } catch (error) {
    console.error("Error fetching tree:", error);
    return null;
  }
};
