import React, { useEffect, useRef } from 'react';

function ContextMenu({ top, left, onClose, onSelect, optionMenus }) {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="context-menu" style={{ top, left }} ref={menuRef}>
      <ul>
        {
          optionMenus.map((menu, index)=>  <li key={index} onClick={()=>onSelect(menu.action)}>Edit</li>)
        }
        {/* <li onClick={onDelete}>Delete</li> */}
      </ul>
      {/* <button onClick={onClose}>Close</button> */}
    </div>
  );
}

export default ContextMenu;
