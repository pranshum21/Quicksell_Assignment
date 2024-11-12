import React, { useState, useEffect, useRef } from 'react';
import '../src/styles/DisplayOptions.css';


const DisplayOptions = ({ grouping, ordering, setGrouping, setOrdering }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null); 

  const toggleDropdown = () => setShowDropdown(!showDropdown);

 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="display-options-container">
      <button className="display-button" onClick={toggleDropdown}>
        <img src="/Display.svg" alt="Avatar" className="avatar-icon" />
        Display
      </button>
      {showDropdown && (
        <div className="dropdown-menu" ref={dropdownRef}>
          <div className="dropdown-item">
            <label>Grouping</label>
            <select onChange={(e) => setGrouping(e.target.value)} value={grouping}>
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="dropdown-item">
            <label>Ordering</label>
            <select onChange={(e) => setOrdering(e.target.value)} value={ordering}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayOptions;
