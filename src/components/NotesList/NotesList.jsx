import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

const NotesList = ({ subjectName }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);

      try {
        // Fetch subject ID using subject name
        const { data: subjectData, error: subjectError } = await supabase
          .from('subjects')
          .select('id')
          .eq('subject_name', subjectName)
          .single();

        if (subjectError || !subjectData) {
          console.error('Error fetching subject ID:', subjectError || 'Subject not found');
          setNotes([]);
          return;
        }

        const { data: notesData, error: notesError } = await supabase
          .from('notes')
          .select('title, file_url')
          .eq('subject_id', subjectData.id);

        if (notesError) {
          console.error('Error fetching notes:', notesError);
          setNotes([]);
        } else {
          setNotes(notesData);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        setNotes([]);
      }

      setLoading(false);
    };

    fetchNotes();
  }, [subjectName]);

  if (loading) return <p>Loading notes...</p>;

  return (
    <div>
      <h3>Notes for {subjectName}</h3>
      {notes.length > 0 ? (
        <ul>
          {notes.map((note, index) => (
            <li key={index}>
              <h4>{note.title}</h4>
              <a href={note.file_url} target="_blank" rel="noopener noreferrer">
                Download File
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notes available.</p>
      )}
    </div>
  );
};

export default NotesList;
