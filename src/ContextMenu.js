import React from 'react';

function ContextMenu({ top, left, onClose, onEdit, onDelete }) {
  return (
    <div
      className="context-menu"
      style={{ top, left }}
    >
      <ul>
        <li onClick={onEdit}>Edit</li>
        <li onClick={onDelete}>Delete</li>
      </ul>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default ContextMenu;
