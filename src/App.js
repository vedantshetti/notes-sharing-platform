import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import UploadNotes from './pages/UploadNotes';
import SecondYear from './components/secondyear/SecondYear';
import ThirdYear from './components/thirdyear/ThirdYear';
import FourthYear from './components/fourthyear/FourthYear';
import FirstYear from './components/firstyear/FirstYear';
import DepartmentNotes from './components/thirdyear/DepartmentSubject';
import DepartmentSubject from './components/thirdyear/DepartmentSubject';
import SubjectNotes from './components/thirdyear/SubjectNotes';

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            {/* Routes for 1st Year */}
            <Route path="/1st-year" element={<FirstYear year={1} />} />
            
            {/* Routes for 2nd Year */}
            <Route path="/2nd-year" element={<SecondYear />} /> {/* Display departments for 2nd year */}


           
            {/* Routes for 3rd Year */}
            <Route path="/3rd-year" element={<ThirdYear />} />
            <Route path="/3rd-year/:departmentName" element={<DepartmentSubject />} /> {/* Dynamic route for 3rd-year departments */}

            <Route path="/3rd-year/:departmentName/:subjectName" element={<SubjectNotes />}/>

            
            {/* Routes for 4th Year */}

            <Route path="/4th-year" element={<FourthYear />} />



            

            {/* Upload Notes Route */}
            <Route path="/upload" element={<UploadNotes />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
