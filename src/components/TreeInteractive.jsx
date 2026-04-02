import { useEffect, useState } from "react";
import Tree from "rc-tree";
import "rc-tree/assets/index.css";
import Navbar from "../components/Navbar";
import { getTreeById } from "../services/treeService";

function TreeInteractive() {
  const [treeData, setTreeData] = useState([]);
  const [rootId, setRootId] = useState(1);
  const [inputId, setInputId] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔁 Convert your backend tree → rc-tree format
  const convertToRcTree = (node) => {
    if (!node) return null;

    return {
      key: node.id,
      title: `${node.fullName} (${node.gender}) - ${node.location}`,
      children: node.children?.map(convertToRcTree) || [],
    };
  };

  const fetchTree = async (id) => {
    setLoading(true);
    try {
      const data = await getTreeById(id);
      const formatted = convertToRcTree(data);
      setTreeData(formatted ? [formatted] : []);
    } catch (error) {
      console.error("Failed to fetch tree:", error);
      setTreeData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTree(rootId);
  }, [rootId]);

  const handleSearch = () => {
    if (inputId && !isNaN(inputId)) {
      setRootId(Number(inputId));
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Navbar />
      <h2>Interactive Family Tree</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="number"
          placeholder="Enter root ID"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading ? (
        <p>Loading tree...</p>
      ) : (
        <Tree treeData={treeData} defaultExpandAll showLine selectable />
      )}
    </div>
  );
}

export default TreeInteractive;
