import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import StudentList from './Components/StudentList';
import FacultyList from './Components/FacultyList';
import FileUpload from './Components/FileUpload'; 
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1 className="main-heading">CRUD MVC</h1>
          <nav className="navbar">
            <Link to="/students">Students</Link>
            <Link to="/faculty">Faculty</Link>
            <Link to="/bulk-upload">Upload</Link>
          </nav>
        </header>
        
        <main>
          <Routes>
            <Route path="/students" element={<StudentList />} />
            <Route path="/faculty" element={<FacultyList />} />
            <Route path="/bulk-upload" element={<FileUpload />} /> 
          </Routes>
        </main>

        <footer className="footer">
          &copy; 2024 - All rights reserved | Developed with ♥ by B Suraj Patra
        </footer>
      </div>
    </Router>
  );
}

export default App;
