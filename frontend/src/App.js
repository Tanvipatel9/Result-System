import React from 'react';
import { Route, Routes, useRoutes } from 'react-router-dom';
import Home from './components/home';
import Students from './components/students';
import Courses from  './components/courses';
import StuResults from './components/stu_results';

function App() {
 
  return (
    <div>
      
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="students" element={<Students />} />
      <Route path="courses" element={<Courses />} />
      <Route path="stu_results" element={<StuResults />} />
      </Routes>
    
    </div>
  );
}

export default App;








