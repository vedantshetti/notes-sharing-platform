import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import UploadNotes from './pages/UploadNotes';
import SecondYear from './components/secondyear/SecondYear';
import ThirdYear from './components/thirdyear/ThirdYear';
import FourthYear from './components/fourthyear/FourthYear';
import FirstYear from './components/firstyear/FirstYear';

import DepartmentSubject from './components/thirdyear/DepartmentSubject';
import SubjectNotes from './components/thirdyear/SubjectNotes';

import AddNoteFile from './components/AddNoteFile/AddNoteFile';

import SubjectDetail from './components/admin frontend/SubjectDetail';
import ThirdYearSubjectList from './components/admin frontend/ThirdYearSubjectList';
import DepartmentSubjectSecondYear from './components/secondyear/DepartmentSubjectSecondYear';
import SubjectNotesSecondYear from './components/secondyear/SubjectNotesSecondYear';
import SubjectNotesFourthYear from './components/fourthyear/SubjectNotesFourthYear';
import DepartmentSubjectFourthYear from './components/fourthyear/DepartmentSubjectFourthYear';
import AdminPage from './components/admin/AdminPage';
import DepartmentSubjects from './components/admin/DepartmentSubjects';
import AddNotesPage from './components/admin/AddNotesPage';
import AuthPage from './AuthPage';

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
            <Route path="/2nd-year/:departmentName" element={<DepartmentSubjectSecondYear />} /> {/* Dynamic route for 2nd-year departments */}
            <Route path="/2nd-year/:departmentName/:subjectName" element={<SubjectNotesSecondYear />} /> 


           
            {/* Routes for 3rd Year */}
            <Route path="/3rd-year" element={<ThirdYear />} />
            <Route path="/3rd-year/:departmentName" element={<DepartmentSubject />} /> {/* Dynamic route for 3rd-year departments */}

            <Route path="/3rd-year/:departmentName/:subjectName" element={<SubjectNotes />}/>
            <Route path="/thirdyear/subjects" element={<ThirdYearSubjectList />} />
            <Route path="/thirdyear/subject/:subjectName" element={<SubjectDetail />} />
            <Route path="/thirdyear/subject/:subjectName/add-note" element={<AddNoteFile />} />

            
            {/* Routes for 4th Year */}

            <Route path="/4th-year" element={<FourthYear />} />
            <Route path="/4th-year/:departmentName" element={<DepartmentSubjectFourthYear />} />

            <Route path="/4th-year/:departmentName/:subjectName" element={<SubjectNotesFourthYear />}
  />




            {/* admin routes */}

            {/* Upload Notes Route */}
            <Route path="/upload" element={<UploadNotes />} />


            <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/:year/:departmentName" element={<DepartmentSubjects />} />
        <Route
          path="/admin/:year/:departmentName/:subjectName"
          element={<AddNotesPage />}
        />


        {/* auth Routes  */}

        <Route path="/auth" element={<AuthPage />} />





          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
