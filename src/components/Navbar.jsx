import React from 'react';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h1>Virtual Classroom</h1>
        </div>
        <div className="navbar-menu">
          <a href="#" className="navbar-item active">Dashboard</a>
          <a href="#" className="navbar-item">Schedule</a>
          <a href="#" className="navbar-item">Resources</a>
          <a href="#" className="navbar-item">Settings</a>
        </div>
        <div className="user-profile">
          <div className="user-avatar">
            <span>JS</span>
          </div>
        </div>
      </div>
    </nav>
  );
}