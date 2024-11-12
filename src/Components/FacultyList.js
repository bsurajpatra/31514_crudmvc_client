import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Styling.css'; 

function FacultyList() {
  const [faculty, setFaculty] = useState([]);
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [branch, setBranch] = useState('');
  const [editingId, setEditingId] = useState(null);

  const API_URL = "https://three1514-crudmvc-server.onrender.com";

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const response = await axios.get(API_URL);
      setFaculty(response.data);
    } catch (error) {
      console.error("Error fetching faculty:", error);
    }
  };

  const saveFaculty = async () => {
    try {
      const facultyData = { name, designation, branch };

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, facultyData);
        setEditingId(null);
      } else {
        await axios.post(API_URL, facultyData);
      }

      setName('');
      setDesignation('');
      setBranch('');
      fetchFaculty();
    } catch (error) {
      console.error("Error saving faculty:", error);
    }
  };

  const deleteFaculty = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchFaculty();
    } catch (error) {
      console.error("Error deleting faculty:", error);
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
  
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Designation</th>
              <th>Branch</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {faculty.map((facultyMember) => (
              <tr key={facultyMember._id}>
                <td>{facultyMember.name}</td>
                <td>{facultyMember.designation}</td>
                <td>{facultyMember.branch}</td>
                <td>
                  <button className="edit-button" onClick={() => editFaculty(facultyMember)}>Edit</button>
                  <button className="delete-button" onClick={() => deleteFaculty(facultyMember._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}  

export default FacultyList;
