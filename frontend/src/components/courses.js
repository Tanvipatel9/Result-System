import React, { useState, useEffect } from 'react';

function Courses() {
  const [courseName, setCourseName] = useState('');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (validateForm(courseName)) {
      addCourse(courseName);
    }
  }

  const validateForm = (name) => {
    if (name.trim() === '') {
      alert('Please enter the course name.');
      return false;
    }
    return true;
  }

  const addCourse = (name) => {
    fetch('http://127.0.0.1:8000/courses/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add course.');
      }
      return response.json();
    })
    .then(data => {
      alert('New course added successfully!');
      fetchCourses(); 
      setCourseName('');
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while adding the course.');
    });
  }

  const fetchCourses = () => {
    fetch('http://127.0.0.1:8000/courses/list/')
    .then(response => response.json())
    .then(data => {
      setCourses(data);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while fetching courses.');
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
        <h2 className="text-center">Courses Page</h2>
        <form className="row justify-content-center" onSubmit={handleFormSubmit}>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="courseName" className="form-label">Course Name</label>
              <input type="text" className="form-control" id="courseName" placeholder="Enter course name" required value={courseName} onChange={(e) => setCourseName(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>

        <div className="mt-5">
          <h2>All Courses</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Course Name</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course.id}>
                  <td>{course.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default Courses;
