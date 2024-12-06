import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

const AddNotesPage = () => {
  const { year, departmentName, subjectName } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Ensure the title and file are provided
    if (!title || !file) {
      alert("Please provide a title and select a file.");
      return;
    }

    setLoading(true);

    try {
      // Define the storage path for the file
      const bucketName = "notes"; // The name of your Supabase storage bucket
      const filePath = `${departmentName}/${subjectName}/${file.name}`; // Use department and subject to create the path

      // Upload the file to Supabase storage
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file);

      if (error) {
        console.error("Error uploading file:", error);
        alert("Error uploading file");
        setLoading(false);
        return;
      }

      // Generate the public URL for the uploaded file
      const { data: publicUrlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;

      // Save the note details to the database
      const { data: noteData, error: noteError } = await supabase
        .from("notes")
        .insert([
          {
            title,
            file_url: publicUrl, // Save the public URL
            subject_name: subjectName,
            department_name: departmentName,
            year_name: `Year ${year}`,
          },
        ]);

      if (noteError) {
        console.error("Error saving note:", noteError);
        alert("Error saving note details");
      } else {
        alert("Note added successfully!");
        navigate(`/admin/${year}/${departmentName}/${subjectName}`); // Redirect back to the subject page
      }

      setLoading(false);
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("Error uploading file");
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-1.7xl font-bold mb-6">Add Notes for {subjectName}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Note Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
            required
          />
        </div>

        <div>
          <label htmlFor="file" className="block text-sm font-medium">
            Upload File
          </label>
          <input
            id="file"
            type="file"
            onChange={handleFileChange}
            className="input"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn bg-blue-600 text-white"
        >
          {loading ? "Uploading..." : "Upload Notes"}
        </button>
      </form>
    </div>
  );
};

export default AddNotesPage;
