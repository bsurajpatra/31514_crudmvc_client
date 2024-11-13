import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Styling.css';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [editingId, setEditingId] = useState(null);

  const API_URL = "https://three1514-crudmvc-server.onrender.com/api/students";

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const saveStudent = async () => {
    try {
      const studentData = { name, age, grade };

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, studentData);
        setEditingId(null);
      } else {
        await axios.post(API_URL, studentData);
      }

      setName('');
      setAge('');
      setGrade('');
      fetchStudents();
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const editStudent = (student) => {
    setEditingId(student._id);
    setName(student.name);
    setAge(student.age);
    setGrade(student.grade);
  };

  return (
    <div className="container student-list-container">
      <h2 className="title">Student List</h2>
      <div className="form-group">
        <input
          className="input-field"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="input-field"
          placeholder="Age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          className="input-field"
          placeholder="Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
        <button className="action-button" onClick={saveStudent}>
          {editingId ? "Update Student" : "Add Student"}
        </button>
      </div>

      <div className="card-container">
        {students.map((student) => (
          <div key={student._id} className="card">
            <h3>{student.name}</h3>
            <p><strong>Age:</strong> {student.age}</p>
            <p><strong>Grade:</strong> {student.grade}</p>
            <div className="card-actions">
              <button className="edit-button" onClick={() => editStudent(student)}>Edit</button>
              <button className="delete-button" onClick={() => deleteStudent(student._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentList;
