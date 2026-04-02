import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getTreeById } from "../services/treeService";
import TreeNodeComponent from "./TreeNodeComponent"; // the recursive component
import "./Tree.css";

function Tree() {
  const [tree, setTree] = useState(null);
  const [rootId, setRootId] = useState(1); // default root ID
  const [inputId, setInputId] = useState(""); // for user input
  const [loading, setLoading] = useState(false);

  const fetchTree = async (id) => {
    setLoading(true);
    try {
      const data = await getTreeById(id);
      setTree(data);
    } catch (error) {
      console.error("Failed to fetch tree:", error);
      setTree(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch tree when rootId changes
  useEffect(() => {
    fetchTree(rootId);
  }, [rootId]);

  const handleSearch = () => {
    if (inputId && !isNaN(inputId)) {
      setRootId(Number(inputId));
    }
  };

  return (
    <div className="tree-container">
      <Navbar />
      <h2 className="tree-title">Family Tree</h2>

      <div className="tree-search">
        <input
          type="number"
          placeholder="Enter root ID"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading ? (
        <p className="tree-info">Loading tree...</p>
      ) : tree ? (
        <ul className="tree-root">
          <TreeNodeComponent node={tree} />
        </ul>
      ) : (
        <p className="tree-info">No tree found for this ID.</p>
      )}
    </div>
  );
}

export default Tree;
