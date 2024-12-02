import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

const AddNoteFile = () => {
  const { subjectName } = useParams();
  const decodedSubjectName = decodeURIComponent(subjectName); // Decode the subject name
  const [subjectId, setSubjectId] = useState(null);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [loadingSubjectId, setLoadingSubjectId] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate(); // Add useNavigate hook

  useEffect(() => {
    const fetchSubjectId = async () => {
      setLoadingSubjectId(true);
      try {
        const { data, error } = await supabase
          .from('subjects')
          .select('id')
          .eq('subject_name', decodedSubjectName)
          .single();

        if (error) {
          console.error('Error fetching subject ID:', error);
          alert('Error fetching subject data. Please try again.');
          return;
        }

        setSubjectId(data.id);
      } catch (err) {
        console.error('Unexpected error fetching subject ID:', err.message);
        alert('Unexpected error occurred.');
      } finally {
        setLoadingSubjectId(false);
      }
    };

    fetchSubjectId();
  }, [decodedSubjectName]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Validate file type and size
    const allowedFormats = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowedFormats.includes(selectedFile.type)) {
      alert('Invalid file format. Please upload a PDF or image.');
      return;
    }

    const maxFileSize = 5 * 1024 * 1024; // 5 MB
    if (selectedFile.size > maxFileSize) {
      alert('File size exceeds 5 MB.');
      return;
    }

    setFile(selectedFile);
  };

  const uploadFile = async () => {
    if (!file || !title || !subjectId) {
      alert('Please provide all required details.');
      return;
    }
  
    setUploading(true);
  
    try {
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from('notes_files') // Ensure this matches your Supabase storage bucket
        .upload(fileName, file);
  
      if (error) throw error;
  
      const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || 'https://your-supabase-url';
      const fileUrl = `${SUPABASE_URL}/storage/v1/object/public/notes_files/${data.path}`;
  
      const { error: insertError } = await supabase
        .from('notes')
        .insert([{ title, file_url: fileUrl, subject_id: subjectId }]);
  
      if (insertError) throw insertError;
  
      alert('Note added successfully!');
      setTitle('');
      setFile(null);
      fileInputRef.current.value = ''; // Reset the file input
  
      // Redirect to the correct page after upload
      navigate(`/thirdyear/subject/${subjectName}/add-note`);
    } catch (err) {
      console.error('Error uploading file:', err.message);
      alert('Failed to upload the file. Please try again.');
    } finally {
      setUploading(false);
    }
  };
  
  
  if (loadingSubjectId) return <p>Loading subject data...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Add Note for {decodedSubjectName}</h2>
      <input
        type="text"
        placeholder="Enter note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        onClick={uploadFile}
        disabled={uploading || !subjectId}
        className={`px-4 py-2 rounded ${
          uploading || !subjectId
            ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        {uploading ? 'Uploading...' : 'Upload Note'}
      </button>
    </div>
  );
};

export default AddNoteFile;
