import React from 'react';
import './home.css';
import '../bootstrap/css/bootstrap.min.css'; 


function Home() {
  return (
    <>
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
              <li className="nav-item">
                <a className="nav-link" href="/students"><i className="fa fa-users" aria-hidden="true"></i> Students</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/courses"><i className="fa fa-book" aria-hidden="true"></i> Courses</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/stu_results"><i className="fa fa-poll" aria-hidden="true"></i> Results</a>
              </li>     
            </ul>
          </div>
        </nav>
      </header>

      <main className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <h1> Welcome to Student Result Management System! </h1>
        </div>
      </main>

      <footer>
      </footer>
    </>
  );
}

export default Home;
