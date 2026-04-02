// TreeNodeComponent.jsx
function TreeNodeComponent({ node }) {
  return (
    <li>
      <div className="tree-node">
        <strong>{node.fullName}</strong> ({node.gender}) - {node.location}
      </div>
      {node.children && node.children.length > 0 && (
        <ul>
          {node.children.map((child) => (
            <TreeNodeComponent key={child.id} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default TreeNodeComponent;
