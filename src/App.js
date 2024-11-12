import React from 'react';
import StudentList from './Components/StudentList';
import FacultyList from './Components/FacultyList';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 className="main-heading">Student Management System</h1>
      <StudentList />
      <h1 className="main-heading">Faculty Management System</h1>
      <FacultyList />
      
      <footer className="footer">
        &copy; 2024 - All rights reserved | Developed with ♥ by B Suraj Patra
      </footer>
    </div>
  );
}

export default App;
