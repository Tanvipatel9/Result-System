import React, { useState, useEffect } from 'react';

function Students() {
  const [first_name, setfirst_name] = useState('');
  const [family_name, setfamily_name] = useState('');
  const [dob, setDob] = useState('');
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    if (validateForm()) {
      createStudent();
    }
  }

  const validateForm = () => {
    if (first_name.trim() === '' || family_name.trim() === '') {
      alert('Please enter your first and family names.');
      return false;
    }

    const dobDate = new Date(dob);
    const today = new Date();
    const minDOB = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());

    if (isNaN(dobDate.getTime())) {
      alert('Please enter a valid date of birth.');
      return false;
    }

    if (dobDate > minDOB) {
      alert('Student must be at least 10 years old.');
      return false;
    }

    return true;
  }

  const createStudent = () => {
    fetch('http://127.0.0.1:8000/students/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: first_name,
        family_name: family_name,
        dob: dob
      }),
    })
    .then(response => response.json())
    .then(data => {
      alert('New student added successfully!');
      fetchStudents();
      setfirst_name('');
      setfamily_name('');
      setDob('');
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while adding the student.');
    });
  }

  const fetchStudents = () => {
    fetch('http://127.0.0.1:8000/students/list/')
    .then(response => response.json())
    .then(data => {
      setStudents(data);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while fetching students.');
    });
  }

  return (
    <main>
      <header className="d-flex justify-content-center align-items-center mt-5">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/"><i className="fa fa-home" aria-hidden="true"></i> Home</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <div className="container mt-5">
        <h2 className="text-center"> Students Page</h2>
        <form className="row justify-content-center" id="studentForm" onSubmit={handleFormSubmit}>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="first_name" className="form-label">First Name</label>
              <input type="text" className="form-control" id="first_name" placeholder="Enter your first name" required value={first_name} onChange={(e) => setfirst_name(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="family_name" className="form-label">Family Name</label>
              <input type="text" className="form-control" id="family_name" placeholder="Enter your family name" required value={family_name} onChange={(e) => setfamily_name(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="dob" className="form-label">Date of Birth</label>
              <input type="date" className="form-control" id="dob" required value={dob} onChange={(e) => setDob(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>

        <div className="mt-5">
          <h2>All Students</h2>
          <table className="table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Family Name</th>
                <th>Date of Birth</th>
              </tr>
            </thead>
            <tbody id="studentTableBody">
              {students.map(student => (
                <tr key={student.id}>
                  <td>{student.first_name}</td>
                  <td>{student.family_name}</td>
                  <td>{new Date(student.dob).toDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
  
}


export default Students;
