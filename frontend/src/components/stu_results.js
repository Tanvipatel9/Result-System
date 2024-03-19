import React, { useState, useEffect } from 'react';

function StuResults() {
  const [course_name, setCourseName] = useState('');
  const [student_name, setStudentName] = useState('');
  const [score, setScore] = useState('');
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [stuResults, setStuResults] = useState([]);

  useEffect(() => {
    fetchCourses();
    fetchStudents();
    fetchStuResults();
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      addResult();
    }
  }

  const validateForm = () => {
    if (course_name.trim() === '' || student_name.trim() === '' || score.trim() === '') {
      alert('Please select all fields.');
      return false;
    }
    return true;
  }

  const addResult = () => {
    const newResult = { course_name, student_name, score };

    fetch('http://127.0.0.1:8000/stu_results/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newResult),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add result');
      }
      return response.json();
    })
    .then(data => {
      console.log('New result added:', data);
      showNotification();
      setStuResults([...stuResults, data]);
      resetForm();
    })
    .catch(error => console.error('Error adding result:', error));
  }

  const resetForm = () => {
    setCourseName('');
    setStudentName('');
    setScore('');
  }

  const fetchCourses = () => {
    fetch('http://127.0.0.1:8000/courses/list/')
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching courses:', error));
  }

  const fetchStudents = () => {
    fetch('http://127.0.0.1:8000/students/list/')
      .then(response => response.json())
      .then(data => setStudents(data))
      .catch(error => console.error('Error fetching students:', error));
  }

  const fetchStuResults = () => {
    fetch('http://127.0.0.1:8000/stu_results/list/')
      .then(response => response.json())
      .then(data => setStuResults(data))
      .catch(error => console.error('Error fetching student results:', error));
  }

  const showNotification = () => {
    alert('New result added successfully!');
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
        <h2 className="text-center">Add New Result</h2>
        <form className="row justify-content-center" onSubmit={handleFormSubmit}>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="courseName" className="form-label">Course Name</label>
              <select className="form-select" id="courseName" required value={course_name} onChange={(e) => setCourseName(e.target.value)}>
                <option value="">Select Course</option>
                {courses.map(course => (
                  <option key={course.id} value={course.name}>{course.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="studentName" className="form-label">Student Name</label>
              <select className="form-select" id="studentName" required value={student_name} onChange={(e) => setStudentName(e.target.value)}>
                <option value="">Select Student</option>
                {students.map(student => (
                  <option key={student.id} value={student.first_name}>{student.first_name}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="score" className="form-label">Score</label>
              <select className="form-select" id="score" required value={score} onChange={(e) => setScore(e.target.value)}>
                <option value="">Select Score</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>

        <div className="mt-5">
          <h2>All Results</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Student Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {stuResults.map((stuResult, index) => (
                <tr key={index}>
                  <td>{stuResult.course_name}</td>
                  <td>{stuResult.student_name}</td>
                  <td>{stuResult.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default StuResults;

