import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
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

import { fetchSession } from './components/auth/auth'; // Assuming this function checks session status
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import SubjectNotesFirstYear from './components/firstyear/SubjectNotesFirstYear';

// PrivateRoute component to protect authenticated routes
const PrivateRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // To hold the authentication status
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const session = await fetchSession(); // Fetch current session
      if (!session) {
        // Redirect to /auth if not authenticated
        navigate('/auth/login');
      } else {
        setIsAuthenticated(true);
      }
    };
    checkAuth();
  }, [navigate]);

  // If authentication is still loading, show a loading state
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? element : null;
};

const App = () => {
  return (
    <Router>
      
        <Sidebar />
        <div className="flex-1">
          <Routes>
            {/* Routes for 1st Year */}
            <Route path="/1st-year" element={<FirstYear year={1} />} />  {/* List of all first-year subjects */}
<Route path="/1st-year/:subjectName" element={<PrivateRoute element={<SubjectNotesFirstYear />} />} />  {/* Subject notes for first-year subjects */}


            {/* Routes for 2nd Year */}
            <Route path="/2nd-year" element={<PrivateRoute element={<SecondYear />}/>} />
            <Route path="/2nd-year/:departmentName" element={<PrivateRoute element={<DepartmentSubjectSecondYear />}/>} />
            <Route path="/2nd-year/:departmentName/:subjectName" element={<PrivateRoute element={<SubjectNotesSecondYear />}/>} />

            {/* Routes for 3rd Year */}
            <Route path="/3rd-year" element={<PrivateRoute element={<ThirdYear />} />} />
            <Route path="/3rd-year/:departmentName" element={<PrivateRoute element={<DepartmentSubject />}/>} />
            <Route path="/3rd-year/:departmentName/:subjectName" element={<PrivateRoute element={<SubjectNotes />}/>} />
            <Route path="/thirdyear/subjects" element={<PrivateRoute element={<ThirdYearSubjectList />}/>} />
            <Route path="/thirdyear/subject/:subjectName" element={<PrivateRoute element={<SubjectDetail />} />} />
            <Route path="/thirdyear/subject/:subjectName/add-note" element={<PrivateRoute element={<AddNoteFile />}/>} />

            {/* Routes for 4th Year */}
            <Route path="/4th-year" element={<PrivateRoute element={<FourthYear />}/> }/>
            <Route path="/4th-year/:departmentName" element={<PrivateRoute element={<DepartmentSubjectFourthYear />} />} />
            <Route path="/4th-year/:departmentName/:subjectName" element={<PrivateRoute element={<SubjectNotesFourthYear />}/>} />

            {/* Admin Routes */}
            <Route path="/upload" element={<UploadNotes />} />

            <Route path="/admin" element={<PrivateRoute element={<AdminPage />}/>} />
            <Route path="/admin/:year/:departmentName" element={<PrivateRoute element={<DepartmentSubjects />} />} />
            <Route path="/admin/:year/:departmentName/:subjectName" element={<PrivateRoute element={<AddNotesPage />}/>} />

            {/* Auth Routes */}
            <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />


            {/* Private Routes - Only accessible if authenticated */}
            <Route
              path="/admin"
              element={<PrivateRoute element={<AdminPage />} />}
            />
            {/* Apply the PrivateRoute to any other routes that require authentication */}
            <Route
              path="/upload"
              element={<PrivateRoute element={<UploadNotes />} />}
            />
          </Routes>
        </div>
    
    </Router>
  );
};

export default App;
