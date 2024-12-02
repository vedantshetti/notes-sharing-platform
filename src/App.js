import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import NotesListing from './pages/NotesListing';
import UploadNotes from './pages/UploadNotes';
import SecondYear from './components/secondyear/SecondYear';
import ThirdYear from './components/thirdyear/ThirdYear';
import FourthYear from './components/fourthyear/FourthYear';
import FirstYear from './components/firstyear/FirstYear';

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


            <Route path="/2nd-year/computer-engineering" element={<NotesListing year={2} department="Computer Engineering" />} />
            <Route path="/2nd-year/electronics-telecommunication" element={<NotesListing year={2} department="Electronics and Telecommunication Engineering" />} />
            <Route path="/2nd-year/information-technology" element={<NotesListing year={2} department="Information Technology" />} />
            <Route path="/2nd-year/instrumentation-control" element={<NotesListing year={2} department="Instrumentation and Control Engineering" />} />
            <Route path="/2nd-year/mechanical-engineering" element={<NotesListing year={2} department="Mechanical Engineering" />} />
            <Route path="/2nd-year/civil-engineering" element={<NotesListing year={2} department="Civil Engineering" />} />
            <Route path="/2nd-year/ai-data-science" element={<NotesListing year={2} department="Artificial Intelligence and Data Science" />} />
            <Route path="/2nd-year/robotics-automation" element={<NotesListing year={2} department="Robotics and Automation" />} />
            
            {/* Routes for 3rd Year */}
            <Route path="/3rd-year" element={<ThirdYear />} />


            <Route path="/3rd-year/computer-engineering" element={<NotesListing year={3} department="Computer Engineering" />} />
            <Route path="/3rd-year/electronics-telecommunication" element={<NotesListing year={3} department="Electronics and Telecommunication Engineering" />} />
            <Route path="/3rd-year/information-technology" element={<NotesListing year={3} department="Information Technology" />} />
            <Route path="/3rd-year/instrumentation-control" element={<NotesListing year={3} department="Instrumentation and Control Engineering" />} />
            <Route path="/3rd-year/mechanical-engineering" element={<NotesListing year={3} department="Mechanical Engineering" />} />
            <Route path="/3rd-year/civil-engineering" element={<NotesListing year={3} department="Civil Engineering" />} />
            <Route path="/3rd-year/ai-data-science" element={<NotesListing year={3} department="Artificial Intelligence and Data Science" />} />
            <Route path="/3rd-year/robotics-automation" element={<NotesListing year={3} department="Robotics and Automation" />} />
            
            {/* Routes for 4th Year */}

            <Route path="/4th-year" element={<FourthYear />} />



            <Route path="/4th-year/computer-engineering" element={<NotesListing year={4} department="Computer Engineering" />} />
            <Route path="/4th-year/electronics-telecommunication" element={<NotesListing year={4} department="Electronics and Telecommunication Engineering" />} />
            <Route path="/4th-year/information-technology" element={<NotesListing year={4} department="Information Technology" />} />
            <Route path="/4th-year/instrumentation-control" element={<NotesListing year={4} department="Instrumentation and Control Engineering" />} />
            <Route path="/4th-year/mechanical-engineering" element={<NotesListing year={4} department="Mechanical Engineering" />} />
            <Route path="/4th-year/civil-engineering" element={<NotesListing year={4} department="Civil Engineering" />} />
            <Route path="/4th-year/ai-data-science" element={<NotesListing year={4} department="Artificial Intelligence and Data Science" />} />
            <Route path="/4th-year/robotics-automation" element={<NotesListing year={4} department="Robotics and Automation" />} />

            {/* Upload Notes Route */}
            <Route path="/upload" element={<UploadNotes />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
