import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Styling.css';

function FacultyList() {
  const [faculty, setFaculty] = useState([]);
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [branch, setBranch] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);

  const API_URL = "https://three1514-crudmvc-server.onrender.com/api/faculty";

  // Configure axios defaults for CORS
  axios.defaults.withCredentials = true;

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      setError(null);
      const response = await axios.get(API_URL, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setFaculty(response.data);
    } catch (error) {
      console.error("Error fetching faculty:", error);
      setError("Failed to fetch faculty data. Please try again later.");
    }
  };

  const saveFaculty = async () => {
    try {
      setError(null);
      const facultyData = { name, designation, branch };

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, facultyData, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        setEditingId(null);
      } else {
        await axios.post(API_URL, facultyData, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
      }

      setName('');
      setDesignation('');
      setBranch('');
      fetchFaculty();
    } catch (error) {
      console.error("Error saving faculty:", error);
      setError("Failed to save faculty data. Please try again.");
    }
  };

  const deleteFaculty = async (id) => {
    try {
      setError(null);
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      fetchFaculty();
    } catch (error) {
      console.error("Error deleting faculty:", error);
      setError("Failed to delete faculty member. Please try again.");
    }
  };

  const editFaculty = (facultyMember) => {
    setEditingId(facultyMember._id);
    setName(facultyMember.name);
    setDesignation(facultyMember.designation);
    setBranch(facultyMember.branch);
  };

  return (
    <div className="container faculty-list-container">
      <h2 className="title">Faculty List</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="form-group">
        <input
          className="input-field"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="input-field"
          placeholder="Designation"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        />
        <input
          className="input-field"
          placeholder="Branch"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
        />
        <button className="action-button" onClick={saveFaculty}>
          {editingId ? "Update Faculty" : "Add Faculty"}
        </button>
      </div>

      <div className="card-container">
        {faculty.map((facultyMember) => (
          <div key={facultyMember._id} className="card">
            <h3>{facultyMember.name}</h3>
            <p><strong>Designation:</strong> {facultyMember.designation}</p>
            <p><strong>Branch:</strong> {facultyMember.branch}</p>
            <div className="card-actions">
              <button className="edit-button" onClick={() => editFaculty(facultyMember)}>Edit</button>
              <button className="delete-button" onClick={() => deleteFaculty(facultyMember._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FacultyList;
