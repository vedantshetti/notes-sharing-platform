import React from 'react';
import NotesList from '../NotesList/NotesList';
import { Link, useParams } from 'react-router-dom';

const SubjectDetail = () => {
  const { subjectName } = useParams();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{decodeURIComponent(subjectName)}</h2>
      <NotesList subjectName={subjectName} />
      <div className="mt-4">
        <Link
          to={`/thirdyear/subject/${encodeURIComponent(subjectName)}/add-note`}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Note
        </Link>
      </div>
    </div>
  );
};

export default SubjectDetail;
